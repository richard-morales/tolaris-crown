/**
 * src/lib/email.ts
 * ------------------------------------------------------------
 * Centralized email utility using Resend.
 * - Test-safe defaults (no verified domain required)
 * - Reply-To set to your university email (so people can reply)
 * - Automatic "test environment" disclaimer unless APP_ENV=production
 * - All values configurable via env vars for an instant switch to prod
 * ------------------------------------------------------------
 */

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_NAME = process.env.EMAIL_FROM_NAME || "Tolaris Crown (Test)";
const FROM_ADDR = process.env.EMAIL_FROM_ADDRESS || "onboarding@resend.dev"; // default Resend sender
const REPLY_TO = process.env.EMAIL_REPLY_TO || undefined;
const APP_ENV = process.env.APP_ENV || process.env.NODE_ENV || "development";

/**
 * Wrap HTML with a test disclaimer when not in production.
 */
function withDisclaimer(html: string): string {
  if (APP_ENV === "production") return html;

  const note = `
    <div style="background:#fff3cd;border:1px solid #ffeeba;color:#856404;
                padding:12px;border-radius:6px;margin-bottom:16px;font-size:14px;">
      <strong>Heads up:</strong> This email was sent from a <em>test environment</em>.
      Sender is <code>${FROM_NAME} &lt;${FROM_ADDR}&gt;</code>.
      Replies will go to <code>${REPLY_TO ?? "no reply-to set"}</code>.
    </div>
  `;
  return note + html;
}

/**
 * Send a transactional email. No-op in dev if RESEND_API_KEY is not set.
 */
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const { to, subject } = opts;
  let { html } = opts;

  if (!to || !subject || !html) {
    console.warn("[email] Missing parameters", { to, subject });
    return;
  }

  html = withDisclaimer(html);

  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set; skipping send to", to);
    return;
  }

  try {
    const response = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_ADDR}>`,
      to: [to],
      subject,
      html,
      replyTo: REPLY_TO ? [REPLY_TO] : undefined,
    });

    if (response.error) {
      console.error("[email] Resend error:", response.error);
      if (APP_ENV === "production") throw response.error;
    } else {
      console.info(`[email] ✅ Sent "${subject}" to ${to}`);
    }
  } catch (err) {
    console.error("[email] ❌ Failed to send:", err);
    if (APP_ENV === "production") throw err;
  }
}
