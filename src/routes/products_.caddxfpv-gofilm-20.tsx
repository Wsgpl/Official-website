import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { ArrowLeft, ArrowUpRight, Camera, Shield, Cpu, Zap, Settings, RefreshCw, Download } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { ScrambleText } from "../components/ui/ScrambleText";

// Assets
import productCaddx from "../assets/1.png";
import brochureBg from "../assets/Brocher.png";

export default CaddxFpvProductPage;


/* ─── Hotspot data ─────────────────────────────────────────────── */
const HOTSPOTS = [
  {
    id: 1,
    x: "50%",
    y: "30%",
    title: "Avatar Moonlight Kit",
    desc: "True 4K/60fps starlight camera with excellent night vision. Perfect for both day and night cinematic flights.",
  },
  {
    id: 2,
    x: "25%",
    y: "55%",
    title: "Compact 2\" Frame",
    desc: "94mm wheelbase injection-molded crash-resistant frame with integrated XT30 connector and damping camera mount.",
  },
  {
    id: 3,
    x: "75%",
    y: "65%",
    title: "1303 6000KV Motors",
    desc: "High-efficiency brushless motor array optimized for 3S–4S LiPo batteries to deliver agile and responsive control.",
  },
  {
    id: 4,
    x: "50%",
    y: "85%",
    title: "EIS & Gyroflow Support",
    desc: "Integrated electronic image stabilization combined with Gyroflow support guarantees butter-smooth cinematic footage.",
  },
];

/* ─── Spec groups ────────────────────── */
const detailedSpecs = [
  {
    group: "Aircraft Specifications",
    items: [
      { key: "Model Name", value: "Coming Soon" },
      { key: "SKU", value: "C0CA-FP010" },
      { key: "Wheelbase Size", value: "94 mm" },
      { key: "Total Weight", value: "~115 g (Without battery)" },
      { key: "Propeller Size", value: "2 inches" },
      { key: "Power Plug", value: "Integrated XT30" },
    ],
  },
  {
    group: "Camera & Imaging",
    items: [
      { key: "Imaging System", value: "Avatar Moonlight Kit" },
      { key: "Video Resolution", value: "4K @ 60fps" },
      { key: "Night Operations", value: "Starlight Sensor (Superior Low-Light Video)" },
      { key: "Image Stabilization", value: "EIS & Gyroflow Supported" },
      { key: "Camera Angle", value: "Adjustable with Damping Mount" },
    ],
  },
  {
    group: "Power & Propulsion",
    items: [
      { key: "Motor Type", value: "1303 6000KV Brushless Motors" },
      { key: "Power Configuration", value: "3S–4S LiPo Compatible" },
      { key: "Flight Time", value: "Up to 30 Minutes" },
      { key: "Flight Style", value: "Cinematic, Freestyle, Indoor & Outdoor FPV" },
    ],
  },
];

const features = [
  {
    icon: Camera,
    title: "True 4K Starlight Footage",
    desc: "Equipped with Avatar Moonlight Kit for 4K/60FPS ultra-clear video and excellent night vision—ideal for day or night cinematic flights.",
  },
  {
    icon: Shield,
    title: "Lightweight & Agile Design",
    desc: "Compact 94mm wheelbase, ~115g total weight, delivering responsive control and up to 5.5 min flight time.",
  },
  {
    icon: RefreshCw,
    title: "EIS & Gyroflow Stabilization",
    desc: "Integrated stabilization ensures smooth, shake-free footage; manual shutter & ISO provide creative flexibility.",
  },
  {
    icon: Settings,
    title: "Durable Frame with XT30",
    desc: "Crash-resistant injection-molded frame with damping camera mount, built-in XT30 plug, and compatibility for 25.5mm & 20mm accessories.",
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
      setVal(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

function CaddxFpvProductPage() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
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
  const flightCount = useCounter(5.5, 1600, statsVisible);
  const weightCount = useCounter(115, 1600, statsVisible);
  const wheelbaseCount = useCounter(94, 1800, statsVisible);

  return (
    <div className="min-h-screen text-gray-900 dark:text-slate-100 transition-colors overflow-x-clip bg-[#0B0D13]">
      <style>{`
        /* ── Keyframes ── */
        @keyframes hero-slide-up   { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-slide-right{ from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes drone-float     { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(1.5deg); } }
        @keyframes ping-ring       { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes reveal-up       { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes reveal-left     { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes reveal-right    { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

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
      `}</style>

      {/* Back to Products */}
      <div className="absolute top-28 left-6 md:left-12 z-45">
        <Link
          to="/products"
          className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2"
        >
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5 overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-purple-500/5 pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-pink-500/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full z-10">
          {/* Left Text */}
          <div className="hero-left text-left space-y-6">
            <div className="inline-flex flex-wrap gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                FPV Drone
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
                Best Selling
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                4K / 60fps
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-none tracking-tight">
              Coming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Soon
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
              Ultra-light 2-inch cinematic FPV drone equipped with the Avatar Moonlight Kit for true 4K starlight footage and gyroflow stabilization.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 group hover:-translate-y-0.5"
              >
                Request Quote <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href={brochureBg}
                download="Wingspann-Product-Brochure.png"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Download size={14} /> Download Brochure
              </a>
              <a
                href="#specs"
                className="px-8 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
              >
                View Specifications
              </a>
            </div>

            <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest pt-2">
              SKU: C0CA-FP010
            </div>
          </div>

          {/* Right Product Image */}
          <div className="hero-right flex justify-center relative">
            <div className="absolute w-[450px] h-[450px] rounded-full blur-[90px] bg-purple-500/10 pointer-events-none" />
            <div className="drone-float relative z-10 w-full max-w-[420px]">
              <img
                src={productCaddx}
                alt="Coming Soon"
                className="w-full object-contain filter drop-shadow-[0_12px_40px_rgba(139,92,246,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS COUNTER BAR ─── */}
      <section 
        ref={statsRef}
        className="py-12 bg-white/[0.02] border-b border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {wheelbaseCount.toFixed(0)} <span className="text-purple-400 text-lg md:text-2xl">mm</span>
            </div>
            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mt-2">
              Wheelbase
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-white tracking-tight">
              ~{weightCount.toFixed(0)} <span className="text-pink-400 text-lg md:text-2xl">g</span>
            </div>
            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mt-2">
              Weight
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {flightCount.toFixed(1)} <span className="text-cyan-400 text-lg md:text-2xl">min</span>
            </div>
            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mt-2">
              Flight Time
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOTSPOT SPECS ─── */}
      <section 
        className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center border-b border-white/5"
      >
        {/* Hotspots visual */}
        <div className="relative aspect-square max-w-[460px] mx-auto w-full bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center p-8">
          <img
            src={productCaddx}
            alt="Product Details"
            className="w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] z-10"
          />

          {HOTSPOTS.map((hs) => {
            const isActive = activeHotspot === hs.id;
            return (
              <div
                key={hs.id}
                className="absolute z-20"
                style={{ top: hs.y, left: hs.x }}
              >
                <button
                  onMouseEnter={() => setActiveHotspot(hs.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                  className={`hs-btn relative size-8 flex items-center justify-center group ${isActive ? "hs-active" : ""}`}
                >
                  <div className="hs-ring absolute inset-0 rounded-full bg-purple-500/40" />
                  <div className="hs-dot absolute size-3.5 rounded-full bg-purple-500 border border-white/80 transition-all group-hover:scale-110 shadow-md shadow-purple-500/50" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Hotspots Info */}
        <div className="space-y-8 text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Interactive Blueprint
            </span>
            <h2 className="font-display text-3xl font-black text-white mt-2">
              Explore the Technology
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Hover over or click the indicator dots to dive deep into the hardware component specifications.
            </p>
          </div>

          <div className="space-y-4">
            {HOTSPOTS.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  className={`p-5 rounded-2xl border transition-all duration-350 ${
                    isActive
                      ? "bg-purple-500/5 border-purple-500/30 shadow-lg shadow-purple-500/5 translate-x-2"
                      : "bg-white/[0.01] border-white/5"
                  }`}
                  onMouseEnter={() => setActiveHotspot(hs.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className={`size-2 rounded-full ${isActive ? "bg-purple-400 animate-pulse" : "bg-slate-600"}`} />
                    {hs.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {hs.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CORE HIGHLIGHTS ─── */}
      <section className="py-24 bg-white/[0.01] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Key Capabilities
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mt-2">
              Performance Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div 
                  key={i}
                  className="bg-[#12141C] border border-white/5 rounded-2xl p-6 text-left hover:border-purple-500/35 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="size-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SPECIFICATIONS TABLE ─── */}
      <section id="specs" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
            Full Blueprint
          </span>
          <h2 className="font-display text-3xl font-black text-white mt-2">
            Detailed Technical Specifications
          </h2>
        </div>

        <div className="space-y-12">
          {detailedSpecs.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2">
                {group.group}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {group.items.map((item, iIdx) => (
                  <div 
                    key={iIdx} 
                    className="flex justify-between items-center py-3 px-4 bg-white/[0.01] border border-white/5 rounded-xl text-xs"
                  >
                    <span className="text-slate-500 font-semibold">{item.key}</span>
                    <span className="text-white font-bold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
              Support
            </span>
            <h2 className="font-display text-3xl font-black text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-white/5 bg-[#12141C] rounded-2xl px-6">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-sm">
                Is the Avatar Moonlight Kit pre-installed?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 leading-relaxed pt-2">
                Yes, the Gofilm 20 Only comes standard with the Avatar Moonlight Kit fully integrated, configured, and tested for both starlight low-light operations and high-framerate 4K recording.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-white/5 bg-[#12141C] rounded-2xl px-6">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-sm">
                What battery should I use?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 leading-relaxed pt-2">
                We recommend high-quality 3S to 4S LiPo batteries with an XT30 connector (range from 450mAh to 650mAh) to maintain the optimal balance between power, weight, and flight time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-white/5 bg-[#12141C] rounded-2xl px-6">
              <AccordionTrigger className="text-white hover:no-underline font-bold text-sm">
                How does Gyroflow stabilization work?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 leading-relaxed pt-2">
                The onboard gyro records raw sensor telemetry during flight, which can be imported directly into the open-source Gyroflow application post-flight to apply cinematic digital stabilization.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
