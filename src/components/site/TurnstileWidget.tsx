import { Turnstile } from "@marsidev/react-turnstile";

interface Props {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

// Fallback to Cloudflare's official dummy test sitekey if env var is not set
const DEFAULT_TEST_SITEKEY = "1x00000000000000000000AA";

export function TurnstileWidget({ onVerify, onExpire, className }: Props) {
  const siteKey = (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY || DEFAULT_TEST_SITEKEY;

  return (
    <div className={`my-3 flex justify-center ${className || ""}`}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={onExpire}
        options={{
          theme: "auto",
          size: "normal",
        }}
      />
    </div>
  );
}
