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
import logoThirdEye from "../assets/The third eye transparent.png";
import thirdEyeVideo from "../assets/WhatsApp Video 2026-06-12 at 11.21.58 AM.mp4";
import recardVisibleVideo from "../assets/recard_visible_181853.mp4";
import thermalVdVideo from "../assets/thermal.mp4";
import heavyDutyImg from "../assets/Heavy duty opreational.jpeg";
import portableDesignImg from "../assets/Portable Design.jpeg";
import brochureBg from "../assets/Brocher.png";
import thirdEyeBrochurePdf from "../assets/the-third-eye-brochure.pdf";

export default TheThirdEyeProductPage;



/* ─── Spec groups (unchanged from original) ────────────────────── */
const detailedSpecs = [
  {
    group: "Platform & Airframe",
    items: [
      { key: "System Configuration", value: "Quad-rotor VTOL" },
      { key: "Airframe Length", value: "820 mm" },
      { key: "Maximum Takeoff Weight (MTOW)", value: "5 kg" },
      { key: "Airframe Material", value: "Carbon Fibre Composite" },
      { key: "Wind Resistance", value: "18 km/h" },
      { key: "Mission Operational Range", value: "Recommended 4 km" },
    ],
  },
  {
    group: "Flight Performance",
    items: [
      { key: "Max Flight Endurance", value: "35–40 Minutes" },
      { key: "Maximum Speed", value: "45 km/h" },
      { key: "Cruise Speed", value: "25 km/h" },
      { key: "Telemetry Range (Datalink)", value: "4.1 km" },
      { key: "Operational Ceiling", value: "3000 m AMSL" },
      { key: "Operational Altitude", value: "120 m" },
      { key: "Hover Accuracy (GPS)", value: "±0.5 m" },
    ],
  },
  {
    group: "Payload & Communications",
    items: [
      { key: "Payload Capacity", value: "180 g" },
      { key: "Video Link", value: "AES-256 Encrypted 1080p @ 60fps" },
      { key: "Telemetry Encryption", value: "AES-256 / FHSS Anti-Jam" },
      { key: "Frequency Bands", value: "2.4 GHz / 5.8 GHz Dual-Band" },
      { key: "GCS Interface", value: "Mission Planner / QGroundControl" },
    ],
  },
];

const features = [
  {
    icon: Radar,
    title: "Carbon Fibre VTOL Airframe",
    desc: "820 mm quad-rotor VTOL built from Carbon Fibre Composite. MTOW 5 kg, wind resistance up to 18 km/h, operational ceiling 3000 m AMSL.",
  },
  {
    icon: Shield,
    title: "Dual-Band Encrypted Link",
    desc: "AES-256 encrypted 1080p @ 60fps video link with FHSS Anti-Jam telemetry on 2.4 GHz / 5.8 GHz dual-band. Datalink range: 4.1 km.",
  },
  {
    icon: Cpu,
    title: "Mission Planner / QGroundControl",
    desc: "Native support for Mission Planner and QGroundControl. Fly autonomous missions up to 4 km operational range at 45 km/h max speed.",
  },
  {
    icon: Zap,
    title: "Smart Battery Failsafe",
    desc: "40-min flight on a single charge with dual independent power rails. Auto RTL triggers on Low Battery (<10%), RC Failsafe, or Geofence Breach.",
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
function TheThirdEyeProductPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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
  const flightCount = useCounter(40, 1600, statsVisible);
  const rangeCount = useCounter(41, 1600, statsVisible);
  const altCount = useCounter(3000, 1800, statsVisible);
  const speedCount = useCounter(45, 1400, statsVisible);

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
        @keyframes particle-drift  {
          0%   { transform: translateY(0)   translateX(0)   opacity(0); opacity: 0; }
          10%  { opacity: .6; }
          90%  { opacity: .4; }
          100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
        }

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
        .spec-item:hover { background: rgba(99,102,241,.06); }

        /* ── Video overlay pulse ── */
        @keyframes vid-border { 0%,100%{border-color:rgba(99,102,241,.3)} 50%{border-color:rgba(99,102,241,.7)} }
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-600 mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-6 hero-left">
              <div className="bg-slate-950 p-5 rounded-2xl mb-4 border border-slate-800/80 shadow-xl inline-block">
                <img
                  src={logoThirdEye}
                  alt="The Third Eye logo"
                  className="h-24 md:h-32 w-auto object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                <ScrambleText text="THE" delay={0} />{' '}
                <ScrambleText text="THIRD" className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" delay={400} />{' '}
                <ScrambleText text="EYE" className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" delay={1000} />
              </h1>

              <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                The absolute benchmark in payload endurance. Engineered for persistent surveillance,
                structural thermal inspections, and heavy-duty surveying in all-weather conditions.
              </p>



              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Request Quote <ArrowUpRight size={16} />
                </Link>
                <a
                  href={thirdEyeBrochurePdf}
                  download="The-Third-Eye-Brochure.pdf"
                  className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                >
                  <Download size={16} /> Download Brochure
                </a>
              </div>
            </div>

            {/* Right — floating video */}
            <div className="lg:col-span-5 relative flex items-center justify-center hero-right">
              <div className="absolute w-[380px] h-[380px] rounded-full bg-indigo-500/5 pointer-events-none" />
              {/* Radar ring behind video */}
              <svg
                className="absolute w-[420px] h-[420px] opacity-20 pointer-events-none"
                viewBox="0 0 420 420"
              >
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  strokeDasharray="4,6"
                />
                <circle
                  cx="210"
                  cy="210"
                  r="150"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="0.5"
                  strokeDasharray="2,8"
                />
                <circle cx="210" cy="210" r="90" fill="none" stroke="#6366f1" strokeWidth="0.5" />
                <g className="radar-sweep">
                  <line
                    x1="210"
                    y1="210"
                    x2="410"
                    y2="210"
                    stroke="#6366f1"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <path
                    d="M210,210 L410,210 A200,200 0 0,0 210,10 Z"
                    fill="#6366f1"
                    fillOpacity="0.04"
                  />
                </g>
              </svg>
              <div className="relative z-10 w-full max-w-[440px] drone-float">
                <video
                  src={thirdEyeVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-2xl object-cover shadow-2xl vid-pulse border-2 border-indigo-400/30"
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
              { val: `${(rangeCount / 10).toFixed(1)}`, suffix: " km", label: "Datalink range" },
              { val: altCount.toLocaleString(), suffix: " m", label: "Operational ceiling" },
              { val: speedCount, suffix: " km/h", label: "Max speed" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-950 px-8 py-8 text-center">
                <div
                  className={`text-4xl font-black text-white mb-1 ${statsVisible ? "counter-pop" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {s.val}
                  <span className="text-indigo-400">{s.suffix}</span>
                </div>
                <div className="text-xs tracking-[2px] uppercase text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          GALLERY VIDEOS — SIMPLE SCROLL
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full bg-slate-950 py-16 border-b border-gray-100 dark:border-slate-800/80 flex flex-col gap-12">
        {/* Video 1: Visible Spectrum */}
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <video
              src={recardVisibleVideo}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 z-20 pointer-events-none">
              <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-md">
                VISIBLE SPECTRUM · 1080P 60FPS
              </h2>
            </div>
          </div>
        </div>

        {/* Video 2: Thermal Imaging */}
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <video
              src={thermalVdVideo}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 z-20 pointer-events-none">
              <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-md">
                THERMAL IMAGING · FLIR PAYLOAD
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HEAVY DUTY + PORTABLE — with reveal animations
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-white dark:bg-slate-950/20 border-b border-gray-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div
              ref={registerReveal("heavy")}
              className={`reveal-section ${revealed("heavy") ? "visible-left" : ""} flex flex-col items-center`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 text-center">
                Heavy Duty Operations
              </h2>
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-shadow duration-500 w-full bg-black group">
                <img
                  src={heavyDutyImg}
                  alt="Heavy Duty Operations Drone"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div
              ref={registerReveal("portable")}
              className={`reveal-section ${revealed("portable") ? "visible-right" : ""} flex flex-col items-center`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 text-center">
                Portable Design
              </h2>
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-shadow duration-500 w-full bg-gray-100 dark:bg-slate-900 group">
                <img
                  src={portableDesignImg}
                  alt="Portable Design Drone"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div
            ref={registerReveal("madeInIndia")}
            className={`reveal-section ${revealed("madeInIndia") ? "visible-up" : ""} text-center pt-6 max-w-xl mx-auto`}
          >
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              THE THIRD EYE
            </h3>
            <p className="text-sm md:text-base font-bold text-gray-800 dark:text-slate-200 mb-1">
              (Proudly Made in India)
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 tracking-wide">
              for GCS Control and Navigation
            </p>
          </div>
        </div>
      </section>

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
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-500 mb-3 block">
                Data Sheet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                Technical Specifications
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Comprehensive performance metrics, hardware dimensions, and integration parameters for The Third Eye flagship UAV. Expand each category to view detailed requirements and tolerances.
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
          TECHNOLOGY FEATURES — staggered cards
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={registerReveal("feat-head")}
            className={`reveal-section ${revealed("feat-head") ? "visible-up" : ""} text-center max-w-2xl mx-auto mb-16`}
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-500 mb-3 block">
              UAV Core Autonomy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Mission-Tuned Engineering
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
              Every detail is optimized for mission success — from high-modulus carbon fiber layup
              to redundant avionics and payload integrations.
            </p>
          </div>

          <div
            ref={registerReveal("feat-cards")}
            className={`stagger ${revealed("feat-cards") ? "visible" : ""} grid sm:grid-cols-2 lg:grid-cols-4 gap-6`}
          >
            {features.map((f, idx) => (
              <div
                key={idx}
                className="feat-card p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="size-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">
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
                    Full specs, payload options &amp; deployment scenarios in one comprehensive guide.
                  </p>
                </div>
              </div>
              <a
                href={thirdEyeBrochurePdf}
                download="The-Third-Eye-Brochure.pdf"
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
