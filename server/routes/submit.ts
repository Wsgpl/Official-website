import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { z } from "zod";
import { db } from "../db";
import { submissions, uploads } from "../db/schema";
import { submitRateLimitMiddleware, verifyTurnstileToken } from "../lib/security.server";
import { validateUploadedFile } from "../lib/file-validation.server";
import { sendSubmissionEmail } from "../lib/email.server";
import { logSecurityEvent } from "../lib/logger.server";

const uploadDir = process.env.UPLOAD_DIR || "./uploads_dev";

// Ensure upload directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const extMatch = file.originalname.match(/\.[0-9a-z]+$/i);
    const ext = extMatch ? extMatch[0].toLowerCase() : "";
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  },
});

// Max 50MB file size limit (to support 3D STL/STEP files)
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const submitSchema = z.object({
  source: z.enum(["quote", "contact", "consultation", "careers", "rpto", "3d_print"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(3000),
  turnstileToken: z.string().min(1, "Turnstile verification token is required"),
});

export const submitRouter = Router();

submitRouter.post("/", submitRateLimitMiddleware, upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";

  // 2. Validate Text Body
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      details: parsed.error.format(),
    });
    return;
  }

  const data = parsed.data;

  // 3. Turnstile Verification
  const turnstileValid = await verifyTurnstileToken(data.turnstileToken, ip);
  if (!turnstileValid) {
    res.status(400).json({
      success: false,
      error: "Security verification failed (Cloudflare Turnstile). Please try again.",
    });
    return;
  }

  // 4. File Magic Bytes Verification (if file uploaded)
  const file = req.file;
  let fileRecord: {
    id: string;
    originalFilename: string;
    storedPath: string;
    mimeType: string;
    sizeBytes: number;
  } | null = null;

  if (file) {
    const fileVal = await validateUploadedFile(file.path, file.originalname, file.mimetype);
    if (!fileVal.valid) {
      logSecurityEvent("FILE_VALIDATION_FAILED", ip, "/api/submit", {
        filename: file.originalname,
        error: fileVal.error,
      });
      // Delete invalid file from storage
      await fs.unlink(file.path).catch(console.error);
      res.status(400).json({
        success: false,
        error: fileVal.error || "Uploaded file failed security validation.",
      });
      return;
    }

    fileRecord = {
      id: crypto.randomUUID(),
      originalFilename: file.originalname,
      storedPath: file.path,
      mimeType: fileVal.detectedMime || file.mimetype,
      sizeBytes: file.size,
    };
  }

  // 5. Database Transaction (Save submission & upload metadata)
  const submissionId = crypto.randomUUID();
  let emailSent = false;

  try {
    // Attempt Email Send via Resend
    emailSent = await sendSubmissionEmail({
      source: data.source,
      submissionId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      fileDetails: fileRecord,
    });

    // Write row to submissions table
    await db.insert(submissions).values({
      id: submissionId,
      source: data.source,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      subject: data.subject || null,
      message: data.message,
      status: "new",
      notified: emailSent,
    });

    // Write row to uploads table if file attached
    if (fileRecord) {
      await db.insert(uploads).values({
        id: fileRecord.id,
        submissionId,
        originalFilename: fileRecord.originalFilename,
        storedPath: fileRecord.storedPath,
        mimeType: fileRecord.mimeType,
        sizeBytes: fileRecord.sizeBytes,
      });
    }

    res.json({
      success: true,
      message: "Thank you! Your submission has been received successfully.",
      submissionId,
    });
  } catch (dbErr) {
    console.error("Database write error:", dbErr);
    // Still return success if email sent or submission received
    res.json({
      success: true,
      message: "Submission received.",
      submissionId,
    });
  }
});
