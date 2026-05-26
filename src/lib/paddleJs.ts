import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInit: Promise<Paddle | undefined> | null = null;

function clientToken(): string | undefined {
  return (import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string | undefined)?.trim() || undefined;
}

export function isPaddleJsConfigured(): boolean {
  return Boolean(clientToken());
}

function paddleEnvironment(): "sandbox" | "production" {
  const token = clientToken() ?? "";
  const forceSandbox = (import.meta.env.VITE_PADDLE_SANDBOX as string | undefined)?.trim();
  if (forceSandbox === "1" || /^true$/i.test(forceSandbox ?? "")) return "sandbox";
  if (token.startsWith("test_")) return "sandbox";
  return "production";
}

function successUrl(): string {
  const explicit = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.trim().replace(/\/$/, "");
  const origin = explicit || (typeof window !== "undefined" ? window.location.origin : "");
  return `${origin}/payment/complete`;
}

async function getPaddle(): Promise<Paddle> {
  const token = clientToken();
  if (!token) {
    throw new Error(
      "Paddle checkout is not configured. Set VITE_PADDLE_CLIENT_TOKEN (client-side token from Paddle → Developer tools → Authentication).",
    );
  }

  if (!paddleInit) {
    paddleInit = initializePaddle({
      environment: paddleEnvironment(),
      token,
      checkout: {
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
          successUrl: successUrl(),
        },
      },
      eventCallback: event => {
        if (event.name === "checkout.completed") {
          window.location.assign(successUrl());
        }
      },
    });
  }

  const paddle = await paddleInit;
  if (!paddle) {
    throw new Error("Could not initialize Paddle.js.");
  }
  return paddle;
}

/**
 * Opens Paddle Checkout for a server-created transaction ([Paddle.js pass-transaction flow](https://developer.paddle.com/build/transactions/pass-transaction-checkout)).
 * Falls back to hosted `checkout.url` redirect when no client token is configured.
 */
export async function openPaddleCheckout(input: {
  transactionId?: string | null;
  paymentUrl?: string | null;
}): Promise<"overlay" | "redirect"> {
  const transactionId = input.transactionId?.trim();
  const paymentUrl = input.paymentUrl?.trim();

  if (transactionId && isPaddleJsConfigured()) {
    const paddle = await getPaddle();
    paddle.Checkout.open({
      transactionId,
      settings: {
        displayMode: "overlay",
        successUrl: successUrl(),
      },
    });
    return "overlay";
  }

  if (paymentUrl) {
    window.location.assign(paymentUrl);
    return "redirect";
  }

  if (!transactionId) {
    throw new Error("Missing Paddle transaction id from the server.");
  }

  throw new Error(
    "Paddle.js is not configured (VITE_PADDLE_CLIENT_TOKEN). Add a client-side token to open checkout on-site.",
  );
}
