/**
 * End-to-end test of the Stripe webhook against the LOCAL dev server.
 *
 * Builds a realistic Stripe event, signs it with your real STRIPE_WEBHOOK_SECRET
 * (so signature verification is genuinely exercised), and POSTs it to the dev
 * server's /api/stripe-webhook route — the same path Stripe hits in production.
 *
 * Start the dev server first, then:
 *   node --env-file=.env scripts/test-stripe-webhook-local.mjs trial    you@example.com
 *   node --env-file=.env scripts/test-stripe-webhook-local.mjs paid     you@example.com
 *   node --env-file=.env scripts/test-stripe-webhook-local.mjs ending   you@example.com
 *   node --env-file=.env scripts/test-stripe-webhook-local.mjs failed   you@example.com
 *
 * REAL SIDE EFFECTS: sends real email via Resend, and "trial"/"paid" insert a
 * row into project_requests in whichever Supabase your .env points at.
 */
import crypto from "node:crypto";

const [scenario = "trial", email] = process.argv.slice(2);
const BASE = process.env.LOCAL_BASE_URL || "http://localhost:8080";

if (!email) {
  console.error("Usage: node --env-file=.env scripts/test-stripe-webhook-local.mjs <trial|paid|ending|failed> <email>");
  process.exit(1);
}

const NOW = Math.floor(Date.now() / 1000);
const DAY = 86400;
const priceStarter = process.env.STRIPE_PRICE_ID_STARTER;
const priceGrowth = process.env.STRIPE_PRICE_ID_GROWTH;

/** Subscriptions are fetched from Stripe by the handler, so these ids must be
 *  fake-but-absent: the handler then falls back to session line items. For the
 *  events that carry the subscription inline (ending/failed) we supply it. */
const EVENTS = {
  trial: {
    type: "checkout.session.completed",
    data: {
      object: {
        id: `cs_local_${NOW}`,
        object: "checkout.session",
        mode: "subscription",
        customer: null,
        customer_details: { email },
        customer_email: email,
        subscription: null,
        amount_total: 0,
        currency: "usd",
        payment_status: "paid",
        metadata: {},
      },
    },
  },
  paid: {
    type: "checkout.session.completed",
    data: {
      object: {
        id: `cs_local_${NOW}`,
        object: "checkout.session",
        mode: "subscription",
        customer: null,
        customer_details: { email },
        customer_email: email,
        subscription: null,
        amount_total: 19900,
        currency: "usd",
        payment_status: "paid",
        metadata: {},
      },
    },
  },
  ending: {
    type: "customer.subscription.trial_will_end",
    data: {
      object: {
        id: "sub_local_test",
        object: "subscription",
        status: "trialing",
        customer: { email },
        trial_start: NOW - 4 * DAY,
        trial_end: NOW + 3 * DAY,
        items: {
          data: [
            { price: { id: priceStarter, unit_amount: 9900, currency: "usd", recurring: { interval: "month" } } },
          ],
        },
      },
    },
  },
  failed: {
    type: "invoice.payment_failed",
    data: {
      object: {
        id: "in_local_test",
        object: "invoice",
        amount_due: 19900,
        currency: "usd",
        customer: null,
        customer_email: email,
        subscription: "sub_local_test",
        hosted_invoice_url: "https://invoice.stripe.com/i/example",
        lines: { data: [{ price: { id: priceGrowth, recurring: { interval: "month" } } }] },
      },
    },
  },
};

const event = EVENTS[scenario];
if (!event) {
  console.error(`Unknown scenario "${scenario}". Use: ${Object.keys(EVENTS).join(", ")}`);
  process.exit(1);
}

const payload = JSON.stringify({ id: `evt_local_${NOW}`, object: "event", ...event });

// Sign exactly the way Stripe does so the handler's verification really runs.
const secret = (process.env.STRIPE_WEBHOOK_SECRET || "").trim();
const headers = { "Content-Type": "application/json" };
if (secret) {
  const signature = crypto.createHmac("sha256", secret).update(`${NOW}.${payload}`).digest("hex");
  headers["Stripe-Signature"] = `t=${NOW},v1=${signature}`;
  console.log("Signing with STRIPE_WEBHOOK_SECRET (verification active).");
} else {
  console.log("No STRIPE_WEBHOOK_SECRET set — handler will skip verification.");
}

console.log(`POST ${BASE}/api/stripe-webhook   scenario=${scenario}  email=${email}\n`);

const res = await fetch(`${BASE}/api/stripe-webhook`, { method: "POST", headers, body: payload });
const text = await res.text();
console.log(`HTTP ${res.status}`);
console.log(text.slice(0, 600));
console.log(
  res.ok
    ? "\n✓ Webhook accepted. Check the inbox and the dev-server console."
    : "\n✗ Webhook rejected — see the dev-server console for the reason.",
);
