import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Cpu, Layers, Radar, Map, Plane, Zap, Shield, Wrench, CheckCircle2, ChevronDown, Eye, Building2, X, Upload, Calculator, Settings, Truck } from "lucide-react";
import { useEffect, useRef, useLayoutEffect, useState, useCallback, Fragment } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

import heroDrone from "../assets/hero-drone.jpg";
import printingHero from "../assets/printing-hero.jpg";
import productSentinel from "../assets/EX 950 Drone.webp";
import homeVideo from "../assets/original.mp4";
import aiImage from "../assets/AI.avif";
import customImage from "../assets/aa.jpg";
import droneImage from "../assets/DDD.webp";
import droneSolutionsImage from "../assets/DS.jpg";
import defenceBg from "../assets/D&S.webp";
import infrastructureBg from "../assets/infrastructure.webp";
import surveyBg from "../assets/serving mapping.webp";
import industrialBg from "../assets/industrial-monitoring-.jpg";
import smartCityBg from "../assets/smart city.webp";
import policeImg from "../assets/Police.webp";
import surveillanceImg from "../assets/surve.jpg";
import bmcImg from "../assets/BMC.jpg";
import workflowImg from "../assets/3dd.jpg";
import home3DVideo from "../assets/Home 3D.mp4";
import howWeWorkBg from "../assets/hom.jpg";
import rptoVideo from "../assets/IMG_0491.mov";
import warroomBg from "../assets/warr.avif";
import projEnergy from "../assets/proj-energy.jpg";
import projInfrastructure from "../assets/proj-infrastructure.jpg";
import projAgriculture from "../assets/proj-agriculture.jpg";
import projMining from "../assets/proj-mining.jpg";
import projManufacturing from "../assets/proj-manufacturing.jpg";
import { Reveal } from "../components/site/Reveal";
import { SectionHeader } from "../components/site/SectionHeader";

export default HomePage;


const statsData = [
  { value: 100, suffix: "+", label: "Missions Flown" },
  { value: 55, suffix: "", label: "Min Endurance" },
  { value: 15, suffix: "kg", label: "Max Payload" },
];

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;

    const targetEl = numRef.current;
    const obj = { val: 0 };

    const anim = gsap.to(obj, {
      val: value,
      duration: 2.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: targetEl,
        start: "top 90%", // Trigger count up when the stat is visible near the viewport bottom
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (targetEl) {
          targetEl.textContent = String(Math.floor(obj.val));
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [value]);

  return (
    <Reveal delay={index * 0.06} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold tracking-tighter">
        <span ref={numRef}>0</span>
        {suffix}
        <span className="text-accent">.</span>
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
        {label}
      </div>
    </Reveal>
  );
}

const techPreview = [
  {
    icon: Radar,
    title: "Autonomous Navigation",
    desc: "AI flight planning with obstacle avoidance.",
  },
  { icon: Map, title: "RTK / PPK Mapping", desc: "Centimeter-grade georeferencing." },
  { icon: Layers, title: "LiDAR Integration", desc: "Dense point-clouds for 3D reconstruction." },
  { icon: Cpu, title: "Real-Time Telemetry", desc: "Encrypted datalinks and fleet ops." },
];

const projects = [
  {
    tag: "Energy",
    title: "Solar Grid Thermal Analysis",
    desc: "Automated inspection of 1.2M panels using thermal AI — 40% downtime reduction.",
    img: projEnergy,
  },
  {
    tag: "Infrastructure",
    title: "Autonomous Bridge Survey",
    desc: "Millimeter-accurate 3D reconstruction of aging transport links with LiDAR + RTK.",
    img: projInfrastructure,
  },
  {
    tag: "Agriculture",
    title: "Precision Crop Management",
    desc: "Multi-spectral mapping for a 5,000-acre smart farm program.",
    img: projAgriculture,
  },
  {
    tag: "Mining",
    title: "Open-Pit Volumetrics",
    desc: "Stockpile monitoring integrated with autonomous haulage fleet logistics.",
    img: projMining,
  },
  {
    tag: "Defense",
    title: "Persistent ISR Pilot",
    desc: "Multi-platform surveillance trial with encrypted mesh networking.",
    img: productSentinel,
  },
  {
    tag: "Manufacturing",
    title: "Carbon-Fiber Frame Launch",
    desc: "X-1 Apex production line went live; first 200 units shipped to enterprise partners.",
    img: projManufacturing,
  },
];

// ─── How We Work Carousel ────────────────────────────────────────────────────

const HWW_STEPS = [
  {
    step: "01",
    title: "Requirements",
    desc: "Understanding client and mission requirements thoroughly before modeling.",
  },
  {
    step: "02",
    title: "Design & Engineering",
    desc: "Designing and engineering tailored UAV systems with stress simulations.",
  },
  {
    step: "03",
    title: "System Integration",
    desc: "Integrating advanced flight control components, sensors, and technologies.",
  },
  {
    step: "04",
    title: "Testing & Validation",
    desc: "Rigorous laboratory testing, validation protocols, and flight quality checks.",
  },
  {
    step: "05",
    title: "Deployment & Support",
    desc: "Deployment, telemetry checks, and continuous performance improvement.",
  },
];

function HowWeWorkCarousel() {
  const [current, setCurrent] = useState(0);
  const total = HWW_STEPS.length;
  const isAnimatingRef = useRef(false);
  const pausedRef = useRef(false);

  const go = useCallback((dir: "next" | "prev") => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrent((c) => dir === "next" ? (c + 1) % total : (c - 1 + total) % total);
    setTimeout(() => { isAnimatingRef.current = false; }, 420);
  }, [total]);

  // Auto-advance every 3s, pauses on hover
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) go("next");
    }, 3000);
    return () => clearInterval(id);
  }, [go]);

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <section
      className="py-24 text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${howWeWorkBg})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-indigo-300 mb-4">
              Operational Framework
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              How We Work
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              We follow a structured yet flexible approach to deliver high-quality solutions, ensuring safety, reliability, and precision at every stage.
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <div className="relative flex items-stretch justify-center gap-5 px-10 md:px-0" style={{ minHeight: "260px" }}>

          {/* Left arrow */}
          <button
            onClick={() => go("prev")}
            className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-10 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
            aria-label="Previous step"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 3 visible cards: prev (half) | active (full) | next (half) - prev & next hidden on mobile */}
          {[prevIdx, current, nextIdx].map((idx, pos) => {
            const step = HWW_STEPS[idx];
            const isActive = pos === 1;
            return (
              <div
                key={`${idx}-${pos}`}
                className={isActive ? "flex-1 w-full" : "hidden md:block flex-1"}
                style={{
                  maxWidth: isActive ? "420px" : "280px",
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div
                  className="h-full rounded-[2rem] p-8 flex flex-col justify-between"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: isActive
                      ? "1px solid rgba(165,180,252,0.35)"
                      : "1px solid rgba(255,255,255,0.10)",
                    boxShadow: isActive
                      ? "0 8px 40px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "0 2px 12px rgba(0,0,0,0.2)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div>
                    {/* Step number watermark */}
                    <div
                      className="font-display font-black text-5xl mb-5"
                      style={{
                        color: isActive ? "rgba(165,180,252,0.4)" : "rgba(255,255,255,0.12)",
                      }}
                    >
                      {step.step}
                    </div>
                    <h3
                      className="font-display font-bold text-xl leading-snug mb-3"
                      style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: isActive ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.35)" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                  {/* Progress bar */}
                  {isActive && (
                    <div className="mt-8 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <div
                        key={current}
                        className="h-full rounded-full"
                        style={{
                          width: `${((current + 1) / total) * 100}%`,
                          background: "linear-gradient(90deg, #818cf8, #a5b4fc)",
                          transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Right arrow */}
          <button
            onClick={() => go("next")}
            className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-10 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(99,102,241,0.85)",
              border: "1px solid rgba(165,180,252,0.4)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}
            aria-label="Next step"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {HWW_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (i !== current) go(i > current ? "next" : "prev"); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#a5b4fc" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const industriesData = [
  {
    id: "defense",
    title: "Defense & Security",
    icon: Shield,
    desc: "Tactical ISR operations and secure payload networks.",
    img: defenceBg,
    accent: "#6366f1",
    details: [
      "Tactical ISR operations & secure payload networks",
      "Disaster Management & Emergency Relief Support",
      "Security & Surveillance for sensitive perimeter defense",
      "Proven track record of mission-critical deployments"
    ]
  },
  {
    id: "police",
    title: "Police",
    icon: Shield,
    desc: "Law enforcement, crowd control, and VVIP security management.",
    img: policeImg,
    accent: "#3b82f6",
    details: [
      "Traffic Management Vigilance during Festive seasons and VVIP movement",
      "Security & Surveillance for city-wide law enforcement",
      "Monitoring Unauthorized Illegal Construction & activities",
      "Disaster Management & Emergency Relief Support"
    ]
  },
  {
    id: "surveillance",
    title: "Surveillance",
    icon: Eye,
    desc: "24/7 high-resolution thermal and optical aerial surveillance.",
    img: surveillanceImg,
    accent: "#ec4899",
    details: [
      "Security & Surveillance across sensitive facilities",
      "Dumping Yard Vigilance for Fire Detection with optical & thermal sensors",
      "Real-time environment alerts & unauthorized activity detection",
      "24/7 continuous operational flight monitoring"
    ]
  },
  {
    id: "bmc",
    title: "MyBMC Maharashtra",
    icon: Building2,
    desc: "Municipal governance, waste management, and civic monitoring.",
    img: bmcImg,
    accent: "#f97316",
    details: [
      "Vigilance on Waste Management & Dumping Yard Fire Detection",
      "Monitoring Unauthorized Illegal Construction activities",
      "Tree Monitoring for illegal tree cutting across civic sectors",
      "Animal Well-being in Zoo & Public Health Vector Control"
    ]
  },
  {
    id: "surveying",
    title: "Surveying & Mapping",
    icon: Map,
    desc: "Centimeter-accurate land records and volumetric counts.",
    img: surveyBg,
    accent: "#10b981",
    details: [
      "Survey & Mapping for Revenue Enhancement",
      "Centimeter-grade RTK/PPK topographic & volumetric counts",
      "3D Mesh & Orthomosaic generation for enterprise planning",
      "Industry-leading technology and aerospace expertise"
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Inspection",
    icon: Layers,
    desc: "Automated checks for bridges, pipelines, and structures.",
    img: infrastructureBg,
    accent: "#0ea5e9",
    details: [
      "Infrastructure Inspection — On-going Project Development Daily Reports (Before-After)",
      "Road Potholes Reports for Work Compliance",
      "Monitoring Unauthorized Illegal Construction activities",
      "Tree Monitoring for illegal tree cutting"
    ]
  },
  {
    id: "industrial",
    title: "Industrial Monitoring",
    icon: Cpu,
    desc: "Asset optimization and real-time environment alerts.",
    img: industrialBg,
    accent: "#f59e0b",
    details: [
      "Industrial Asset Monitoring & non-destructive checks",
      "Dumping Yard Vigilance for Fire Detection & thermal hotspots",
      "Fire Fighting Drones — Supportive & Active operations",
      "24/7 support and continuous flight optimization"
    ]
  },
  {
    id: "smartcities",
    title: "Smart Cities & Utilities",
    icon: Zap,
    desc: "Grid management, utility mapping, and disaster aid.",
    img: smartCityBg,
    accent: "#8b5cf6",
    details: [
      "Public Health Vector Control & urban sanitation",
      "Grid management, utility mapping & disaster emergency relief",
      "Traffic Management Vigilance during Festive seasons and VVIP movement",
      "Vigilance on municipal waste management"
    ]
  }
];

function useGridCols() {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else setCols(4);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return cols;
}

function IndustriesSection() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const cols = useGridCols();

  const selectedIdx = industriesData.findIndex((ind) => ind.id === expandedCardId);
  const selectedIndustry = selectedIdx !== -1 ? industriesData[selectedIdx] : null;

  // Calculate the end index of the row containing the selected card
  const insertAfterIdx =
    selectedIdx !== -1
      ? Math.min(industriesData.length - 1, (Math.floor(selectedIdx / cols) + 1) * cols - 1)
      : -1;

  return (
    <section className="py-24 bg-white text-gray-900 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] bg-indigo-50/30 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-indigo-600 mb-4">
              Markets & Application areas
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
              Industries & Applications
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Deploying robust autonomous technologies to solve critical industry challenges.
            </p>
          </Reveal>
        </div>

        {/* 8 Cards Grid with Inline Row Drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {industriesData.map((ind, idx) => {
            const isExpanded = expandedCardId === ind.id;
            const shouldRenderDrawer = selectedIndustry && idx === insertAfterIdx;

            return (
              <Fragment key={ind.id}>
                {/* Single Card */}
                <Reveal delay={idx * 0.04}>
                  <div
                    className={`group relative rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-end border cursor-pointer ${
                      isExpanded
                        ? "ring-2 ring-indigo-600 shadow-2xl border-transparent"
                        : "border-gray-100 hover:shadow-xl hover:-translate-y-1"
                    }`}
                    style={{ minHeight: "310px" }}
                    onClick={() => setExpandedCardId(isExpanded ? null : ind.id)}
                  >
                    {/* Background Image */}
                    <img
                      src={ind.img}
                      alt={ind.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.55) 55%, rgba(0,0,0,0.15) 100%)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <div
                          className="size-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: ind.accent + "33",
                            color: ind.accent,
                            border: `1.5px solid ${ind.accent}55`,
                          }}
                        >
                          <ind.icon size={20} strokeWidth={1.5} />
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-lg text-white leading-snug">
                        {ind.title}
                      </h3>
                      <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                        {ind.desc}
                      </p>

                      {/* Expand Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCardId(isExpanded ? null : ind.id);
                        }}
                        className={`mt-2 inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl border text-xs font-semibold backdrop-blur-md transition-all group/btn ${
                          isExpanded
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                            : "bg-white/15 hover:bg-white/25 border-white/20 text-white"
                        }`}
                        aria-label={`Toggle objectives for ${ind.title}`}
                      >
                        <span className="font-medium text-[11px] tracking-wide">
                          {isExpanded ? "Close Details" : "Operational Objectives"}
                        </span>
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing aura when collapsed */}
                          {!isExpanded && (
                            <span className="absolute -inset-1 rounded-full bg-indigo-400/50 animate-ping opacity-75 pointer-events-none" />
                          )}
                          <div
                            className={`relative z-10 size-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isExpanded
                                ? "bg-white text-indigo-600 rotate-180"
                                : "bg-indigo-600 text-white shadow-md shadow-indigo-600/50 animate-bounce"
                            }`}
                          >
                            <ChevronDown size={14} className="stroke-[2.5]" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </Reveal>

                {/* Full Rectangle Width Drawer inserted right after the row containing the clicked card */}
                {shouldRenderDrawer && (
                  <div className="col-span-full w-full my-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndustry.id}
                        initial={{ opacity: 0, y: 15, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden w-full"
                      >
                        <div className="w-full bg-white border border-gray-200/90 rounded-3xl p-8 md:p-10 shadow-2xl relative text-left">
                          {/* Close Button */}
                          <button
                            onClick={() => setExpandedCardId(null)}
                            className="absolute top-6 right-6 size-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                            aria-label="Close details"
                          >
                            <X size={18} />
                          </button>

                          {/* Header */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pr-12">
                            <div
                              className="size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                              style={{
                                background: selectedIndustry.accent + "18",
                                color: selectedIndustry.accent,
                                border: `1.5px solid ${selectedIndustry.accent}33`,
                              }}
                            >
                              <selectedIndustry.icon size={26} strokeWidth={1.8} />
                            </div>
                            <div>
                              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-indigo-600 mb-1">
                                Flight & Operational Objectives
                              </span>
                              <h3 className="font-display text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                                {selectedIndustry.title}
                              </h3>
                            </div>
                          </div>

                          {/* Body Content in 2 Columns */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left Column: List of Specific Objectives */}
                            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-7">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                <span className="size-2 rounded-full bg-indigo-600" />
                                Key Mission Objectives
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {selectedIndustry.details.map((detail, dIdx) => (
                                  <li
                                    key={dIdx}
                                    className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm"
                                  >
                                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <span className="text-sm font-semibold text-gray-800 leading-snug">
                                      {detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right Column: Aerospace Execution & Deployment Guarantee */}
                            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/70 to-blue-50/50 border border-indigo-100 rounded-2xl p-6 md:p-7 flex flex-col justify-between h-full">
                              <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 mb-3">
                                  Deployment & Capability Guarantee
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium mb-4">
                                  We combine advanced aerospace engineering with reliable execution to deliver autonomous UAV solutions that perform seamlessly under real-world conditions.
                                </p>
                                <ul className="space-y-2.5 text-xs font-bold text-gray-800">
                                  <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-indigo-600" />
                                    Industry-leading technology and expertise
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-indigo-600" />
                                    Proven track record of successful deployments
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-indigo-600" />
                                    24/7 support and continuous flight optimization
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-indigo-600" />
                                    Customizable payload & software solutions
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const headlineText = "Where Precision Meets the Sky.";
  const words = headlineText.split(" ");

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup load timeline for the hero title elements
      if (!headlineRef.current) return;

      const wordsElements = headlineRef.current.querySelectorAll(".word-wrapper");
      const loadTl = gsap.timeline();

      wordsElements.forEach((word) => {
        const fragment1 = word.querySelector(".word-fragment-1");
        const fragment2 = word.querySelector(".word-fragment-2");

        gsap.set(word, {
          y: 30,
          opacity: 0,
          filter: "blur(6px)",
        });

        gsap.set(fragment1, {
          x: -25,
          y: -15,
          rotation: -10,
          opacity: 0,
        });

        gsap.set(fragment2, {
          x: 25,
          y: 15,
          rotation: 10,
          opacity: 0,
        });
      });

      gsap.set(subheadlineRef.current, {
        opacity: 0,
        y: 15,
        filter: "blur(4px)",
      });

      gsap.set(ctasRef.current, {
        opacity: 0,
        y: 20,
      });

      wordsElements.forEach((word, index) => {
        const fragment1 = word.querySelector(".word-fragment-1");
        const fragment2 = word.querySelector(".word-fragment-2");
        const delay = index * 0.12;

        loadTl.to(
          word,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          delay,
        );

        loadTl.to(
          [fragment1, fragment2],
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          delay,
        );
      });

      const subheadlineStart = wordsElements.length * 0.12 + 0.2;
      loadTl.to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        subheadlineStart,
      );

      loadTl.to(
        ctasRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        subheadlineStart + 0.25,
      );

      // Hero scroll pinning, scale down, and fade out animation
      if (heroWrapperRef.current && heroInnerRef.current) {
        gsap.to(heroInnerRef.current, {
          scale: 0.85,
          opacity: 0,
          yPercent: 12,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        ref={heroWrapperRef}
        className="relative w-full h-screen z-10 overflow-hidden"
      >
        <div
          ref={heroInnerRef}
          className="absolute inset-0 w-full h-full flex items-center overflow-hidden"
        >
          {/* Full-Screen Background Video */}
          <video
            src={homeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          />

          {/* Left-Aligned Readable Gradient Overlay */}
          <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black/75 via-black/35 to-transparent z-10 pointer-events-none" />

          {/* Hero Content Container */}
          <div ref={heroContentRef} className="max-w-7xl mx-auto px-6 w-full relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl space-y-8 text-white"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold tracking-[0.16em] uppercase text-amber-400 mb-3 w-fit">
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes jumping-words-hero {
                    0%, 100% {
                      transform: translateY(0);
                    }
                    50% {
                      transform: translateY(-6px);
                    }
                  }
                ` }} />
                {["Next-Gen", "UAV", "Systems"].map((word, idx) => (
                  <span
                    key={idx}
                    className="inline-block"
                    style={{
                      animation: "jumping-words-hero 1.6s ease-in-out infinite",
                      animationDelay: `${idx * 0.15}s`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <h1
                ref={headlineRef}
                className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tighter text-white flex flex-wrap gap-x-[0.2em] gap-y-[0.1em]"
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
              </h1>
              <p
                ref={subheadlineRef}
                className="text-lg md:text-xl text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              >
                Advanced Drone systems engineered for real-world demands survey & mapping,
                infrastructure inspection, and defense operations, all from a single trusted
                manufacturer.
              </p>
              <div ref={ctasRef} className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-brand text-white font-bold uppercase text-xs tracking-widest hover:-translate-y-0.5 transition-transform shadow-xl shadow-brand/20 rounded border border-white/10"
                >
                  Book Consultation
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors rounded inline-flex items-center gap-2"
                >
                  View Products <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-surface">
        {/* 1. Industries & Applications */}
        <IndustriesSection />

        {/* 2. RPTO & Warroom Combined Feature Cards */}
        <CombinedFeaturePanel />

        {/* 3. Precision 3D Printing Full-Width Background Video Section */}
        <Home3DPrintingSection />

        {/* 4. Who We Are */}
        <section className="py-24 bg-white text-gray-900 border-t border-gray-100 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <motion.span
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] uppercase text-indigo-650 mb-2"
                  variants={{
                    animate: {
                      transition: {
                        staggerChildren: 0.12,
                      },
                    },
                  }}
                  initial="initial"
                  animate="animate"
                >
                  {["Who", "We", "Are"].map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="inline-block"
                      variants={{
                        initial: { y: 0 },
                        animate: {
                          y: [0, -6, 0],
                          transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 1.4,
                            ease: "easeInOut",
                          },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-gray-900 leading-tight">
                  Pioneering the Skies of Tomorrow
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Wingspann Global operates at the intersection of aerospace hardware and autonomous intelligence, building systems that redefine domestic UAV excellence.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="pt-4">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Read Our Story
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-8 bg-gray-50/50 border border-gray-200/50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] bg-indigo-50 pointer-events-none z-0" />
              <Reveal delay={0.15}>
                <div className="relative z-10 space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
                  <p className="font-semibold text-gray-900 text-xl leading-snug">
                    Wingspann Global is an innovation-driven aerospace startup focused on developing advanced unmanned aerial systems and drone-based solutions.
                  </p>
                  <p>
                    Combining engineering expertise with AI-driven autonomy and modern avionics, we aim to build reliable, scalable, and mission-ready technologies tailored to real-world applications.
                  </p>
                  <p>
                    We work across industries including defense, infrastructure, and industrial operations, delivering solutions that enhance efficiency, accuracy, and decision-making.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. What We Do */}
        <section className="py-24 bg-gray-50/40 text-gray-900 border-t border-b border-gray-150">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-indigo-650 mb-4">
                  Capabilities
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
                  What We Do
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  We engineer and deliver comprehensive UAV hardware and intelligence modules built for critical operational demands.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Plane,
                  title: "Drone Design & Development",
                  desc: "End-to-end UAV design, prototyping, assembly, and system integration tailored to mission requirements.",
                  color: "bg-blue-500/5 text-blue-600 border-blue-500/10 hover:border-blue-500/30",
                  bgImage: droneImage,
                  darkTheme: "bg-[#081225] text-blue-300 border-blue-950/40",
                  overlayGradient: "from-[#081225]/92 via-[#081225]/72 to-[#081225]/52",
                  hoverTextColor: "group-hover:text-blue-250",
                },
                {
                  icon: Map,
                  title: "Drone-Based Solutions",
                  desc: "Aerial mapping, surveillance, inspection, and data acquisition for diverse industrial applications.",
                  color: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 hover:border-emerald-500/30",
                  bgImage: droneSolutionsImage,
                  darkTheme: "bg-[#061810] text-emerald-300 border-emerald-950/40",
                  overlayGradient: "from-[#061810]/92 via-[#061810]/72 to-[#061810]/52",
                  hoverTextColor: "group-hover:text-emerald-250",
                },
                {
                  icon: Cpu,
                  title: "Autonomous Systems & AI",
                  desc: "Integration of intelligent flight systems, advanced avionics, and automation for enhanced performance.",
                  color: "bg-indigo-500/5 text-indigo-600 border-indigo-500/10 hover:border-indigo-500/30",
                  bgImage: aiImage,
                  darkTheme: "bg-[#0c1122] text-indigo-300 border-indigo-950/40",
                  overlayGradient: "from-[#0c1122]/90 via-[#0c1122]/70 to-[#0c1122]/50",
                  hoverTextColor: "group-hover:text-indigo-200",
                },
                {
                  icon: Wrench,
                  title: "Custom & Project-Based Solutions",
                  desc: "Flexible, client-specific solutions for government tenders and enterprise needs.",
                  color: "bg-amber-500/5 text-amber-600 border-amber-500/10 hover:border-amber-500/30",
                  bgImage: customImage,
                  darkTheme: "bg-[#181108] text-amber-300 border-amber-950/40",
                  overlayGradient: "from-[#181108]/92 via-[#181108]/72 to-[#181108]/52",
                  hoverTextColor: "group-hover:text-amber-250",
                },
              ].map((block, idx) => (
                <Reveal key={block.title} delay={idx * 0.08}>
                  <div className={`group relative h-full border p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl shadow-sm overflow-hidden ${
                    block.bgImage && block.darkTheme
                      ? block.darkTheme
                      : `bg-white ${block.color}`
                  }`}>
                    {block.bgImage && (
                      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <img
                          src={block.bgImage}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${block.overlayGradient || "from-[#0c1122]/90 via-[#0c1122]/70 to-[#0c1122]/50"}`} />
                      </div>
                    )}
                    <div className="relative z-10">
                      <div className="size-14 grid place-items-center rounded-2xl bg-current/15 mb-8">
                        <block.icon size={26} strokeWidth={1.5} className="text-current" />
                      </div>
                      <h3 className={`font-display font-bold text-2xl mb-4 transition-colors ${
                        block.bgImage && block.hoverTextColor
                          ? `text-white ${block.hoverTextColor}`
                          : "text-gray-900 group-hover:text-indigo-600"
                      }`}>
                        {block.title}
                      </h3>
                      <p className={`text-sm md:text-base leading-relaxed ${
                        block.bgImage 
                          ? "text-slate-300" 
                          : "text-gray-500"
                      }`}>
                        {block.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How We Work (Carousel) */}
        <HowWeWorkCarousel />
      </div>
    </>
  );
}

function CombinedFeaturePanel() {
  return (
    <section className="py-20 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row: RPTO (2/3 width) + Warrooms (1/3 width) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* RPTO Training Hub Card */}
          <div className="lg:col-span-7 bg-[#0B132B] text-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-8">
                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
                  RPTO Training Hub
                </h3>
                <span className="px-3.5 py-1 rounded-full border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 shrink-0">
                  DGCA CERTIFIED
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-6 border-y border-white/10 py-6">
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-white">5-7</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                    TRAINING DAYS
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-white">4</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                    DRONE MODELS
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-white">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                    DGCA COMPLIANT
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-white">1</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                    FLYING FIELD
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                A DGCA-approved campus purpose-built for pilot training — dedicated ground classroom, simulator lab and a marked flying field on the outskirts of Chhatrapati Sambhajinagar.
              </p>
            </div>

            <div className="pt-8">
              <Link
                to="/rpto"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                EXPLORE RPTO COURSES →
              </Link>
            </div>
          </div>

          {/* War Room Card */}
          <Link
            to="/services#war-room"
            className="lg:col-span-5 relative overflow-hidden rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/10 flex flex-col justify-between group text-white cursor-pointer block"
          >
            {/* Background Image & Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <img
                src={warroomBg}
                alt="War Room Tactical Command Center"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/45" />
            </div>

            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400 mb-4 block">
                STRATEGIC SERVICE
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                War Room
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Real-time command centers built around your drone feed. Live video, thermal and CCTV sources onto one video wall, overlaid on GIS maps.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 border-b border-amber-300/40 group-hover:border-amber-300 transition-colors pb-0.5">
                DETAILS →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeRPTOSection() {
  return (
    <section className="rpto-banner-section relative overflow-hidden bg-slate-950 w-full min-h-[420px] md:h-[650px]">
      {/* Background Video — object-fit cover for all screen sizes */}
      <video
        src={rptoVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Dark Overlay for visual contrast and text readability */}
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

      {/* Centered/Left-aligned content */}
      <div className="max-w-7xl mx-auto px-6 h-full relative z-20 flex items-center">
        <div className="max-w-3xl space-y-8 text-white">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
              Master the Skies.<br />
              Command the <span className="text-indigo-450">Technology.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-slate-200 text-lg leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              The ultimate flight academy for <strong className="text-white font-semibold font-sans">next-gen pilots</strong> — hands-on drone training, certified instructors, and real airspace hours at our DGCA-aligned facility.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.15} className="pt-2">
            <Link
              to="/rpto"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase text-xs tracking-widest transition-all rounded shadow-lg shadow-indigo-600/15 hover:-translate-y-0.5 inline-block"
            >
              Explore RPTO Courses →
            </Link>
          </Reveal>

          {/* Highlights Grid */}
          <Reveal delay={0.2} className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {[
                {
                  title: "Govt.-Recognised",
                  desc: "DGCA-aligned certification",
                },
                {
                  title: "Fly From Day One",
                  desc: "100% hands-on training",
                },
                {
                  title: "Beyond The Course",
                  desc: "Career & placement support",
                },
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-indigo-500 pl-4 space-y-1">
                  <h4 className="font-display font-bold text-white text-base leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 font-bold tracking-wider uppercase">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Coordinates / Bottom overlay badge details */}
      <div className="absolute bottom-6 left-6 z-20 text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
        LAT 19.09°N · Enrollment Open
      </div>
      <div className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white">
        DGCA-Aligned
      </div>
    </section>
  );
}

function LocalStatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;

    const targetEl = numRef.current;
    const obj = { val: 0 };

    const anim = gsap.to(obj, {
      val: value,
      duration: 2.0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: targetEl,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (targetEl) {
          targetEl.textContent = String(Math.floor(obj.val));
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [value]);

  return (
    <Reveal delay={index * 0.06} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
        <span ref={numRef}>0</span>
        {suffix}
        <span className="text-indigo-650">.</span>
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
        {label}
      </div>
    </Reveal>
  );
}

function HomeStatsSeparator() {
  return (
    <section className="py-12 bg-slate-50 border-t border-b border-slate-100 relative z-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 items-center justify-center">
          {statsData.map((stat, index) => (
            <LocalStatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home3DPrintingSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { step: "01", title: "Upload", desc: "Instant STL analysis", icon: Upload },
    { step: "02", title: "Quote", desc: "Fast pricing options", icon: Calculator },
    { step: "03", title: "Print", desc: "24/7 Industrial print", icon: Settings },
    { step: "04", title: "Finish", desc: "Post-process & QA", icon: Wrench },
    { step: "05", title: "Ship", desc: "Express 48h delivery", icon: Truck },
  ];

  const STEP_DURATION = 3500; // 3.5s per step
  const TICK = 30;

  useEffect(() => {
    const ticks = STEP_DURATION / TICK;
    let tick = 0;

    const progressTimer = setInterval(() => {
      tick++;
      setProgress(Math.min((tick / ticks) * 100, 100));
    }, TICK);

    const stepTimer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      tick = 0;
    }, STEP_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [steps.length]);

  const goToStep = (idx: number) => {
    setActiveStep(idx);
    setProgress(0);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950 min-h-[650px] flex items-center">
      {/* Full Screen Background Video */}
      <video
        src={home3DVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Dark Overlay for Ultra Crisp Contrast */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start w-full lg:max-w-2xl bg-transparent"
          >
            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 drop-shadow-lg">
              Industrial Precision. <span className="text-sky-400">On Demand.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed mb-8 drop-shadow-md max-w-xl">
              Watch how your custom part moves from file upload to your door — automatically cycling through each high-precision production stage.
            </p>

            {/* 5-Step Pipeline Timeline */}
            <div className="w-full relative mb-8">
              {/* Background connector track */}
              <div
                className="absolute z-0 h-0.5 bg-white/20"
                style={{
                  top: "24px",
                  left: `calc(${100 / (steps.length * 2)}%)`,
                  right: `calc(${100 / (steps.length * 2)}%)`,
                }}
              />

              {/* Animated fill track */}
              <motion.div
                className="absolute z-0 h-0.5 bg-sky-400 origin-left"
                style={{
                  top: "24px",
                  left: `calc(${100 / (steps.length * 2)}%)`,
                  right: `calc(${100 / (steps.length * 2)}%)`,
                }}
                animate={{
                  scaleX:
                    activeStep === 0
                      ? 0
                      : activeStep / (steps.length - 1),
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {/* Step nodes */}
              <div className="grid grid-cols-5 gap-2 text-center relative z-10">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <div
                      key={s.step}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => goToStep(i)}
                    >
                      <motion.div
                        className={`relative size-11 md:size-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                          isActive
                            ? "border-sky-400 bg-sky-500 text-white shadow-lg shadow-sky-500/50"
                            : isPast
                            ? "border-sky-400/80 bg-sky-950/80 text-sky-300"
                            : "border-white/20 bg-slate-900/80 text-slate-400 group-hover:border-sky-400/50"
                        }`}
                        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <Icon size={18} />

                        {/* Animated progress ring on active step node */}
                        {isActive && (
                          <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 48 48"
                          >
                            <circle
                              cx="24"
                              cy="24"
                              r="21"
                              fill="none"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="2"
                            />
                            <motion.circle
                              cx="24"
                              cy="24"
                              r="21"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 21}`}
                              strokeDashoffset={`${2 * Math.PI * 21 * (1 - progress / 100)}`}
                              style={{ transition: "stroke-dashoffset 40ms linear" }}
                            />
                          </svg>
                        )}
                      </motion.div>

                      <span
                        className={`text-[10px] font-black tracking-widest uppercase mb-0.5 transition-colors ${
                          isActive ? "text-sky-400" : isPast ? "text-sky-300/80" : "text-white/40"
                        }`}
                      >
                        {s.step}
                      </span>
                      <span
                        className={`text-xs font-extrabold mb-0.5 transition-colors ${
                          isActive ? "text-white" : isPast ? "text-white/90" : "text-white/60"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span className="text-[10px] text-slate-300 font-semibold leading-tight hidden sm:block max-w-[80px] drop-shadow-sm">
                        {s.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explore Our 3D Printer Button */}
            <div className="pt-2">
              <Link
                to="/3d-printing"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm md:text-base shadow-2xl hover:-translate-y-0.5 transition-all group"
              >
                <span>Explore Our 3D Printer</span>
                <ArrowUpRight size={18} className="text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
