import { useState } from "react";
import { toast } from "sonner";
import { TurnstileWidget } from "../components/site/TurnstileWidget";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Calendar,
  BookOpen,
  Award,
  Compass,
  FileCheck,
  Plane,
  ChevronDown,
  Building2,
  GraduationCap,
  Sparkles,
  Layers,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "../components/site/Reveal";
import rptoImg from "../assets/pexels-rodolfo-baumann-1772573612-28467506.jpg";

export default RptoPage;


function RptoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "Small Category RPC",
    email: "",
    message: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("source", "rpto");
      payload.append("name", formData.name);
      payload.append("email", formData.email || "rpto-enquiry@wingspannglobal.com");
      payload.append("phone", formData.phone);
      payload.append("subject", formData.course);
      payload.append("message", formData.message || `RPTO Enquiry for ${formData.course}`);
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
        console.error("[RPTO Form JSON Error]", jsonErr);
      }

      if (!res.ok || !resData?.success) {
        const serverError = resData?.error;
        throw new Error(serverError || "Submission failed");
      }

      setFormSubmitted(true);
      toast.success(resData.message || "Enquiry submitted successfully!");
    } catch (err: any) {
      console.error("[RPTO Form Error]", err);
      const isUserFriendly = err.message && !err.message.includes("Unexpected") && !err.message.includes("Failed to execute") && !err.message.includes("JSON");
      toast.error(isUserFriendly ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const waypoints = [
    {
      code: "WP01",
      title: "Enroll & Digital Sky",
      desc: "Register, submit eligibility docs, create your Digital Sky pilot profile.",
    },
    {
      code: "WP02",
      title: "Ground School",
      desc: "Air law, meteorology, navigation & aerodynamics in the classroom.",
    },
    {
      code: "WP03",
      title: "Simulator Hours",
      desc: "Practice takeoff, hover, and emergency maneuvers risk-free.",
    },
    {
      code: "WP04",
      title: "Dual Flight",
      desc: "Supervised flying with a certified instructor on our marked field.",
    },
    {
      code: "WP05",
      title: "Solo & Exam",
      desc: "Log solo flight hours, followed by theory & practical flight evaluation.",
    },
    {
      code: "WP06",
      title: "RPC Issued",
      desc: "Remote Pilot Certificate generated on Digital Sky within 5–7 working days.",
    },
  ];

  const syllabusDays = [
    {
      day: "01",
      phase: "Ground",
      title: "Air Law & Airspace",
      desc: "Drone Rules 2021, Digital Sky portal ops, airspace classifications, NPNT and no-fly zones around Sambhajinagar.",
      tags: ["Regulations", "Digital Sky", "Airspace Maps"],
    },
    {
      day: "02",
      phase: "Ground",
      title: "Meteorology & Principles of Flight",
      desc: "Weather reading for safe operations, aerodynamics of fixed-wing & rotary platforms, ATC & radio-telephony procedure.",
      tags: ["Weather", "Aerodynamics", "RTR Procedure"],
    },
    {
      day: "03",
      phase: "Sim",
      title: "Simulator & Equipment Maintenance",
      desc: "Simulator sorties for takeoff, hover, waypoint navigation and emergency handling; drone maintenance & pre-flight checklists.",
      tags: ["Simulator", "Maintenance", "Risk Assessment"],
    },
    {
      day: "04",
      phase: "Flight",
      title: "Dual & Solo Flying",
      desc: "Minimum logged dual and solo hours on our marked field under direct DGCA-certified instructor supervision.",
      tags: ["Field Training", "Flight Logging", "Emergency Drills"],
    },
    {
      day: "05",
      phase: "Exam",
      title: "Evaluation & Certification",
      desc: "Written theory examination and practical flight test; on passing, your RPC is generated on the Digital Sky platform.",
      tags: ["Theory Exam", "Practical Test", "RPC Generation"],
    },
  ];

  const facilities = [
    {
      icon: Building2,
      title: "Ground Classroom",
      desc: "Projector-equipped smart classroom for air law, meteorology and navigation sessions.",
    },
    {
      icon: Layers,
      title: "Simulator Lab",
      desc: "Multi-station flight simulators replicating real controller response before live flying.",
    },
    {
      icon: Plane,
      title: "Certified Fleet",
      desc: "NPNT-compliant training drones spanning micro to small category weights.",
    },
    {
      icon: Compass,
      title: "Dedicated Flying Field",
      desc: "A marked, cleared field on the outskirts of Sambhajinagar for dual and solo flight training.",
    },
    {
      icon: FileCheck,
      title: "Digital Sky Desk",
      desc: "Staff on hand to assist with profile creation, documentation and RPC follow-up.",
    },
  ];


  const faqs = [
    {
      q: "Do I need a Remote Pilot Certificate to fly a drone in India?",
      a: "Yes, for every category except Nano (under 250g). All Micro, Small, Medium and Large category drone pilots require a valid Remote Pilot Certificate (RPC) issued by a DGCA-approved RPTO like Wingspann RPTO.",
    },
    {
      q: "How long does the Small Category RPC course take?",
      a: "Our Small Category course runs over 5 days, combining classroom ground school, simulator training, and logged dual/solo flight hours on our approved flying field.",
    },
    {
      q: "What documents do I need to bring for enrollment?",
      a: "You need a valid photo ID, Aadhaar card for Digital Sky e-KYC verification, passport-size photographs, and proof of Class 10 qualification.",
    },
    {
      q: "How soon will I receive my Remote Pilot Certificate?",
      a: "Once you clear both the theory exam and practical flight test, your RPC is generated directly on the DGCA Digital Sky platform within 5–7 working days.",
    },
  ];

  return (
    <div className="bg-surface text-brand transition-colors duration-300">
      {/* ================= HERO SECTION WITH RPTO.JPG BACKGROUND ================= */}
      <section className="relative min-h-[620px] py-16 border-b border-brand/10 overflow-hidden flex items-center bg-slate-950 text-white">
        {/* Background Image - Zoomed out & brightened position */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat z-0 transition-all duration-500"
          style={{
            backgroundImage: `url(${rptoImg})`,
            backgroundPosition: "center 35%",
            filter: "brightness(0.92) contrast(1.05)",
          }}
        />

        {/* Lighter, subtle gradient overlay so sky & drone are bright and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent z-0 pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold tracking-wide backdrop-blur-xs">
              <ShieldCheck size={14} className="text-amber-400" />
              DGCA-Approved Remote Pilot Training Organisation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.08] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              Your flight plan <br />
              to a drone pilot career.
            </h1>

            <p className="text-base md:text-lg text-slate-100 leading-relaxed font-sans font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              Wingspann RPTO trains India's next generation of certified remote pilots from our
              campus in Chhatrapati Sambhajinagar (Aurangabad) ground classes, simulator hours,
              and live solo flights, ending in a DGCA Remote Pilot Certificate on Digital Sky.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/25"
              >
                Explore Courses
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/20 bg-slate-950/60 text-xs font-mono text-slate-100 backdrop-blur-xs">
                <span className="size-2 rounded-full bg-emerald-400" />
                DGCA Approved RPTO
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/20 bg-slate-950/60 text-xs font-mono text-slate-100 backdrop-blur-xs">
                <span className="size-2 rounded-full bg-emerald-400" />
                Digital Sky Registered
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/20 bg-slate-950/60 text-xs font-mono text-slate-100 backdrop-blur-xs">
                <span className="size-2 rounded-full bg-emerald-400" />
                NPNT Compliant Fleet
              </span>
            </div>

            <div className="pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
              <div>
                LAT <b className="text-white block font-semibold">19.8762° N</b>
              </div>
              <div>
                LONG <b className="text-white block font-semibold">75.3433° E</b>
              </div>
              <div>
                BASE <b className="text-white block font-semibold">Chh. Sambhajinagar</b>
              </div>
              <div>
                RULE <b className="text-white block font-semibold">Drone Rules 2021</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP / STATS ================= */}
      <section className="bg-white dark:bg-slate-900 border-b border-brand/10 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold font-display text-brand">5–7 Days</div>
            <p className="text-xs font-mono uppercase tracking-wider text-brand/60">
              Avg. RPC Issuance Time*
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold font-display text-brand">4 Drones</div>
            <p className="text-xs font-mono uppercase tracking-wider text-brand/60">
              DGCA Certified Fleet
            </p>
          </div>
          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold font-display text-brand">100%</div>
            <p className="text-xs font-mono uppercase tracking-wider text-brand/60">
              DGCA Compliant Training
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold font-display text-brand">1 Flying Field</div>
            <p className="text-xs font-mono uppercase tracking-wider text-brand/60">
              Dedicated Sambhajinagar Site
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about-rpto" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-brand/10 rounded-2xl p-8 shadow-sm">
                <svg viewBox="0 0 340 340" className="w-full h-auto">
                  <rect x="10" y="10" width="320" height="320" className="stroke-brand/20 fill-none" />
                  <rect
                    x="40"
                    y="60"
                    width="260"
                    height="150"
                    rx="4"
                    className="fill-surface stroke-brand"
                    strokeWidth="1.5"
                  />
                  <line x1="40" y1="90" x2="300" y2="90" className="stroke-brand/30" />
                  <circle cx="70" cy="75" r="5" className="fill-red-500" />
                  <circle cx="88" cy="75" r="5" className="fill-amber-500" />
                  <circle cx="106" cy="75" r="5" className="fill-emerald-500" />
                  <path
                    d="M60 180 L110 130 L150 160 L200 100 L260 150"
                    className="stroke-amber-500 fill-none"
                    strokeWidth="2.5"
                  />
                  <circle cx="200" cy="100" r="5" className="fill-brand" />
                  <rect x="120" y="230" width="100" height="60" className="fill-brand" />
                  <path d="M170 230 L130 200 L210 200 Z" className="fill-brand" />
                  <rect x="150" y="255" width="18" height="35" className="fill-surface" />
                </svg>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Who We Are
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-brand">
                  A DGCA-approved campus, purpose-built for pilot training.
                </h2>
                <p className="text-brand/70 text-base leading-relaxed">
                  Wingspann RPTO operates a dedicated ground classroom, simulator lab and a marked
                  flying field on the outskirts of Chhatrapati Sambhajinagar, cleared for training
                  operations under the Drone Rules, 2021. We train candidates for the Small,
                  Micro and Medium category Remote Pilot Certificate, plus specialised add-on
                  courses for agriculture spraying, aerial mapping and cinematography.
                </p>

                <ul className="space-y-3.5 pt-2">
                  {[
                    "Approved Remote Pilot Training Organisation under Rule 34, Drone Rules 2021",
                    "Instructors certified through DGCA-recognised Train-the-Trainer programmes",
                    "NPNT-compliant training fleet registered on the Digital Sky platform",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-brand/80">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= COURSE CATEGORIES ================= */}
      <section id="courses" className="py-20 bg-white dark:bg-slate-900 border-t border-b border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Course Categories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-brand">
                Pick your category, by drone weight.
              </h2>
              <p className="text-brand/60 text-sm">
                Certification is category-specific under DGCA rules — here is where each category fits.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                weight: "≤ 250 g",
                title: "Nano Orientation",
                desc: "No RPC required by rule, but we run a 1-day safety & airspace-awareness workshop for hobby flyers.",
                tag: "Hobbyists",
              },
              {
                weight: "250 g – 2 kg",
                title: "Micro RPC",
                desc: "Ground school, simulator and flight test for micro-class drones — the entry certificate for content creators.",
                tag: "Content creators",
              },
              {
                weight: "2 kg – 25 kg",
                title: "Small RPC",
                desc: "Our flagship 5-day course. Covers agriculture, survey and mapping platforms most commonly deployed in India.",
                tag: "Most Popular",
                popular: true,
              },
              {
                weight: "25 kg – 150 kg",
                title: "Medium RPC",
                desc: "Add-on course for existing Small RPC holders moving to heavy-lift agricultural and logistics drones.",
                tag: "Advanced",
              },
            ].map((cat, idx) => (
              <Reveal key={idx}>
                <div
                  className={`h-full p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${cat.popular
                    ? "border-amber-500/50 bg-amber-500/5 shadow-md relative"
                    : "border-brand/10 bg-surface dark:bg-slate-950 hover:border-brand/30"
                    }`}
                >
                  {cat.popular && (
                    <span className="absolute -top-3 right-6 bg-amber-500 text-white font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                      Recommended
                    </span>
                  )}
                  <div className="space-y-3">
                    <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      {cat.weight}
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand">{cat.title}</h3>
                    <p className="text-xs text-brand/70 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="pt-6">
                    <span className="inline-block font-mono text-[11px] font-medium uppercase px-2.5 py-1 rounded border border-brand/15 text-brand/60 bg-white/50 dark:bg-slate-900/50">
                      {cat.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAINING JOURNEY TIMELINE ================= */}
      <section id="journey" className="py-20 bg-brand text-brand-foreground relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-2xl mb-16 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Training Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                Your route from enrollment to RPC.
              </h2>
              <p className="text-slate-300 text-sm">
                Six waypoints, the exact structured route every batch flies with us.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {waypoints.map((wp, idx) => (
              <div key={idx} className="relative group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
                <div className="font-mono text-xs text-amber-400 font-bold tracking-widest">
                  {wp.code}
                </div>
                <h4 className="text-base font-bold font-display text-white mt-2 mb-1.5">{wp.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{wp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SYLLABUS 5-COLUMN CURRICULUM ================= */}
      <section id="syllabus" className="py-24 bg-white dark:bg-slate-900 border-t border-b border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full inline-block border border-amber-500/20">
                Small RPC • Day-by-Day Curriculum
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-brand">
                What five days actually look like.
              </h2>
              <p className="text-brand/60 text-sm leading-relaxed max-w-xl mx-auto">
                A structured 5-day flight academy program combining classroom ground school, simulator sorties, live field flying, and DGCA Digital Sky evaluation.
              </p>
            </div>
          </Reveal>

          {/* 5-Column Equal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {syllabusDays.map((item, idx) => {
              const bgGradients = [
                "from-blue-500 to-indigo-500",
                "from-indigo-500 to-sky-500",
                "from-amber-500 to-orange-500",
                "from-emerald-500 to-teal-500",
                "from-emerald-600 to-cyan-600",
              ];
              return (
                <Reveal key={idx}>
                  <div
                    className={`h-full rounded-2xl bg-surface dark:bg-slate-950 border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group ${idx === 4
                      ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20"
                      : "border-brand/10 hover:border-amber-500/40"
                      }`}
                  >
                    <div>
                      {/* Top colored gradient stripe */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${bgGradients[idx % bgGradients.length]}`} />

                      <div className="p-6 space-y-4">
                        {/* Day badge & Phase tag */}
                        <div className="flex items-center justify-between">
                          <span className="size-10 rounded-xl bg-brand text-brand-foreground font-mono text-sm font-bold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            {item.day}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-md">
                            {item.phase}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-display text-brand leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs md:text-sm text-brand/85 dark:text-slate-300 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Tag List */}
                    <div className="p-6 pt-0 space-y-3 border-t border-brand/10 mt-4">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 pt-3">
                        Key Modules
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-brand/5 dark:bg-slate-800 border border-brand/20 text-xs font-semibold text-brand dark:text-slate-100 shadow-2xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FACILITIES & FLEET ================= */}
      <section id="facilities" className="py-20 bg-white dark:bg-slate-900 border-t border-b border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-16 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Facilities & Fleet
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-brand">
                Built for hands-on training, not just theory.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => {
              const IconComponent = fac.icon;
              return (
                <Reveal key={idx}>
                  <div className="p-6 rounded-2xl bg-surface dark:bg-slate-950 border border-brand/10 h-full space-y-3">
                    <div className="size-12 rounded-xl bg-brand/5 dark:bg-slate-800 text-brand flex items-center justify-center">
                      <IconComponent size={24} className="text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-brand">{fac.title}</h3>
                    <p className="text-xs text-brand/70 leading-relaxed">{fac.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY & DIGITAL SKY ================= */}
      <section id="eligibility" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Eligibility
                </div>
                <h2 className="text-3xl font-bold font-display text-brand">Who can apply?</h2>

                <ul className="space-y-4">
                  {[
                    { title: "18 years or older", desc: "Minimum age requirement to hold a Remote Pilot Certificate." },
                    { title: "Passed Class 10", desc: "Minimum educational qualification prescribed under DGCA norms." },
                    { title: "Medically Fit", desc: "Self-declared medical fitness; no color blindness for visual signaling." },
                    { title: "Valid ID & Aadhaar", desc: "Required for DGCA Digital Sky pilot profile registration and e-KYC." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-brand/10">
                      <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <b className="text-sm text-brand block">{item.title}</b>
                        <span className="text-xs text-brand/60">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Digital Sky Process
                </div>
                <h2 className="text-3xl font-bold font-display text-brand">How certification is issued.</h2>

                <ol className="space-y-4">
                  {[
                    { step: "01", title: "Create Digital Sky Profile", desc: "Aadhaar e-KYC profile setup prior to training start date." },
                    { step: "02", title: "Complete Training at Wingspann RPTO", desc: "Ground school classroom, simulator drills, and logged flight hours." },
                    { step: "03", title: "Clear DGCA Evaluation", desc: "Theory examination and supervised practical flight test." },
                    { step: "04", title: "Receive your RPC", desc: "Issued directly on Digital Sky portal within 5–7 working days." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-brand/10">
                      <span className="size-8 rounded-lg bg-brand text-brand-foreground font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <b className="text-sm text-brand block">{item.title}</b>
                        <span className="text-xs text-brand/60">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>




      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-t border-b border-brand/10">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                FAQ
              </div>
              <h2 className="text-3xl font-bold font-display text-brand">Frequently Asked Questions</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-brand/10 overflow-hidden bg-surface dark:bg-slate-950"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold font-display text-brand flex justify-between items-center gap-4 hover:bg-brand/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-amber-500 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs md:text-sm text-brand/70 leading-relaxed border-t border-brand/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT & ADMISSIONS DESK ================= */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="max-w-2xl mb-12 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Get in Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-brand">
                Talk to our admissions desk.
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-2xl bg-brand text-brand-foreground space-y-6">
                <h3 className="text-xl font-bold font-display text-white">Wingspann RPTO</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-amber-400 shrink-0 mt-1" />
                    <div>
                      <b className="font-mono text-xs text-amber-400 uppercase block">Campus Address</b>
                      <span className="text-slate-300">
                        Chhatrapati Sambhajinagar (Aurangabad), Maharashtra , 431005
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-amber-400 shrink-0 mt-1" />
                    <div>
                      <b className="font-mono text-xs text-amber-400 uppercase block">Phone</b>
                      <span className="text-slate-300">+91 91757 78119</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-amber-400 shrink-0 mt-1" />
                    <div>
                      <b className="font-mono text-xs text-amber-400 uppercase block">Email</b>
                      <a href="mailto:rpto@wingspannglobal.com" className="text-slate-300 hover:text-amber-400 transition-colors">
                        rpto@wingspannglobal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-amber-400 shrink-0 mt-1" />
                    <div>
                      <b className="font-mono text-xs text-amber-400 uppercase block">Office Hours</b>
                      <span className="text-slate-300">Mon – Sat, 09:00 AM – 05:30 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-brand/10 shadow-sm">
              <h3 className="text-xl font-bold font-display text-brand mb-6">Enrollment Enquiry</h3>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center space-y-2">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                  <h4 className="font-bold text-lg">Enquiry Received!</h4>
                  <p className="text-xs">
                    Thank you! Our admissions coordinator will get in touch with batch schedules and registration steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand/70 mb-1.5 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand/15 bg-surface dark:bg-slate-950 text-sm text-brand focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand/70 mb-1.5 font-semibold">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand/15 bg-surface dark:bg-slate-950 text-sm text-brand focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand/70 mb-1.5 font-semibold">
                        Interested Course
                      </label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-brand/15 bg-surface dark:bg-slate-950 text-sm text-brand focus:outline-none focus:border-amber-500"
                      >
                        <option>Small Category RPC</option>
                        <option>Micro Category RPC</option>
                        <option>Agriculture Drone Add-on</option>
                        <option>Medium Category RPC</option>
                        <option>Instructor / TTT Course</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-brand/70 mb-1.5 font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-brand/15 bg-surface dark:bg-slate-950 text-sm text-brand focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-brand/70 mb-1.5 font-semibold">
                      Message / Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your background or batch questions"
                      className="w-full px-4 py-2.5 rounded-lg border border-brand/15 bg-surface dark:bg-slate-950 text-sm text-brand focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Turnstile Abuse Protection */}
                  <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:opacity-50 py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    {submitting ? "Sending..." : "Send Enrollment Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>    </div>
  );
}
