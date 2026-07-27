import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { ArrowLeft, ArrowUpRight, Shield, Cpu, Radar, Zap, Download } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { ScrambleText } from "../components/ui/ScrambleText";

// Assets
import productSentinel from "../assets/EX 950 Drone.webp";
import brochureBg from "../assets/Brocher.png";
import recardVisibleVideo from "../assets/recard_visible_181853.mp4";
import thermalVdVideo from "../assets/thermal.mp4";

export default SentinelSSurveyProductPage;


/* ─── Hotspot data ─────────────────────────────────────────────── */
const HOTSPOTS = [
  {
    id: 1,
    x: "50%",
    y: "15%",
    title: "950mm Wheelbase",
    desc: "Optimized carbon fiber motor arms providing a rigid 950mm wheelbase structure for maximum balance, flight stability, and lifting dynamics.",
  },
  {
    id: 2,
    x: "20%",
    y: "45%",
    title: "23-Inch Propellers",
    desc: "Ultra-light carbon fiber 23-inch propellers tuned for high aerodynamic efficiency and quiet operation, delivering massive thrust at lower RPMs.",
  },
  {
    id: 3,
    x: "50%",
    y: "75%",
    title: "Large-Capacity Battery Bay",
    desc: "A spacious 210x130x80mm compartment supporting 17000 / 22000 mAh (12S) batteries, secured with dual-knob locking covers and dual quick-lock arm knobs.",
  },
  {
    id: 4,
    x: "80%",
    y: "45%",
    title: "IP54 Weatherproof Body",
    desc: "Durable, multi-duct cooled enclosure rated at IP54 for protection against dust and splashing water, allowing reliable operation in harsh environments.",
  },
];

/* ─── Spec groups ────────────────────── */
const detailedSpecs = [
  {
    group: "Platform & Airframe Dimensions",
    items: [
      { key: "Wheelbase", value: "950 mm" },
      { key: "Unfolded Dimensions", value: "1253 x 1258 x 459 mm" },
      { key: "Folded Dimensions", value: "407 x 421 x 459 mm" },
      { key: "Propeller Diameter", value: "23 inches" },
      { key: "IP Rating", value: "IP54 (Dust & Splash Water Protection)" },
      { key: "Flight Control Bay", value: "Spacious Multi-FC Support (ArduPilot/PX4/etc)" },
    ],
  },
  {
    group: "Flight Weight & Performance",
    items: [
      { key: "PNP Platform Weight", value: "3.9 kg (Without payload & battery)" },
      { key: "Maximum Takeoff Weight (MTOW)", value: "10.0 kg" },
      { key: "Maximum Payload Capacity", value: "6.1 kg" },
      { key: "Max Flight Endurance", value: "60 Minutes" },
      { key: "Wind Resistance", value: "35 km/h" },
      { key: "Operational Range", value: "25 km" },
      { key: "Hover Accuracy", value: "RTK Assisted: Horizontal ±1 cm, Vertical ±1.5 cm" },
    ],
  },
  {
    group: "Battery & Heat Management",
    items: [
      { key: "Battery Compartment Size", value: "210 x 130 x 80 mm" },
      { key: "Recommended Battery", value: "17000 / 22000 mAh (12S)" },
      { key: "Locking Cover", value: "Dual-Knob Locking Cover with Quick-Lock Arm Knobs" },
      { key: "Thermal Cooling", value: "Multi-Duct Active Ventilation & Cooling" },
      { key: "Payload Expansion", value: "Multiple Payload Mounts for DIY / Professional cameras" },
    ],
  },
];

const features = [
  {
    icon: Radar,
    title: "Centimeter RTK Accuracy",
    desc: "Built-in RTK/PPK receiver modules deliver sub-centimeter horizontal precision, eliminating the need for dense Ground Control Points (GCPs).",
  },
  {
    icon: Shield,
    title: "Safe VTOL Launch & Land",
    desc: "Launches vertically from anywhere without a launcher or runway, transitioning seamlessly to highly efficient fixed-wing flight.",
  },
  {
    icon: Cpu,
    title: "Autonomous Mission Planning",
    desc: "Supports complex grid surveys and terrain-following paths. Program missions easily through QGroundControl or Mission Planner.",
  },
  {
    icon: Zap,
    title: "60-Min High Endurance",
    desc: "Fly up to 60 minutes per battery set. Covers up to 400 hectares in a single flight at 55 km/h cruise speed.",
  },
];

/* ─── Counter hook ──────────────────────────────────────────────── */
function useCounter(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setVal(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

/* ─── BrokenWords component helper ───────────────────────────────── */
function BrokenWords({
  text,
  className,
  containerRef,
}: {
  text: string;
  className?: string;
  containerRef?: React.RefObject<HTMLHeadingElement | null>;
}) {
  const words = text.split(" ");
  return (
    <h2
      ref={containerRef}
      className={`font-display font-black uppercase tracking-tight text-white flex flex-wrap gap-x-[0.2em] gap-y-[0.1em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${className || ""}`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="word-wrapper inline-block relative overflow-visible select-none py-1"
        >
          <span className="word-inner inline-block relative">
            {/* Top-left fragment */}
            <span
              className="word-fragment-1 absolute inset-0 text-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 65%)" }}
            >
              {word}
            </span>
            {/* Bottom-right fragment */}
            <span
              className="word-fragment-2 absolute inset-0 text-white"
              style={{ clipPath: "polygon(0 65%, 100% 35%, 100% 100%, 0 100%)" }}
            >
              {word}
            </span>
            {/* Invisible spacer */}
            <span className="opacity-0 pointer-events-none select-none">{word}</span>
          </span>
        </span>
      ))}
    </h2>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
function SentinelSSurveyProductPage() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Blueprint view options
  const [showGrid, setShowGrid] = useState(true);
  const [viewMode, setViewMode] = useState<"wireframe" | "blueprint">("wireframe");

  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());



  /* Intersection observer — stats counter trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* Intersection observer — scroll-reveal for all tagged sections */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.reveal;
          if (e.isIntersecting && id) {
            setVisibleSections((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.12 },
    );
    sectionRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const registerReveal = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      el.dataset.reveal = id;
      sectionRefs.current.set(id, el);
    }
  };

  const revealed = (id: string) => visibleSections.has(id);

  /* Counters */
  const flightCount = useCounter(60, 1600, statsVisible);
  const rangeCount = useCounter(25, 1600, statsVisible);
  const mtowCount = useCounter(10, 1800, statsVisible);
  const speedCount = useCounter(80, 1400, statsVisible);

  return (
    <div className="min-h-screen text-gray-900 dark:text-slate-100 transition-colors overflow-x-clip">
      <style>{`
        /* ── Keyframes ── */
        @keyframes hero-slide-up   { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-slide-right{ from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes drone-float     { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(1.5deg); } }
        @keyframes radar-spin      { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ping-ring       { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes scroll-line     { 0%,100% { opacity: .2; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.2); } }
        @keyframes counter-pop     { 0% { transform: scale(.85); opacity: 0; } 60% { transform: scale(1.06); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes reveal-up       { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes reveal-left     { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes reveal-right    { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes line-grow       { from { width: 0; } to { width: 100%; } }

        /* ── Reveal helpers ── */
        .reveal-section { opacity: 0; }
        .reveal-section.visible-up    { animation: reveal-up    0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .reveal-section.visible-left  { animation: reveal-left  0.7s cubic-bezier(.16,1,.3,1) forwards; }
        .reveal-section.visible-right { animation: reveal-right 0.7s cubic-bezier(.16,1,.3,1) forwards; }

        /* ── Staggered children ── */
        .stagger > * { opacity: 0; transform: translateY(32px); transition: opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1); }
        .stagger.visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:.05s; }
        .stagger.visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:.15s; }
        .stagger.visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:.25s; }
        .stagger.visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:.35s; }

        /* ── Drone float ── */
        .drone-float { animation: drone-float 5s ease-in-out infinite; }

        /* ── Hotspot ── */
        .hs-btn { position: absolute; transform: translate(-50%,-50%); }
        .hs-ring { animation: ping-ring 2s ease-out infinite; }
        .hs-active .hs-dot { background: white; }

        /* ── Radar sweep ── */
        .radar-sweep { transform-origin: 50% 50%; animation: radar-spin 3s linear infinite; }

        /* ── Counter pop ── */
        .counter-pop { animation: counter-pop .6s cubic-bezier(.16,1,.3,1) both; }

        /* ── Hero entrance ── */
        .hero-left  { animation: hero-slide-up    1s cubic-bezier(.16,1,.3,1) .1s both; }
        .hero-right { animation: hero-slide-right 1s cubic-bezier(.16,1,.3,1) .3s both; }

        /* ── Scroll indicator ── */
        .scroll-line { animation: scroll-line 2s ease-in-out infinite; }

        /* ── Feature card hover ── */
        .feat-card { transition: transform .25s ease, box-shadow .25s ease; }
        .feat-card:hover { transform: translateY(-4px); }

        /* ── Spec row hover ── */
        .spec-item { transition: background .2s; }
        .spec-item:hover { background: rgba(59,130,246,.06); }

        /* ── Video overlay pulse ── */
        @keyframes vid-border { 0%,100%{border-color:rgba(59,130,246,.3)} 50%{border-color:rgba(59,130,246,.7)} }
        .vid-pulse { animation: vid-border 3s ease-in-out infinite; }
      `}</style>

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20">
        {/* Animated grid background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-6 hero-left">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                <ScrambleText text="SENTINEL" delay={0} />{' '}
                <ScrambleText text="-S" delay={450} />{' '}
                <ScrambleText text="SURVEY" className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent" delay={850} />
              </h1>

              <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                The precision standard for aerial photogrammetry and GIS mapping. 
                Seamlessly combining VTOL launch versatility with high-efficiency fixed-wing endurance to cover massive survey acreage.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Request Quote <ArrowUpRight size={16} />
                </Link>
                <a
                  href={brochureBg}
                  download="Wingspann-Product-Brochure.png"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                  <Download size={16} /> Download Brochure
                </a>
              </div>
            </div>

            {/* Right — floating drone image */}
            <div className="lg:col-span-5 relative flex items-center justify-center hero-right">
              <div className="absolute w-[380px] h-[380px] rounded-full bg-blue-500/5 pointer-events-none" />
              {/* Radar ring behind image */}
              <svg
                className="absolute w-[420px] h-[420px] opacity-20 pointer-events-none"
                viewBox="0 0 420 420"
              >
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeDasharray="4,6"
                />
                <circle
                  cx="210"
                  cy="210"
                  r="150"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeDasharray="2,8"
                />
                <circle cx="210" cy="210" r="90" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                <g className="radar-sweep">
                  <line
                    x1="210"
                    y1="210"
                    x2="410"
                    y2="210"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <path
                    d="M210,210 L410,210 A200,200 0 0,0 210,10 Z"
                    fill="#3b82f6"
                    fillOpacity="0.04"
                  />
                </g>
              </svg>
              <div className="relative z-10 w-full max-w-[440px] drone-float">
                <img
                  src={productSentinel}
                  alt="Sentinel-S Survey drone"
                  className="w-full rounded-2xl object-contain shadow-2xl border-2 border-blue-400/30 p-4 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ANIMATED STATS COUNTERS
      ═══════════════════════════════════════════════════ */}
      <div
        ref={(el) => {
          statsRef.current = el!;
          registerReveal("stats")(el);
        }}
        className={`reveal-section ${revealed("stats") ? "visible-up" : ""} py-12 bg-slate-950 border-y border-slate-800`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={`stagger ${statsVisible ? "visible" : ""} grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800`}
          >
            {[
              { val: flightCount, suffix: " min", label: "Max flight time" },
              { val: rangeCount, suffix: " km", label: "Operational range" },
              { val: mtowCount, suffix: " kg", label: "Max Takeoff Weight (MTOW)" },
              { val: speedCount, suffix: " km/h", label: "Max speed" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-950 px-8 py-8 text-center">
                <div
                  className={`text-4xl font-black text-white mb-1 ${statsVisible ? "counter-pop" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {s.val}
                  <span className="text-blue-400">{s.suffix}</span>
                </div>
                <div className="text-xs tracking-[2px] uppercase text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* ═══════════════════════════════════════════════════
          DETAILED SPECS TABLE
      ═══════════════════════════════════════════════════ */}
      <section
        ref={registerReveal("specs")}
        className={`reveal-section ${revealed("specs") ? "visible-up" : ""} py-20 border-t border-gray-100 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/10`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Title & Description Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-3 block">
                Data Sheet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                Technical Specifications
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Comprehensive performance metrics, hardware dimensions, and sensor configuration parameters for Sentinel-S Survey. Expand each category to view detailed parameters.
              </p>
            </div>

            {/* Accordion Specs Column */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm px-6">
              <Accordion type="single" collapsible className="w-full">
                {detailedSpecs.map((group, gi) => (
                  <AccordionItem key={gi} value={`item-${gi}`} className="last:border-b-0 border-gray-100 dark:border-slate-800">
                    <AccordionTrigger className="hover:no-underline font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-slate-100 py-6">
                      {group.group}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="divide-y divide-gray-100 dark:divide-slate-800 border-t border-gray-100 dark:border-slate-800 mt-2">
                        {group.items.map((item, ii) => (
                          <div key={ii} className="spec-item grid sm:grid-cols-3 py-4 text-sm gap-4 sm:gap-2">
                            <div className="text-gray-500 dark:text-slate-400 font-semibold pr-2">
                              {item.key}
                            </div>
                            <div className="sm:col-span-2 text-gray-900 dark:text-slate-200 font-medium">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TECHNOLOGY FEATURES
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={registerReveal("feat-head")}
            className={`reveal-section ${revealed("feat-head") ? "visible-up" : ""} text-center max-w-2xl mx-auto mb-16`}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-3 block">
              Survey Autonomy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Mission-Tuned Mapping Engineering
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
              Designed specifically to meet the high precision demands of industrial GIS mapping, cadastral surveys, and topographical volumetric calculations.
            </p>
          </div>

          <div
            ref={registerReveal("feat-cards")}
            className={`stagger ${revealed("feat-cards") ? "visible" : ""} grid sm:grid-cols-2 lg:grid-cols-4 gap-6`}
          >
            {features.map((f, idx) => (
              <div
                key={idx}
                className="feat-card p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="size-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LARGE-CAPACITY BATTERY COMPARTMENT
      ═══════════════════════════════════════════════════ */}
      <section
        ref={registerReveal("battery-comp")}
        className={`reveal-section ${revealed("battery-comp") ? "visible-up" : ""} py-24 bg-white dark:bg-slate-950/20 border-t border-gray-150 dark:border-slate-800 text-gray-900 dark:text-slate-100`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Description & Sub-features */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 block">
                Power Architecture
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-white">
                Large-Capacity <br />
                <span className="text-blue-600 dark:text-blue-400">Battery Compartment</span>
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                The Sentinel-S features a spacious battery bay supporting various high-capacity battery configurations. 
                Equipped with dual quick-lock arm knobs for secure fitment and advanced heat management to guarantee thermal stability during prolonged operations.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-gray-150 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="h-1 w-8 bg-blue-500 rounded" />
                  <h4 className="font-bold text-sm tracking-wide text-gray-900 dark:text-white uppercase">Large Bay</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Accommodates 210 x 130 x 80 mm battery dimensions.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-8 bg-blue-500 rounded" />
                  <h4 className="font-bold text-sm tracking-wide text-gray-900 dark:text-white uppercase">Quick-Lock</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Dual quick-lock arm knobs for instantaneous battery swap.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-8 bg-blue-500 rounded" />
                  <h4 className="font-bold text-sm tracking-wide text-gray-900 dark:text-white uppercase">Multi-Duct</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Active cooling vents for efficient heat dissipation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Specs Block */}
            <div className="lg:col-span-6 border border-gray-150 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/30 rounded-3xl p-8 relative overflow-hidden shadow-sm group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
              <div className="space-y-6">
                <div className="border-b border-gray-150 dark:border-slate-800 pb-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Power Cell Architecture</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase">Certified</span>
                </div>

                <div className="divide-y divide-gray-150 dark:divide-slate-800">
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Battery Bay Dimensions</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">210 x 130 x 80 mm</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Recommended Battery</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">17000 / 22000 mAh (12S)</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Locking Mechanism</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Dual-Knob Locking Cover</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Thermal Regulation</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Active Heat Dissipation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          APPLICATION SCENARIOS
      ═══════════════════════════════════════════════════ */}
      <section
        ref={registerReveal("app-scenarios")}
        className={`reveal-section ${revealed("app-scenarios") ? "visible-up" : ""} py-24 bg-gray-50/50 dark:bg-slate-900/10 border-t border-gray-100 dark:border-slate-850`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-500 mb-3 block">
              Multi-Mission Capability
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              APPLICATION SCENARIOS
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mt-4 leading-relaxed text-sm md:text-base">
              A highly flexible and adaptable drone platform designed to DIY and mount custom payloads for diverse industrial applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Emergency Rescue",
                desc: "Rapid deployment search-and-rescue equipped with high-intensity spotlights and thermal cameras to identify casualties in zero-visibility conditions.",
                badge: "Search & Rescue"
              },
              {
                title: "Water Resource Monitoring",
                desc: "Equipped with multispectral payloads to track coastal erosion, scan water quality, and survey environmental changes along rivers and dams.",
                badge: "Environmental"
              },
              {
                title: "Power Inspection",
                desc: "Safe close-proximity inspections of high-voltage transmission lines and pylons using high-resolution optical and zoom payloads.",
                badge: "Infrastructure"
              },
              {
                title: "Industrial Monitoring",
                desc: "Continuous autonomous security patrol and volumetric surveys over factories, ports, mine sites, and large industrial parks.",
                badge: "Industrial"
              }
            ].map((app, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-2xl dark:hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900/30">
                  {app.badge}
                </span>
                
                <h3 className="font-black text-xl text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-500 transition-colors">
                  {app.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DOWNLOAD BROCHURE
      ═══════════════════════════════════════════════════ */}
      <section
        ref={registerReveal("download")}
        className={`reveal-section ${revealed("download") ? "visible-up" : ""} py-24 bg-gray-50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800/80`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl min-h-[450px] flex items-center group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={brochureBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/30" />
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 w-full p-12 md:p-16 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20 shadow-inner">
                  <Download size={36} className="text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2 drop-shadow-md">
                    Product Documentation
                  </p>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg mb-3">
                    Download the Brochure
                  </h3>
                  <p className="text-white/90 text-base md:text-lg max-w-lg drop-shadow-md">
                    Full specs, sensor configuration options &amp; deployment scenarios in one comprehensive guide.
                  </p>
                </div>
              </div>
              <a
                href="#"
                className="mt-4 sm:mt-0 relative z-10 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-slate-900 font-bold text-base px-10 py-5 rounded-xl transition-all shrink-0 shadow-2xl hover:-translate-y-1"
              >
                <Download size={22} /> Download Now
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
