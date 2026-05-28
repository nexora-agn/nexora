/**
 * Optional production overrides (uploaded as-is to dist/).
 *
 * If you use Hostinger *static* hosting (no Node), `/api/send-form-emails` does not exist.
 * Uncomment and set this to your form API origin (same repo deployed on Node/Vercel, no trailing slash):
 *
 * window.__NEXORA_FORM_API_URL__ = "https://your-node-or-serverless-deployment.example.com";
 *
 * Chirps assistant IDs (template id keys — see docs/CHIRPS_TEMPLATE_SETUP.md):
 *
 * window.__NEXORA_CHIRPS_ASSISTANTS__ = {
 *   marketing: "your-marketing-assistant-uuid",
 *   plumbing: "your-plumber-template-assistant-uuid",
 *   electrical: "your-electrician-template-assistant-uuid",
 *   landscaping: "your-landscaping-assistant-uuid",  // default wired in chirpsConfig
 * };
 */
