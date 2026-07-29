# Stripe billing & subscription emails

How Nexora sells subscriptions, what the customer receives at each step, and how
to work on it locally without touching a real card.

## Plans

Three monthly plans, each with an optional **7-day free trial**. The trial saves
the card, charges nothing, and converts automatically on day 7.

| Plan | Internal id | Price | Env var |
|------|-------------|-------|---------|
| Starter | `starter` | $99/mo | `STRIPE_PRICE_ID_STARTER` |
| Growth | `growth` | $199/mo | `STRIPE_PRICE_ID_GROWTH` |
| Enterprise | `custom` | $399/mo | `STRIPE_PRICE_ID_ENTERPRISE` |

> Enterprise is `custom` internally — a historical name from when that tier was
> a contact-sales enquiry. `resolveStripePriceId()` maps it to the Enterprise price.

Stripe never sees plan names, only price IDs. `server/stripe-checkout.mjs` maps
between the two in both directions:

- `resolveStripePriceId(planId, env)` — plan → price, for creating checkouts
- `resolvePlanFromPriceId(priceId, env)` — price → plan name, for the webhook

## Two ways to buy

| Path | Entry point | Trial? | Collects |
|------|-------------|--------|----------|
| **Wizard** | `/start` → `/api/start-project-stripe` | No — charges today | Email, logo, brand colours, domain, content |
| **Payment Link** | Buttons on the package cards | Yes — 7 days | Email only |

Payment Links (`PLAN_TRIAL_LINKS` in `src/lib/pricingPlans.ts`) are hosted by
Stripe and never touch our server before payment. They therefore arrive with **no
project data** — the webhook flags these rows `needs_onboarding_followup: true`
so the team knows to chase the brand assets manually.

## The lifecycle

Every email below is sent by **us**, from the webhook. Stripe's own customer
emails are not relied on (see "Why the webhook owns email").

| Day | Stripe event | Customer email | Order status |
|-----|--------------|----------------|--------------|
| 0 — trial starts | `checkout.session.completed` | "You're in — your free trial is active" | `in_progress`, `stripe_payment_status: trialing` |
| 0 — pays today | `checkout.session.completed` | "Payment confirmed — your plan is active" | `in_progress`, `paid` |
| 4 | `customer.subscription.trial_will_end` | "Your free trial ends soon" | — |
| 7 — charge succeeds | `invoice.paid` | "Receipt — $99.00" | — |
| 7 — card declined | `invoice.payment_failed` | "Action needed — update your card" | — |
| Monthly | `invoice.paid` | Receipt | — |

At trial start Stripe issues a **$0.00 invoice** and marks it paid. That is
bookkeeping to open the subscription — no money moves, and Stripe sends nothing.
Those $0.00 rows in the dashboard are normal.

Trial subscriptions have status `trialing`, **not** `active`. The dashboard's
"Active" filter hides them; use "All".

## Why the webhook owns email

All customer billing email is sent from `server/stripe-webhook.mjs` and nowhere
else. Both purchase paths — and any invoice raised by hand in the Dashboard —
converge on `checkout.session.completed`, so this is the only place that cannot
be bypassed.

```
Payment link  ─┐
Wizard        ─┼─→  Stripe  ─→  webhook  ─→  email + DB record
Manual invoice─┘
```

Two rules that follow from this, both load-bearing:

1. **`/api/start-project-stripe` must not email the customer.** It runs *before*
   payment, so it would also reach everyone who abandons checkout. It sends the
   team notification only, via `skipClientEmail: true`.
2. **The webhook returns HTTP 200 even when the database write fails.** The email
   has already gone out and is not idempotent; a non-2xx makes Stripe retry the
   whole event and email the customer a second time. A missing row is
   recoverable (the payment is in Stripe, and the error is logged) — a duplicate
   billing email is not. Only failures *before* the email returns 500.

### Deduplication

`invoice.paid` fires for the checkout's own invoice too. Without a guard, an
immediate purchase would send both "Payment confirmed" and a receipt. So
`handleInvoicePaid` skips:

- `billing_reason === "subscription_create"` — `checkout.session.completed` covers it
- `amount_paid === 0` — the trial-opening invoice

## Files

| File | Responsibility |
|------|----------------|
| `server/stripe-checkout.mjs` | Creates Checkout Sessions; maps plan ⇄ price ID |
| `server/public-start-project-stripe.mjs` | Wizard submit: saves order, creates checkout, notifies team |
| `server/stripe-webhook.mjs` | Verifies signature, routes events, sends all customer billing email |
| `server/form-email-resend.mjs` | Email templates (marketing forms **and** subscription lifecycle) |
| `src/lib/pricingPlans.ts` | Plan copy + `PLAN_TRIAL_LINKS` |
| `api/stripe-webhook.mjs` | Vercel entry point → `handleStripeWebhook` |
| `vite-plugin-form-email.ts` | Serves the same API routes on the dev server |

Subscription email templates live in `form-email-resend.mjs` under
`// --- subscription lifecycle ---`. The exported entry point is
`handleSendSubscriptionEmails(details, env)`; `details.kind` selects the template:

`trial_started` · `purchase_confirmed` · `payment_receipt` · `trial_ending` · `payment_failed`

Each sends **two** emails — one to the customer, one to the team inbox.

### Statement descriptor

Every billing email states how the charge appears on the card statement. This
must match the Stripe account's `statement_descriptor` **exactly** — currently
`NEXORA AGENCY`, which is *not* the legal entity name (`NEXORA AGENCY 029 LLC`).
Quoting anything else defeats the purpose and invites "I don't recognise this
charge" disputes. It is a single constant, `STATEMENT_DESCRIPTOR`.

Verify it after any Stripe account change:

```bash
curl -s https://api.stripe.com/v1/account -u "$STRIPE_SECRET_KEY:" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['settings']['payments']['statement_descriptor'])"
```

## Configuration

### Environment

Server-side (never `VITE_`-prefixed — these must not reach the browser):

```
STRIPE_SECRET_KEY=sk_live_…
STRIPE_WEBHOOK_SECRET=whsec_…
STRIPE_PRICE_ID_STARTER=price_…
STRIPE_PRICE_ID_GROWTH=price_…
STRIPE_PRICE_ID_ENTERPRISE=price_…
NEXORA_PUBLIC_URL=https://nexora-agn.com
RESEND_API_KEY=re_…
RESEND_FROM_EMAIL=info@nexora-agn.com
RESEND_ADMIN_EMAIL=info@nexora-agn.com
VITE_SUPABASE_URL=…          # read server-side too, via resolveSupabaseEnv()
SUPABASE_SERVICE_ROLE_KEY=…  # server only — never VITE_-prefixed
```

Browser-side: `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_…`

In production these live in **Hostinger → Environment variables**, and are only
read at process start — a redeploy is required after changing them.

### Stripe webhook

Endpoint `https://nexora-agn.com/api/stripe-webhook` must subscribe to all four:

```
checkout.session.completed
customer.subscription.trial_will_end
invoice.paid
invoice.payment_failed
```

Missing events fail silently — Stripe simply never calls us, and the
corresponding email never sends. Check with:

```bash
curl -s https://api.stripe.com/v1/webhook_endpoints -u "$STRIPE_SECRET_KEY:" \
  | python3 -c "import json,sys; [print(w['url'], w['enabled_events']) for w in json.load(sys.stdin)['data']]"
```

> When updating via the API, `enabled_events` is **replaced**, not appended.
> Always list all four or you will silently drop one.

## Local development & testing

Neither script below requires a card, Stripe CLI, or a deploy.

### 1. Preview the email templates

Renders the real templates to `.email-preview/` (gitignored). Sends nothing:

```bash
node --env-file=.env scripts/preview-subscription-email.mjs
```

Deliver them to a real inbox to check rendering:

```bash
node --env-file=.env scripts/preview-subscription-email.mjs --send you@example.com
node --env-file=.env scripts/preview-subscription-email.mjs --send you@example.com --only trial_started
```

### 2. End-to-end webhook test

Signs a realistic event with the real `STRIPE_WEBHOOK_SECRET` and POSTs it to the
dev server — exercising signature verification, routing, the handler, Supabase
and Resend. Start the dev server first:

```bash
node --env-file=.env scripts/test-stripe-webhook-local.mjs trial   you@example.com
node --env-file=.env scripts/test-stripe-webhook-local.mjs paid    you@example.com
node --env-file=.env scripts/test-stripe-webhook-local.mjs ending  you@example.com
node --env-file=.env scripts/test-stripe-webhook-local.mjs failed  you@example.com
```

⚠️ `trial` and `paid` insert a real row into whichever Supabase `.env` points at,
and all four send real email. `ending` and `failed` are the safe ones.

### Test cards

Test cards (`4242 4242 4242 4242`, etc.) only work in **test mode**. This account
and all its Payment Links are **live mode**, so test cards are declined there.
Use the scripts above instead — the only thing a card would additionally prove is
that Stripe's own checkout UI works.

Full list: https://docs.stripe.com/testing

### The one thing local testing cannot prove

That Stripe can reach our server. That requires a deploy plus one real signup —
a $0 trial costs nothing, but **cancel the subscription afterwards** or it bills
on day 7.

## Colleague setup

1. **Clone and install**

   ```bash
   git clone <repo> && cd nexora && npm install
   ```

2. **Get the secrets.** `.env` and `.mcp.json` are gitignored and contain live
   credentials. Ask an existing dev to share them through a password manager —
   never Slack, email, or a PR. Start from `.env.example` for the full list.

3. **Run it**

   ```bash
   npm run dev
   ```

4. **Verify Stripe access**

   ```bash
   curl -s https://api.stripe.com/v1/account -u "$STRIPE_SECRET_KEY:" \
     | python3 -c "import json,sys; print(json.load(sys.stdin)['settings']['dashboard']['display_name'])"
   ```

### Stripe MCP

`.mcp.json` (gitignored) registers Stripe's hosted MCP server:

```json
{
  "mcpServers": {
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com",
      "headers": { "Authorization": "Bearer $STRIPE_SECRET_KEY" }
    }
  }
}
```

Restart Claude Code after adding it.

**What it actually provides:** in practice this has surfaced Stripe's *skills*
(`/stripe:test-cards`, `/stripe:explain-error`, `/stripe:stripe-best-practices`,
`/stripe:upgrade-stripe`) rather than callable API tools. All the Stripe
inspection and configuration in this codebase was done with **`curl` against the
REST API** using `STRIPE_SECRET_KEY`, which works regardless of MCP state and is
the reliable path. The MCP is a convenience, not a requirement — a colleague with
`.env` can do everything without it.

⚠️ The config passes a **live secret key**. Anything the MCP can reach, it can
reach in production. Prefer a [restricted key](https://docs.stripe.com/keys#limit-access)
with read-only scopes for day-to-day work.

## Gotchas

| Symptom | Cause |
|---|---|
| "No subscriptions found" in Stripe | Trials are `trialing`, not `active` — use the **All** tab |
| $0.00 invoices everywhere | Normal: Stripe opens every trial with a $0 invoice |
| Customer got no email after paying | Code not deployed, or the event isn't in `enabled_events` |
| Test card declined | The account is live mode; test cards need test mode |
| Email says the wrong plan | Price ID isn't in the env vars — `resolvePlanFromPriceId` falls back to "Subscription" |
| Customer emailed twice | A post-email failure returned non-2xx and Stripe retried |

### Known gaps

- **No idempotency store.** Stripe can, rarely, deliver the same event twice; we
  would email twice. Fixing it properly means persisting processed event IDs.
- **Payment Links allow double-subscribing.** Nothing stops a customer clicking
  the trial link twice and being billed twice.
- **`customer.subscription.deleted` is not handled** — cancellations are silent
  to both the customer and the team.
- **Email footer says "NEXORA SOLUTION L.L.C."** while the entity is NEXORA
  AGENCY 029 LLC and the descriptor is NEXORA AGENCY. Three names; needs a decision.
