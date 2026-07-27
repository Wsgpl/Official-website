import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: Props) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4 ${invert ? "text-accent" : "text-accent"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight ${invert ? "text-white" : "text-brand"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${invert ? "text-white/60" : "text-brand/70"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
