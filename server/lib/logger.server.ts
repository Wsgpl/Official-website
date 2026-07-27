export type SecurityEventType =
  | "RATE_LIMIT_EXCEEDED"
  | "ADMIN_LOGIN_RATE_LIMIT"
  | "TURNSTILE_FAILED"
  | "AUTH_SUCCESS"
  | "AUTH_FAILED"
  | "UNAUTHORIZED_ACCESS"
  | "FILE_VALIDATION_FAILED";

export interface SecurityEventLog {
  timestamp: string;
  eventType: SecurityEventType;
  ip: string;
  endpoint: string;
  details?: Record<string, unknown>;
}

export function logSecurityEvent(
  eventType: SecurityEventType,
  ip: string,
  endpoint: string,
  details?: Record<string, unknown>
): void {
  const logEntry: SecurityEventLog = {
    timestamp: new Date().toISOString(),
    eventType,
    ip: sanitizeIpForLog(ip),
    endpoint,
    details,
  };

  // Structured non-PII JSON output
  console.warn(`[SECURITY EVENT] ${JSON.stringify(logEntry)}`);
}

function sanitizeIpForLog(ip: string): string {
  if (!ip) return "unknown";
  if (ip === "::1" || ip === "127.0.0.1") return ip;
  // Mask last octet of IPv4 or last segments of IPv6 to prevent PII logging
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }
  return ip.substring(0, 10) + "...";
}
