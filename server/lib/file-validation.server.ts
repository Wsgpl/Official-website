import fs from "node:fs/promises";

// Allowed MIME types mapped to expected magic byte signatures
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/zip",
  "application/x-zip-compressed",
  "model/stl",
  "model/x-stl",
  "application/sla",
  "application/step",
  "model/step",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".zip",
  ".stl",
  ".step",
  ".stp",
]);

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
}

export async function validateUploadedFile(
  filePath: string,
  originalFilename: string,
  declaredMimeType: string
): Promise<ValidationResult> {
  // 1. Extension check
  const extMatch = originalFilename.match(/\.[0-9a-z]+$/i);
  const ext = extMatch ? extMatch[0].toLowerCase() : "";
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `File extension '${ext}' is not permitted. Allowed: PDF, PNG, JPG, ZIP, STL, STEP.`,
    };
  }

  // 2. Read first 512 bytes for Magic Signature check
  try {
    const handle = await fs.open(filePath, "r");
    const buffer = Buffer.alloc(512);
    const { bytesRead } = await handle.read(buffer, 0, 512, 0);
    await handle.close();

    if (bytesRead < 4) {
      return { valid: false, error: "File is corrupt or empty." };
    }

    const detectedMime = detectMagicMime(buffer, ext);

    if (!detectedMime) {
      return {
        valid: false,
        error: "File content signature (magic bytes) does not match the permitted file types.",
      };
    }

    return { valid: true, detectedMime };
  } catch (err) {
    console.error("Error inspecting file magic bytes:", err);
    return { valid: false, error: "Failed to read uploaded file for security validation." };
  }
}

function detectMagicMime(buffer: Buffer, ext: string): string | null {
  // PDF: %PDF- (0x25 0x50 0x44 0x46)
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return "application/pdf";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // ZIP (PK..): 50 4B 03 04
  if (buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04) {
    return "application/zip";
  }

  // STL ASCII: Starts with "solid"
  const asciiHeader = buffer.toString("utf8", 0, 80).toLowerCase();
  if (ext === ".stl") {
    if (asciiHeader.startsWith("solid")) {
      return "model/stl";
    }
    // Binary STL has 80-byte header, followed by 4-byte uint32 triangle count
    return "model/stl";
  }

  // STEP file ASCII: ISO-10303-21
  if ((ext === ".step" || ext === ".stp") && asciiHeader.includes("iso-10303-21")) {
    return "model/step";
  }

  return null;
}
