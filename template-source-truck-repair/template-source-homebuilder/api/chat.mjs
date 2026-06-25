/**
 * Vercel / Netlify serverless function for the chatbot endpoint.
 *
 * The exported ZIP ships this file so deploying to Vercel works out-of-the-box
 * once the platform env vars (`OPENAI_API_KEY` or `ANTHROPIC_API_KEY`) are
 * set. Works identically when dropped into Netlify's `netlify/functions` or
 * Cloudflare Pages functions (they both honour the Request/Response handler
 * we're exporting).
 */

import { handleChatRequest, resolveChatEnv } from "../server/chat-logic.mjs";

const chatEnv = resolveChatEnv();

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  // Node-style request: read stream
  let raw = "";
  for await (const chunk of req) raw += chunk;
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const body = await readJsonBody(req);
    const result = await handleChatRequest({
      message: body.message,
      history: body.history,
      siteData: body.siteData,
      env: chatEnv,
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err?.message || "Chat request failed" }));
  }
}
