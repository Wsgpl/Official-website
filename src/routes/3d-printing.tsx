import { useRef, useState, useEffect, type ChangeEvent, type DragEvent } from "react";
import { UploadCloud, FileCheck2, X, Printer, Upload, Calculator, Settings, Wrench, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

import markTwoImg from "../assets/3D1.webp";
import fx10Img from "../assets/3D2.webp";
import printerVideo from "../assets/3D video.mp4";
import workflowImg from "../assets/3dd.jpg";
import { FAQSection } from "../components/site/FAQSection";
import { TurnstileWidget } from "../components/site/TurnstileWidget";

export default PrintingPage;


// ─── Data ────────────────────────────────────────────────────────────────────

const heroTitleWords = [
  { text: "Industrial", x: -40, y: 20, isAccent: false },
  { text: "printers.", x: -20, y: -40, isAccent: true },
  { text: "In-house.", x: 20, y: 30, isAccent: false },
  { text: "On", x: -30, y: -20, isAccent: false },
  { text: "demand.", x: 40, y: 40, isAccent: true },
];

const heroSubtitleWords = [
  "Every", "part", "is", "printed", "on", "our", "own", "production", "floor."
];

const machines = [
  {
    id: "marktwo",
    badge: "FDM · Continuous Fiber",
    name: "Markforged Mark Two",
    img: markTwoImg,
    imgAlt: "Markforged Mark Two printer",
    desc: "Prints continuous carbon fiber, Kevlar and fibreglass reinforcement inside Nylon — producing parts stronger than aluminium at a fraction of the weight. Used for structural UAV frames, brackets and load-bearing components.",
    chips: ["CFR-Nylon", "Kevlar", "Fibreglass", "±0.1mm tolerance", "Build: 320×132×154mm"],
    specs: [
      { key: "Build volume", val: "320 × 132 × 154 mm" },
      { key: "Tolerance", val: "±0.1 mm" },
      { key: "Layer height", val: "100–200 µm" },
    ],
    mats: ["CFR-Nylon", "Kevlar", "Fibreglass", "Onyx"],
  },
  {
    id: "fx10",
    badge: "Industrial FDM · High-Temp",
    name: "Markforged FX10",
    img: fx10Img,
    imgAlt: "Markforged FX10 printer",
    desc: "A production-grade industrial printer capable of ULTEM 9085, PEEK and high-performance thermoplastics. Built for aerospace and defense-spec parts requiring flame retardancy, chemical resistance and repeatable tolerances.",
    chips: ["ULTEM 9085", "PEEK", "Onyx", "±0.2mm tolerance", "Build: 525×400×400mm"],
    specs: [
      { key: "Build volume", val: "525 × 400 × 400 mm" },
      { key: "Tolerance", val: "±0.2 mm" },
      { key: "Layer height", val: "50–250 µm" },
    ],
    mats: ["ULTEM 9085", "PEEK", "Onyx", "Nylon"],
  },
];

const fx10Features = [
  {
    title: "Laser Accuracy",
    desc: "Printhead-mounted optical sensors verify dimensional accuracy and assess device health and performance in real-time.",
  },
  {
    title: "Automatic Calibration",
    desc: "Automatic calibration and material changeover yields a simple, low-touch user experience — 3D print overnight without human intervention.",
  },
  {
    title: "Modular Print System",
    desc: "Swap between metal and composite print engines quickly. All FX10s ship with composite capability; metal is a purchasable add-on.",
  },
  {
    title: "Heated Print Chamber",
    desc: "Automated spool changeover lets you print large, high-quality parts with its laser micrometre and onboard vision module for precise calibration.",
  },
];

const fx10Materials = {
  plastics: ["Onyx", "Onyx FR", "Onyx ESD", "Nylon White", "Nylon White FS (Food Safe)"],
  fibres: ["Carbon Fibre", "Carbon Fibre FR"],
  metals: ["17-4PH Stainless Steel", "316L Stainless Steel", "More metal materials coming soon…"],
};

const markTwoFeatures = [
  {
    title: "Continuous Fibre Printing",
    desc: "The world's first 3D printer to print composite materials — continuous carbon fibre, Kevlar® and fibreglass inside Nylon for an unmatched strength-to-weight ratio.",
  },
  {
    title: "Dual Nozzle System",
    desc: "Actively switches between two nozzles during printing — one for Onyx/Nylon outer shell, one for embedding continuous fibre reinforcement deep inside the part.",
  },
  {
    title: "Eiger Cloud Software",
    desc: "Browser-based, always up-to-date platform. Manage STL files, set fibre density per layer with a slider, and send print jobs over LAN, USB or Wi-Fi.",
  },
  {
    title: "Pause & Embed",
    desc: "Pause the print mid-build to embed electronics, sensors or ball bearings directly inside the component — a unique capability for advanced functional parts.",
  },
];

const markTwoDelivery = [
  "1× Mark Two Onyx 3D Printer",
  "1× Build Platform Desktop Series True Bed",
  "1× Onyx FFF filament 800 cm³ roll",
  "1× Fibreglass CFF Filament 50 cm³ Roll",
  "1× Kevlar CFF Filament 50 cm³ Roll",
  "2× Carbon Fibre 50 cm³ Rollers",
  "1× High Temperature Fibreglass 50 cm³ Roll",
  "3× FFF replacement nozzle",
  "3× CFF Replacement Nozzle",
  "1× Dry Box",
  "1× Tool Set",
];

const workflowSteps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload",
    shortDesc: "Instant STL analysis",
    stats: [
      { label: "Formats", val: "STL · STEP · OBJ" },
      { label: "Max size", val: "50 MB", accent: true },
      { label: "Analysis", val: "< 30 sec", accent: true },
    ],
    detailTitle: "Upload your file",
    detailSub: "STL, STEP or OBJ — max 50 MB per file",
  },
  {
    step: "02",
    icon: Calculator,
    title: "Quote",
    shortDesc: "Fast pricing options",
    stats: [
      { label: "Response", val: "< 4 hrs", accent: true },
      { label: "Options", val: "Material · Finish" },
      { label: "Revisions", val: "Unlimited" },
    ],
    detailTitle: "Get your quote",
    detailSub: "Material options and pricing reviewed by our engineers",
  },
  {
    step: "03",
    icon: Settings,
    title: "Print",
    shortDesc: "24/7 Industrial print",
    stats: [
      { label: "Resolution", val: "50–200 µm", accent: true },
      { label: "Uptime", val: "24/7", accent: true },
      { label: "QA", val: "Full in-process" },
    ],
    detailTitle: "Production printing",
    detailSub: "24/7 industrial machines with real-time QA monitoring",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Finish",
    shortDesc: "Post-process & QA",
    stats: [
      { label: "Surface", val: "Raw · Sanded · Primed" },
      { label: "Inspection", val: "Dimensional CMM" },
      { label: "Certs", val: "Full material" },
    ],
    detailTitle: "Post-processing",
    detailSub: "Support removal, surface finishing and dimensional inspection",
  },
  {
    step: "05",
    icon: Truck,
    title: "Ship",
    shortDesc: "Express 48h delivery",
    stats: [
      { label: "Lead time", val: "48–72 hrs", accent: true },
      { label: "Packaging", val: "Anti-static · Foam" },
      { label: "Tracking", val: "Door-to-door" },
    ],
    detailTitle: "Ship to you",
    detailSub: "Parts shipped within 48–72 hours of approval",
  },
];

const materials = [
  { tag: "Structural", name: "CFR-Nylon", desc: "Carbon-fiber reinforced for load-bearing structural parts — stronger than aluminium, lighter than steel." },
  { tag: "Aerospace", name: "ULTEM 9085", desc: "Certified flame-retardant, high-temp resistant thermoplastic for aerospace and defense applications." },
  { tag: "High-temp", name: "PEEK", desc: "Extreme chemical and heat resistance for harsh or sterile environments." },
  { tag: "Metal", name: "Titanium (DMLS)", desc: "Aerospace-grade metal printing with full material traceability and certification." },
  { tag: "Detail", name: "Resin (SLA)", desc: "Sub-50 µm tolerances and smooth surface finish for visual and precision parts." },
  { tag: "Flexible", name: "TPU", desc: "Flexible elastomer for gaskets, vibration mounts and seals." },
];

const ALLOWED = [".stl", ".step", ".stp", ".obj"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Eyebrow({ children, invert = false }: { children: React.ReactNode; invert?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase mb-4 ${invert ? "text-accent" : "text-accent"}`}>
      <span className="w-6 h-px bg-accent flex-shrink-0" />
      {children}
    </div>
  );
}

function MachineModal({
  machine,
  onClose,
  onQuote,
}: {
  machine: typeof machines[0] | null;
  onClose: () => void;
  onQuote: () => void;
}) {
  if (!machine) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-surface w-full max-w-lg rounded-3xl border border-brand/5 shadow-2xl shadow-brand/10 overflow-hidden"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="h-48 bg-brand flex items-center justify-center overflow-hidden">
          <img src={machine.img} alt={machine.imgAlt} className="h-full w-full object-contain max-h-44 p-4" />
        </div>
        {/* Content */}
        <div className="p-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-8 grid place-items-center rounded-full bg-brand/5 hover:bg-brand/10 transition-colors"
            aria-label="Close"
          >
            <X size={14} className="text-brand/50" />
          </button>
          <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md mb-3">
            {machine.badge}
          </span>
          <h3 className="font-display text-2xl font-bold text-brand mb-2 tracking-tight">{machine.name}</h3>
          <p className="text-sm text-brand/60 leading-relaxed mb-5">{machine.desc}</p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {machine.specs.map((s) => (
              <div key={s.key} className="bg-surface border border-brand/5 rounded-xl p-3.5">
                <div className="text-[10px] text-brand/40 uppercase tracking-widest mb-1">{s.key}</div>
                <div className="text-sm font-bold text-brand">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Materials */}
          <div className="text-[11px] text-brand/40 uppercase tracking-widest mb-2.5">Compatible materials</div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {machine.mats.map((m) => (
              <span key={m} className="text-xs font-semibold text-brand/60 bg-surface border border-brand/10 px-2.5 py-1 rounded-md">
                {m}
              </span>
            ))}
          </div>

          <button
            onClick={() => { onClose(); onQuote(); }}
            className="w-full flex items-center justify-center gap-2 bg-accent text-brand font-bold text-sm rounded-xl py-3.5 hover:opacity-90 transition-opacity"
          >
            <Printer size={16} />
            Start a print with this machine
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const printingFAQs = [
  {
    question: "What materials do you use for 3D-printed drone components?",
    answer: "We utilize industrial-grade materials including Carbon-Fibre-Reinforced Nylon (CFR-Nylon), ULTEM 9085, PEEK, Titanium (DMLS), Resin (SLA), and TPU. These materials are selected for their excellent strength-to-weight ratio, impact resistance, and durability under varied thermal conditions."
  },
  {
    question: "Is 3D printing used only for prototyping, or also for final production parts?",
    answer: "We use 3D printing for both rapid prototyping and final production parts. For end-use drone components, we employ high-strength carbon-fibre composites to manufacture lightweight structural brackets, custom camera mounts, and aerodynamic housings directly for production."
  },
  {
    question: "How does in-house 3D printing benefit your customers?",
    answer: "In-house 3D printing allows us to deliver custom parts in as little as 24 to 48 hours, significantly accelerating rapid prototyping and minimizing fleet downtime. It also enables us to design complex, lightweight geometries that reduce drone weight, thereby increasing flight time and payload capacity."
  },
  {
    question: "Can you 3D print custom parts for client-specific drone designs?",
    answer: "Yes, we offer custom 3D printing services for client-specific needs, including customized payload mounts, sensor housings, and frame modifications. Our engineering team works directly with clients to design, print, and test custom components."
  },
  {
    question: "Does 3D printing affect the durability or weight of your drones?",
    answer: "Yes, positively. Our 3D-printed parts are optimized using generative design algorithms to remove excess material while maintaining structural integrity. This results in drone parts that are up to 30% lighter than standard machined components while maintaining high impact resistance and durability."
  }
];

function PrintingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalMachine, setModalMachine] = useState<typeof machines[0] | null>(null);
  const [expandedPrinter, setExpandedPrinter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [material, setMaterial] = useState("CFR-Nylon");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const STEP_DURATION = 3000; // ms per step
  const TICK = 30; // ms per progress tick

  function goToStep(i: number) {
    setActiveStep(i);
    setProgress(0);
  }

  async function handle3DPrintSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please provide your name and email address.");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("source", "3d_print");
      payload.append("name", name);
      payload.append("email", email);
      payload.append("subject", `3D Print: ${material}`);
      payload.append("message", notes ? `Material: ${material}\nNotes: ${notes}` : `3D Printing quote request for ${material}`);
      payload.append("turnstileToken", turnstileToken);
      if (file) {
        payload.append("file", file);
      }

      const res = await fetch("/api/submit", {
        method: "POST",
        body: payload,
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Submission failed");
      }

      toast.success(resData.message || "Your 3D printing quote request has been submitted!");
      setName("");
      setEmail("");
      setNotes("");
      setFile(null);
      setTurnstileToken("");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Always-on auto-play — never stops
  useEffect(() => {
    const ticks = STEP_DURATION / TICK;
    let tick = 0;
    const progressTimer = setInterval(() => {
      tick++;
      setProgress(Math.min((tick / ticks) * 100, 100));
    }, TICK);
    const stepTimer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
      tick = 0;
      setProgress(0);
    }, STEP_DURATION);
    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFiles(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    const ext = "." + (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED.includes(ext)) { toast.error("Unsupported file. Upload STL, STEP or OBJ."); return; }
    if (f.size > 50 * 1024 * 1024) { toast.error("File too large (max 50 MB)."); return; }
    setFile(f);
    toast.success(`Loaded ${f.name}`);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function scrollToQuote() {
    quoteRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const step = workflowSteps[activeStep];

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-brand relative overflow-hidden w-full h-[70vh] md:h-[85vh] lg:h-screen flex items-start justify-end">
        {/* Full-Screen Background Video */}
        <video
          src={printerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Animated Text Content Overlay — Top Right */}
        <div className="absolute top-10 right-6 md:top-16 md:right-12 lg:top-20 lg:right-16 z-10 max-w-xl flex flex-col items-start text-left">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter text-white flex flex-wrap gap-x-3 gap-y-1 mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {heroTitleWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: w.x, y: w.y, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                transition={{ type: "spring", damping: 14, stiffness: 70, delay: i * 0.08 }}
                style={{ display: "inline-block" }}
                className={w.isAccent ? "text-accent" : "text-white"}
              >
                {w.text}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="w-16 h-1 bg-accent rounded-full mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ originX: 0 }}
          />

          <p className="text-white text-base md:text-xl font-medium max-w-lg leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {heroSubtitleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, delay: 0.55 + i * 0.05 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </section>



      {/* ── 3D PRINTERS SHOWCASE SECTION ── */}
      <section className="bg-[#050709] border-t border-white/5 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Industrial <span className="text-accent">3D Printers</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Production-grade additive manufacturing machinery capable of continuous carbon fiber, high-temp polymers, and aerospace-spec alloys.
            </p>
          </div>

          {/* Both Printer Cards Side-by-Side on the Same Screen */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-10">
            {/* ── CARD 1: MARKFORGED MARK TWO ── */}
            <div className="bg-white/[0.04] border border-white/10 hover:border-accent/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
              <div>
                {/* Badge & Title */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest bg-accent text-brand px-3 py-1 rounded-lg">
                    FDM · Continuous Fiber
                  </span>
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                    Desktop Series
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  Markforged Mark Two
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Prints continuous carbon fiber, Kevlar® and fibreglass reinforcement inside Nylon — producing parts stronger than aluminium at a fraction of the weight.
                </p>

                {/* Image */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden flex items-center justify-center h-80">
                  <img
                    src={markTwoImg}
                    alt="Markforged Mark Two"
                    className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Quick Specs Pill Strip */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Build Volume</div>
                    <div className="text-sm font-bold text-white mt-1">320×132×154mm</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Tolerance</div>
                    <div className="text-sm font-bold text-white mt-1">±0.1 mm</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Layer Height</div>
                    <div className="text-sm font-bold text-white mt-1">100–200 µm</div>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={scrollToQuote}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-accent text-brand font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 px-4 hover:opacity-90 transition-opacity"
                >
                  <Printer size={14} />
                  Print with Mark Two
                </button>

                <button
                  onClick={() => setExpandedPrinter(expandedPrinter === "marktwo" ? null : "marktwo")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 px-4 transition-colors border border-white/10 cursor-pointer"
                >
                  {expandedPrinter === "marktwo" ? (
                    <>
                      Hide Specs <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View Full Specs <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── CARD 2: MARKFORGED FX10 ── */}
            <div className="bg-white/[0.04] border border-white/10 hover:border-accent/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />
              <div>
                {/* Badge & Title */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest bg-accent text-brand px-3 py-1 rounded-lg">
                    Industrial FDM · High-Temp
                  </span>
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                    Production Series
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  Markforged FX10
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  A production-grade industrial printer capable of ULTEM 9085, PEEK and metals. Built for aerospace and defense-spec parts.
                </p>

                {/* Image */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 relative overflow-hidden flex items-center justify-center h-80">
                  <img
                    src={fx10Img}
                    alt="Markforged FX10"
                    className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Quick Specs Pill Strip */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Build Volume</div>
                    <div className="text-sm font-bold text-white mt-1">525×400×400mm</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Tolerance</div>
                    <div className="text-sm font-bold text-white mt-1">±0.2 mm</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Layer Height</div>
                    <div className="text-sm font-bold text-white mt-1">50–250 µm</div>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={scrollToQuote}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-accent text-brand font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 px-4 hover:opacity-90 transition-opacity"
                >
                  <Printer size={14} />
                  Print with FX10
                </button>

                <button
                  onClick={() => setExpandedPrinter(expandedPrinter === "fx10" ? null : "fx10")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 px-4 transition-colors border border-white/10 cursor-pointer"
                >
                  {expandedPrinter === "fx10" ? (
                    <>
                      Hide Specs <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View Full Specs <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── EXPANDABLE FULL SPECS DROPDOWN DRAWER ── */}
          <AnimatePresence>
            {expandedPrinter === "marktwo" && (
              <motion.div
                key="marktwo-specs"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden bg-white/[0.03] border border-accent/20 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl space-y-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Full Specification Sheet</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Markforged Mark Two Details</h3>
                  </div>
                  <button
                    onClick={() => setExpandedPrinter(null)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Full Tech Specs Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Technical Parameters</h4>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {machines[0].specs.map((s) => (
                      <div key={s.key} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{s.key}</div>
                        <div className="text-sm font-bold text-white">{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Capabilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Key Capabilities</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {markTwoFeatures.map((f, i) => (
                      <div key={f.title} className="bg-white/[0.04] border border-white/8 rounded-2xl p-5">
                        <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center mb-3">
                          <span className="text-accent font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h5 className="font-bold text-white text-sm mb-1">{f.title}</h5>
                        <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software */}
                <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                  <h4 className="font-display text-xl font-bold text-white mb-2">Eiger Cloud Software</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    An innovative browser-based platform. Set continuous fibre density per layer with a slider and manage jobs over LAN, USB, or Wi-Fi. Pause mid-print to embed electronics or sensors directly inside the part.
                  </p>
                </div>

                {/* Materials & Delivery */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Compatible Materials</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-white/30 mb-2">Base Filament</div>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• Onyx (CFR-Nylon)</li>
                          <li>• Nylon White</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-white/30 mb-2">Continuous Fibres</div>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• Carbon Fibre</li>
                          <li>• Kevlar®</li>
                          <li>• Fibreglass</li>
                          <li>• High-Temp Fibreglass</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Package Includes</h4>
                    <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-white/70">
                      {markTwoDelivery.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {expandedPrinter === "fx10" && (
              <motion.div
                key="fx10-specs"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden bg-white/[0.03] border border-accent/20 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl space-y-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Full Specification Sheet</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Markforged FX10 Details</h3>
                  </div>
                  <button
                    onClick={() => setExpandedPrinter(null)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Full Tech Specs Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Technical Parameters</h4>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {machines[1].specs.map((s) => (
                      <div key={s.key} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{s.key}</div>
                        <div className="text-sm font-bold text-white">{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Capabilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Key Capabilities</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {fx10Features.map((f, i) => (
                      <div key={f.title} className="bg-white/[0.04] border border-white/8 rounded-2xl p-5">
                        <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center mb-3">
                          <span className="text-accent font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h5 className="font-bold text-white text-sm mb-1">{f.title}</h5>
                        <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reliability & Strength */}
                <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                  <h4 className="font-display text-xl font-bold text-white mb-2">Reliability &amp; Modular Print Engine</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Capable of metal and composite printing in one system. Optical laser inspection sensors verify accuracy in real time, with automatic spool changeover for continuous overnight operation.
                  </p>
                </div>

                {/* Compatible Materials */}
                <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Compatible Materials</h4>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-accent mb-2">Plastics</div>
                      <ul className="space-y-1 text-xs text-white/70">
                        {fx10Materials.plastics.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-accent mb-2">Continuous Fibres</div>
                      <ul className="space-y-1 text-xs text-white/70">
                        {fx10Materials.fibres.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── WORKFLOW MAP ── */}
      <section
        id="workflow-section"
        className="py-24 bg-surface border-y border-brand/5 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Image sliding from left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-brand/10 group"
            >
              <img
                src={workflowImg}
                alt="3D Printing Workflow Pipeline"
                className="w-full h-full object-cover max-h-[460px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/30 via-transparent to-transparent opacity-50" />
            </motion.div>

            {/* Right — Pipeline animation sliding from right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col"
            >
              <Eyebrow>Workflow</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand tracking-tight leading-tight mb-3">
                A pipeline tuned <span className="text-accent">for speed.</span>
              </h2>
              <p className="text-brand/60 text-lg leading-relaxed max-w-2xl mb-10">
                Watch how your part moves from file to your door — automatically cycling through each stage.
              </p>

              {/* ── Step Timeline ── */}
              <div className="relative">
                {/* Background connector track */}
                <div
                  className="absolute z-0 h-0.5 bg-brand/8"
                  style={{
                    top: "27px",
                    left: `calc(${100 / (workflowSteps.length * 2)}%)`,
                    right: `calc(${100 / (workflowSteps.length * 2)}%)`,
                  }}
                />

                {/* Animated fill track */}
                <motion.div
                  className="absolute z-0 h-0.5 bg-accent/50 origin-left"
                  style={{
                    top: "27px",
                    left: `calc(${100 / (workflowSteps.length * 2)}%)`,
                    right: `calc(${100 / (workflowSteps.length * 2)}%)`,
                  }}
                  animate={{
                    scaleX:
                      activeStep === 0
                        ? 0
                        : activeStep / (workflowSteps.length - 1),
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Step nodes */}
                <div className="flex items-start">
                  {workflowSteps.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === activeStep;
                    const isPast = i < activeStep;
                    return (
                      <div
                        key={s.step}
                        className="flex-1 flex flex-col items-center cursor-pointer group"
                        onClick={() => goToStep(i)}
                      >
                        {/* Icon circle */}
                        <motion.div
                          className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center z-10 mb-3 transition-all duration-300 ${
                            isActive
                              ? "border-accent bg-accent shadow-lg shadow-accent/25"
                              : isPast
                              ? "border-accent/60 bg-accent/10"
                              : "border-brand/12 bg-white group-hover:border-accent/40"
                          }`}
                          animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <Icon
                            size={20}
                            className={isActive ? "text-brand" : isPast ? "text-accent" : "text-brand/35 group-hover:text-brand/60"}
                          />
                          {/* Progress ring for active */}
                          {isActive && (
                            <svg
                              className="absolute inset-0 w-full h-full -rotate-90"
                              viewBox="0 0 56 56"
                            >
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="rgba(255,255,255,0.25)"
                                strokeWidth="2"
                              />
                              <motion.circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 24}`}
                                strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                                style={{ transition: "stroke-dashoffset 30ms linear" }}
                              />
                            </svg>
                          )}
                        </motion.div>

                        {/* Step number */}
                        <div
                          className={`text-xs font-extrabold tracking-[0.2em] uppercase mb-1 transition-colors ${
                            isActive ? "text-accent font-black" : isPast ? "text-accent/80" : "text-brand/50"
                          }`}
                        >
                          {s.step}
                        </div>
                        {/* Title */}
                        <div
                          className={`text-base font-extrabold text-center mb-1 transition-colors ${
                            isActive ? "text-brand font-black" : isPast ? "text-brand/80" : "text-brand/60"
                          }`}
                        >
                          {s.title}
                        </div>
                        {/* Short desc */}
                        <div className="text-xs text-brand/70 font-semibold text-center leading-tight max-w-[110px] hidden sm:block">
                          {s.shortDesc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dot indicators — always auto-playing */}
              <div className="flex items-center justify-center gap-1.5 mt-6 mb-2">
                {workflowSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-5 h-2 bg-accent"
                        : i < activeStep
                        ? "w-2 h-2 bg-accent/40"
                        : "w-2 h-2 bg-brand/15 hover:bg-brand/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="py-24 bg-white border-y border-brand/5">
        <div className="max-w-7xl mx-auto px-6">
          <Eyebrow>Materials</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand tracking-tight leading-tight mb-12">
            Production-grade <span className="text-accent">options across the stack.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {materials.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-surface border border-brand/5 rounded-2xl p-6 hover:border-accent/30 transition-colors"
              >
                <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md mb-3">
                  {m.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-brand mb-2">{m.name}</h3>
                <p className="text-sm text-brand/60 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE + UPLOAD ── */}
      <section className="py-24 bg-surface" ref={quoteRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-brand/5 rounded-3xl p-8 md:p-14 grid lg:grid-cols-2 gap-12 shadow-sm">
            {/* Left */}
            <div>
              <Eyebrow>Instant Quote</Eyebrow>
              <h2 className="font-display text-4xl font-bold tracking-tight leading-tight text-brand mb-4">
                Upload your part.<br />Get a quote.
              </h2>
              <p className="text-brand/60 leading-relaxed mb-0">
                Drop STL, STEP or OBJ. We'll respond with material options, lead time and price within hours.
              </p>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`mt-7 border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${dragOver ? "border-accent bg-accent/5" : "border-brand/15 hover:border-accent/50 bg-surface"
                  }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
                  accept=".stl,.step,.stp,.obj"
                />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileCheck2 className="text-accent" />
                    <div className="text-left">
                      <div className="font-bold text-sm text-brand">{file.name}</div>
                      <div className="text-xs text-brand/50">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="ml-3 size-7 grid place-items-center rounded-full bg-brand/5 hover:bg-brand/10 transition-colors"
                      aria-label="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto text-brand/30 mb-3" size={32} />
                    <div className="text-xs font-bold uppercase tracking-widest text-brand/50">Drop file or click to browse</div>
                    <div className="mt-1.5 text-xs text-brand/30">STL · STEP · OBJ — max 50 MB</div>
                  </>
                )}
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={handle3DPrintSubmit}>
              <h3 className="font-display text-2xl font-bold tracking-tight text-brand mb-6">Project details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brand/50 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-surface border border-brand/15 rounded-xl text-brand placeholder:text-brand/30 px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brand/50 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-surface border border-brand/15 rounded-xl text-brand placeholder:text-brand/30 px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brand/50 mb-1.5">Material preference</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-surface border border-brand/15 rounded-xl text-brand px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  >
                    <option value="CFR-Nylon">CFR-Nylon</option>
                    <option value="ULTEM 9085">ULTEM 9085</option>
                    <option value="PEEK">PEEK</option>
                    <option value="Titanium (DMLS)">Titanium (DMLS)</option>
                    <option value="Resin (SLA)">Resin (SLA)</option>
                    <option value="TPU">TPU</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-brand/50 mb-1.5">Notes</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Quantity, surface finish, lead time requirements..."
                    className="w-full bg-surface border border-brand/15 rounded-xl text-brand placeholder:text-brand/30 px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Turnstile Abuse Protection */}
                <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-brand font-bold text-sm rounded-xl py-3.5 hover:opacity-90 disabled:opacity-50 transition-opacity mt-1 cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit for quote →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <FAQSection items={printingFAQs} accentColor="amber" />

      {/* ── MACHINE MODAL ── */}
      <AnimatePresence>
        {modalMachine && (
          <MachineModal
            machine={modalMachine}
            onClose={() => setModalMachine(null)}
            onQuote={scrollToQuote}
          />
        )}
      </AnimatePresence>
    </>
  );
}