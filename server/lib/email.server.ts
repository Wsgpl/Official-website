import process from "node:process";
import fs from "node:fs/promises";
import { Resend } from "resend";

interface EmailPayload {
  source: "quote" | "contact" | "consultation" | "careers" | "rpto" | "3d_print";
  submissionId: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  fileDetails?: {
    originalFilename: string;
    storedPath: string;
    mimeType: string;
    sizeBytes: number;
  } | null;
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendSubmissionEmail(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  // Determine production recipient based on source
  let targetEmail = "info@wingspannglobal.com";
  if (payload.source === "careers") {
    targetEmail = "hr@wingspannglobal.com";
  } else if (payload.source === "rpto") {
    targetEmail = "RPTO@wingspannglobal.com";
  }

  // Dev-safe recipient override (ensures non-production envs never hit real mailboxes)
  const isDev = process.env.NODE_ENV !== "production";
  const devEmail = process.env.DEV_NOTIFICATION_EMAIL;
  const recipient = isDev && devEmail ? devEmail : targetEmail;
  const isDevOverride = Boolean(isDev && devEmail && devEmail !== targetEmail);

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone) || "N/A";
  const safeCompany = escapeHtml(payload.company) || "N/A";
  const safeSubject = escapeHtml(payload.subject) || "N/A";
  const safeMessage = escapeHtml(payload.message);

  const emailSubject = `[New ${payload.source.toUpperCase()} Lead] ${safeName} ${
    payload.subject ? `- ${safeSubject}` : ""
  }`;

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-top: 0;">New ${payload.source.toUpperCase()} Submission</h2>
      ${
        isDevOverride
          ? `<p style="background: #fef3c7; color: #92400e; padding: 10px; border-radius: 6px; font-size: 13px;">
              ⚠️ <strong>DEV OVERRIDE ACTIVE</strong>: Intended production inbox was <code>${targetEmail}</code>. Delivered to test address: <code>${recipient}</code>.
            </p>`
          : ""
      }
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Submission ID:</td><td>${payload.submissionId}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${safeName}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${safePhone}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Company / Org:</td><td>${safeCompany}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Subject / Product:</td><td>${safeSubject}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Source Page:</td><td>${payload.source}</td></tr>
      </table>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <h4 style="color: #0f172a; margin-bottom: 8px;">Message / Specs:</h4>
      <div style="background: #f8fafc; padding: 12px 16px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; color: #334155;">
        ${safeMessage}
      </div>

      ${
        payload.fileDetails
          ? `<div style="margin-top: 20px; padding: 12px; background: #e0f2fe; border-radius: 6px; color: #0369a1; font-size: 13px;">
              📎 <strong>Attached File:</strong> ${escapeHtml(payload.fileDetails.originalFilename)} (${Math.round(payload.fileDetails.sizeBytes / 1024)} KB)
              ${
                payload.fileDetails.sizeBytes > 10 * 1024 * 1024
                  ? `<br/><em>Note: File exceeds 10MB limit for direct attachment. Stored safely at server path: ${escapeHtml(payload.fileDetails.storedPath)}</em>`
                  : ""
              }
            </div>`
          : ""
      }
    </div>
  `;

  if (!apiKey || apiKey === "re_123456789") {
    console.log(`[Email Mock/Dev] Resend key not configured. Would send to ${recipient}:\nSubject: ${emailSubject}`);
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const attachments = [];

    // Attach file if exists and under 10MB
    if (payload.fileDetails && payload.fileDetails.sizeBytes <= 10 * 1024 * 1024) {
      try {
        const fileContent = await fs.readFile(payload.fileDetails.storedPath);
        attachments.push({
          filename: payload.fileDetails.originalFilename,
          content: fileContent,
        });
      } catch (fileErr) {
        console.error("Error reading file for attachment:", fileErr);
      }
    }

    const { error } = await resend.emails.send({
      from: "Wingspann Notifications <notifications@wingspannglobal.com>",
      to: recipient,
      subject: emailSubject,
      html: htmlBody,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Failed to send email notification:", err);
    return false;
  }
}
