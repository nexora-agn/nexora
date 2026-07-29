/**
 * Preview / test the Stripe subscription lifecycle emails without touching Stripe.
 *
 * Renders the real templates used by the webhook. By default it only writes HTML
 * files you can open in a browser — nothing is sent. Pass --send <address> to
 * actually deliver them through Resend (uses RESEND_API_KEY from .env).
 *
 *   node --env-file=.env scripts/preview-subscription-email.mjs
 *   node --env-file=.env scripts/preview-subscription-email.mjs --send you@example.com
 *   node --env-file=.env scripts/preview-subscription-email.mjs --send you@example.com --only trial_started
 *
 * Kinds: trial_started | purchase_confirmed | payment_receipt | trial_ending | payment_failed
 */
import fs from "node:fs/promises";
import path from "node:path";
import { handleSendSubscriptionEmails } from "../server/form-email-resend.mjs";

const args = process.argv.slice(2);
const sendIdx = args.indexOf("--send");
const sendTo = sendIdx >= 0 ? args[sendIdx + 1] : null;
const onlyIdx = args.indexOf("--only");
const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

const OUT_DIR = path.join(process.cwd(), ".email-preview");

/** Sample data mirroring what the webhook derives from a real Stripe event. */
const SAMPLES = {
  trial_started: {
    kind: "trial_started",
    planName: "Starter",
    amountLabel: "$99.00",
    intervalLabel: "month",
    firstChargeLabel: "August 5, 2026",
    trialDays: 7,
    subscriptionId: "sub_preview",
  },
  purchase_confirmed: {
    kind: "purchase_confirmed",
    planName: "Growth",
    amountLabel: "$199.00",
    intervalLabel: "month",
    firstChargeLabel: "August 29, 2026",
    subscriptionId: "sub_preview",
  },
  payment_receipt: {
    kind: "payment_receipt",
    planName: "Starter",
    amountLabel: "$99.00",
    intervalLabel: "month",
    paidOnLabel: "August 5, 2026",
    firstChargeLabel: "September 5, 2026",
    manageUrl: "https://invoice.stripe.com/i/example",
    subscriptionId: "sub_preview",
  },
  trial_ending: {
    kind: "trial_ending",
    planName: "Starter",
    amountLabel: "$99.00",
    intervalLabel: "month",
    firstChargeLabel: "August 5, 2026",
    subscriptionId: "sub_preview",
  },
  payment_failed: {
    kind: "payment_failed",
    planName: "Growth",
    amountLabel: "$199.00",
    intervalLabel: "month",
    manageUrl: "https://invoice.stripe.com/i/example",
    subscriptionId: "sub_preview",
  },
};

const kinds = only ? [only] : Object.keys(SAMPLES);
for (const k of kinds) {
  if (!SAMPLES[k]) {
    console.error(`Unknown kind "${k}". Options: ${Object.keys(SAMPLES).join(", ")}`);
    process.exit(1);
  }
}

// Capture the Resend HTTP call so we can save the HTML, and drop it when not sending.
const captured = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts = {}) => {
  if (String(url).includes("api.resend.com")) {
    const body = JSON.parse(opts.body);
    captured.push(body);
    if (!sendTo) {
      // Dry run — pretend Resend accepted it, send nothing.
      return new Response(JSON.stringify({ id: "dry-run" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
  }
  return realFetch(url, opts);
};

await fs.mkdir(OUT_DIR, { recursive: true });
console.log(sendTo ? `Sending to ${sendTo}…\n` : "Dry run — rendering only, nothing sent.\n");

for (const kind of kinds) {
  captured.length = 0;
  const details = { ...SAMPLES[kind], email: sendTo || "preview@example.com" };
  const res = await handleSendSubscriptionEmails(details, {
    ...process.env,
    // Without a key the templates never render, so use an obvious dummy on dry runs.
    RESEND_API_KEY: process.env.RESEND_API_KEY || "re_dry_run",
  });

  const client = captured.find(m => String(m.to) !== String(process.env.RESEND_ADMIN_EMAIL || "info@nexora-agn.com"));
  if (client) {
    const file = path.join(OUT_DIR, `${kind}.html`);
    await fs.writeFile(file, client.html);
    console.log(`${res.ok ? "✓" : "✗"} ${kind.padEnd(20)} ${client.subject}`);
    console.log(`  → ${file}`);
  } else {
    console.log(`✗ ${kind.padEnd(20)} nothing rendered (${res.ok ? "ok" : res.error})`);
  }
  if (!res.ok) console.log(`  error: ${res.error}`);
}

console.log(`\nOpen the files in ${OUT_DIR} to review.`);
