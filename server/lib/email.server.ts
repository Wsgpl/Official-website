import process from "node:process";
import fs from "node:fs/promises";
import nodemailer from "nodemailer";
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
  const provider = (process.env.EMAIL_PROVIDER || "auto").toLowerCase();

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

  // ─── MODE 1: STRICT RESEND PROVIDER ───
  if (provider === "resend") {
    return sendViaResend(payload, recipient, emailSubject, htmlBody);
  }

  // ─── MODE 2: SMTP PROVIDER (STRICT OR AUTO) ───
  const smtpHost = process.env.SMTP_HOST || "smtp.office365.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true";

  if (!smtpUser || !smtpPass) {
    console.error("❌ [Email Error] SMTP_USER or SMTP_PASS is missing in environment variables.");
    if (provider === "smtp") {
      // In strict 'smtp' mode, fail loudly without fallback
      return false;
    }
    // In 'auto' mode, attempt Resend fallback
    console.log("ℹ️ [Email Auto Mode] Falling back to Resend API...");
    return sendViaResend(payload, recipient, emailSubject, htmlBody);
  }

  try {
    console.log(`[Email] Dispatching via SMTP (${smtpHost}:${smtpPort}) as ${smtpUser}...`);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    const attachments = [];
    if (payload.fileDetails && payload.fileDetails.sizeBytes <= 10 * 1024 * 1024) {
      attachments.push({
        filename: payload.fileDetails.originalFilename,
        path: payload.fileDetails.storedPath,
      });
    }

    const info = await transporter.sendMail({
      from: `"Wingspann Notifications" <${smtpUser}>`,
      to: recipient,
      subject: emailSubject,
      html: htmlBody,
      attachments,
    });

    console.log(`✅ [Email SMTP Success] Message delivered (ID: ${info.messageId})`);
    return true;
  } catch (err: any) {
    // Sanitized Error Logging: Log ONLY server response code & text message (NEVER dump config or auth pass)
    console.error(`❌ [Email SMTP Failure] Code: ${err.code || "UNKNOWN"} | Command: ${err.command || "N/A"}`);
    if (err.response) {
      console.error(`   SMTP Server Response: ${err.response}`);
    } else if (err.message) {
      console.error(`   SMTP Error Message: ${err.message}`);
    }

    // In strict 'smtp' mode: fail loudly, DO NOT substitute Resend
    if (provider === "smtp") {
      console.error("⛔ EMAIL_PROVIDER=smtp is set to strict mode. Dispatch failed loudly without fallback.");
      return false;
    }

    // In 'auto' mode: attempt Resend fallback
    console.log("ℹ️ [Email Auto Mode] SMTP failed. Falling back to Resend API...");
    return sendViaResend(payload, recipient, emailSubject, htmlBody);
  }
}

// ─── RESEND DISPATCH HELPER ───
async function sendViaResend(
  payload: EmailPayload,
  recipient: string,
  emailSubject: string,
  htmlBody: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_123456789") {
    console.log(`[Email Mock/Dev] Resend key not configured. Would send to ${recipient}:\nSubject: ${emailSubject}`);
    return false;
  }

  try {
    console.log("[Email] Dispatching notification email via Resend API...");
    const resend = new Resend(apiKey);
    const attachments = [];

    if (payload.fileDetails && payload.fileDetails.sizeBytes <= 10 * 1024 * 1024) {
      try {
        const fileContent = await fs.readFile(payload.fileDetails.storedPath);
        attachments.push({
          filename: payload.fileDetails.originalFilename,
          content: fileContent,
        });
      } catch (fileErr) {
        console.error("Error reading file for Resend attachment:", fileErr);
      }
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL || "notifications@mail.wingspannglobal.com";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject: emailSubject,
      html: htmlBody,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("❌ Resend delivery error:", error);
      return false;
    }

    console.log(`✅ [Email Resend Success] Delivered to ${recipient} (Message ID: ${data?.id})`);
    return true;
  } catch (err: any) {
    console.error("❌ Failed to send email notification via Resend:", err.message || err);
    return false;
  }
}
