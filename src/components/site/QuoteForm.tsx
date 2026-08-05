import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { TurnstileWidget } from "./TurnstileWidget";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.enum(["quote", "consultation", "general"]),
  quoteTarget: z.string().optional(),
  message: z.string().trim().min(5).max(1500),
});

interface Props {
  compact?: boolean;
  defaultTopic?: "quote" | "consultation" | "general";
  variant?: "default" | "contactPage";
}

export function QuoteForm({ compact = false, defaultTopic = "quote", variant = "default" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<"quote" | "consultation" | "general">(defaultTopic);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const fd = new FormData(formElement);
    const rawObj = Object.fromEntries(fd);
    const parsed = schema.safeParse(rawObj);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      return;
    }

    if (!turnstileToken) {
      toast.error("Please complete the security check.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      // Map topic to backend source (quote | contact | consultation)
      let source = "contact";
      if (parsed.data.topic === "quote") source = "quote";
      else if (parsed.data.topic === "consultation") source = "consultation";

      payload.append("source", source);
      payload.append("name", parsed.data.name);
      payload.append("email", parsed.data.email);
      if (parsed.data.company) payload.append("company", parsed.data.company);
      if (parsed.data.quoteTarget) payload.append("subject", parsed.data.quoteTarget);
      payload.append("message", parsed.data.message);
      payload.append("turnstileToken", turnstileToken);

      const res = await fetch("/api/submit", {
        method: "POST",
        body: payload,
      });

      let resData: any = null;
      try {
        const text = await res.text();
        resData = text ? JSON.parse(text) : null;
      } catch (jsonErr) {
        console.error("[QuoteForm JSON Error]", jsonErr);
      }

      if (!res.ok || !resData?.success) {
        const serverError = resData?.error;
        throw new Error(serverError || "Submission failed");
      }

      toast.success(resData.message || "Thanks — our engineering team will reach out within 24h.");
      formElement.reset();
      setSelectedTopic(defaultTopic);
      setTurnstileToken("");
    } catch (err: any) {
      console.error("[QuoteForm Error]", err);
      const isUserFriendly = err.message && !err.message.includes("Unexpected") && !err.message.includes("Failed to execute") && !err.message.includes("JSON");
      toast.error(isUserFriendly ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (variant === "contactPage") {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name, Email, Company in 3-column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Full Name"
            maxLength={80}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm focus:outline-[#00D084]"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            maxLength={160}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm focus:outline-[#00D084]"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            maxLength={120}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm focus:outline-[#00D084]"
          />
        </div>

        {/* Topic select + Quote Target select row */}
        <div className={`grid gap-4 ${selectedTopic === "quote" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          <div>
            <select
              name="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value as "quote" | "consultation" | "general")}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm text-slate-600 focus:outline-[#00D084] appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundPosition: "right 16px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "16px",
              }}
            >
              <option value="quote">Request a Quote</option>
              <option value="consultation">Book Consultation</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          {selectedTopic === "quote" && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-200">
              <select
                name="quoteTarget"
                required
                defaultValue=""
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm text-slate-600 focus:outline-[#00D084] appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundPosition: "right 16px center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "16px",
                }}
              >
                <option value="" disabled>
                  Select Product, Service, or 3D Printing...
                </option>

                <optgroup label="── PRODUCTS ──">
                  <option value="THE THIRD EYE">THE THIRD EYE (Industrial Quadcopter)</option>
                  <option value="Sentinel-S Survey">Sentinel-S Survey</option>
                </optgroup>

                <optgroup label="── SERVICES ──">
                  <option value="Custom UAV Development">Custom UAV Development & Design</option>
                  <option value="Drone Manufacturing">Drone Manufacturing & Assembly</option>
                  <option value="Drone Survey & Mapping">Drone Survey & Mapping</option>
                  <option value="Infrastructure Inspection">Infrastructure Inspection</option>
                  <option value="Agriculture Solutions">Agriculture Solutions</option>
                  <option value="Drone-as-a-Service">Drone-as-a-Service (DaaS)</option>
                  <option value="War Room Command Center">War Room Command Center</option>
                </optgroup>

                <optgroup label="── 3D PRINTING ──">
                  <option value="Markforged Mark Two">Markforged Mark Two</option>
                  <option value="Markforged FX10">Markforged FX10</option>
                </optgroup>
              </select>
            </div>
          )}
        </div>

        {/* Project Details / Message */}
        <div>
          <textarea
            name="message"
            required
            rows={6}
            maxLength={1500}
            placeholder="Write Here..."
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded text-sm focus:outline-[#00D084] resize-none"
          />
        </div>

        {/* Turnstile Abuse Protection */}
        <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

        {/* Submit Button centered */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-[#00D084] hover:bg-[#00b270] disabled:opacity-60 text-white font-semibold text-sm px-10 py-4 rounded transition-all cursor-pointer select-none"
          >
            {submitting ? "Sending…" : "Send Message →"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${compact ? "" : "p-1"}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="name" placeholder="Jane Doe" required />
        <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company" name="company" placeholder="Acme Industrial" />
        <div>
          <Label>Topic</Label>
          <select
            name="topic"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as "quote" | "consultation" | "general")}
            className="mt-1.5 w-full px-4 py-3 bg-surface border border-brand/10 rounded text-sm focus:outline-accent"
          >
            <option value="quote">Request a Quote</option>
            <option value="consultation">Book Consultation</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>
      </div>

      {selectedTopic === "quote" && (
        <div className="animate-in fade-in duration-200">
          <Label>Select Product / Service / 3D Printing</Label>
          <select
            name="quoteTarget"
            required
            defaultValue=""
            className="mt-1.5 w-full px-4 py-3 bg-surface border border-brand/10 rounded text-sm focus:outline-accent"
          >
            <option value="" disabled>
              Select Product, Service, or 3D Printing...
            </option>

            <optgroup label="── PRODUCTS ──">
              <option value="THE THIRD EYE">THE THIRD EYE (Industrial Quadcopter)</option>
              <option value="Sentinel-S Survey">Sentinel-S Survey</option>
            </optgroup>

            <optgroup label="── SERVICES ──">
              <option value="Custom UAV Development">Custom UAV Development & Design</option>
              <option value="Drone Manufacturing">Drone Manufacturing & Assembly</option>
              <option value="Drone Survey & Mapping">Drone Survey & Mapping</option>
              <option value="Infrastructure Inspection">Infrastructure Inspection</option>
              <option value="Agriculture Solutions">Agriculture Solutions</option>
              <option value="Drone-as-a-Service">Drone-as-a-Service (DaaS)</option>
              <option value="War Room Command Center">War Room Command Center</option>
            </optgroup>

            <optgroup label="── 3D PRINTING ──">
              <option value="Markforged Mark Two">Markforged Mark Two</option>
              <option value="Markforged FX10">Markforged FX10</option>
            </optgroup>
          </select>
        </div>
      )}

      <div>
        <Label>Project details</Label>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={1500}
          placeholder="Tell us about your mission, payload, environment, timeline…"
          className="mt-1.5 w-full px-4 py-3 bg-surface border border-brand/10 rounded text-sm focus:outline-accent resize-none"
        />
      </div>

      {/* Turnstile Abuse Protection */}
      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand hover:bg-brand/90 disabled:opacity-60 text-white py-4 rounded font-bold uppercase text-xs tracking-widest shadow-lg shadow-brand/20 transition-colors"
      >
        {submitting ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-bold uppercase tracking-widest text-brand/60">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={type === "email" ? 160 : 120}
        className="mt-1.5 w-full px-4 py-3 bg-surface border border-brand/10 rounded text-sm focus:outline-accent"
      />
    </div>
  );
}
