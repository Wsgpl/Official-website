import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import productApex from "../assets/3Rd eye.jpg";
import productAgri from "../assets/agri.jpg";
import productSentinel from "../assets/EX 950 Drone.webp";
import productCaddx from "../assets/1.png";
import heroDrone from "../assets/3rd eye vd.jpg";
import { Reveal } from "../components/site/Reveal";
import { FAQSection } from "../components/site/FAQSection";

export default ProductsPage;


const products = [
  {
    name: "THE THIRD EYE",
    tagline: "Flagship industrial quadcopter",
    flight: "40 min",
    payload: "180 g",
    range: "4.1 km",
    apps: ["Inspection", "Mapping", "Surveillance"],
    img: productApex,
    slug: "/products/the-third-eye",
  },
  {
    name: "Sentinel-S Survey",
    tagline: "Long-range survey & mapping",
    flight: "60 min",
    payload: "2.0 kg",
    range: "25 km",
    apps: ["Topography", "Cadastral", "GIS"],
    img: productSentinel,
    slug: "/products/sentinel-s-survey",
  },
  {
    name: "Coming Soon",
    tagline: "True 4K starlight cinematic FPV",
    flight: "30 min",
    payload: "115 g",
    range: "Avatar HD",
    apps: ["Cinematic", "Freestyle", "FPV Drone"],
    img: productCaddx,
    slug: "/products",
  },
];


const productFAQs = [
  {
    question: "What types of drones does Wingspann Global manufacture?",
    answer: "We manufacture high-performance drones tailored for commercial applications: Sentinel-S Survey (long-range survey & mapping) and THE THIRD EYE (flagship industrial quadcopter). Each model can be configured for specific payloads, flight ranges, and operating environments."
  },
  {
    question: "What is the payload capacity and flight time of Wingspann drones?",
    answer: "Our drones offer payload capacities ranging from 180g (inspection sensors) up to 25 kg (heavy-lift cargo) with flight times ranging from 30 to 60 minutes per charge, depending on the specific model, payload weight, and battery configuration. For instance, our agricultural spraying drone is optimized for a 16-litre payload."
  },
  {
    question: "What is the price range of Wingspann drones?",
    answer: "Pricing depends on the drone type, payload capacity, and level of customization. Our entry-level mapping and inspection platforms start from ₹3.5 Lakh. Contact our sales team for a detailed, customized quote."
  },
  {
    question: "Are your drones DGCA certified / compliant with Indian drone regulations?",
    answer: "Yes, our drone platforms are designed and manufactured in full compliance with the DGCA (Directorate General of Civil Aviation) Drone Rules. Our primary models hold or are in the final stages of DGCA Type Certification, making them fully approved for legal commercial operations in India. We also assist our clients with the Digital Sky registration process (UIN/DAN generation)."
  },
  {
    question: "Do your drones come with a warranty?",
    answer: "Yes, Wingspann drones come with a standard 1-year manufacturer warranty covering manufacturing defects and hardware faults under normal operating conditions. Extended warranty plans and comprehensive Annual Maintenance Contracts (AMC) are also available to cover ongoing support."
  },
  {
    question: "Are any government subsidies available for buyers?",
    answer: "Yes, government subsidies are available in India for eligible buyers. Central schemes like SMAM (Sub-Mission on Agricultural Mechanization) and the Namo Drone Didi scheme offer 40% to 80% subsidies for farmers, FPOs, and women SHGs. Wingspann Global assists all customers with the complete documentation, subsidy paperwork, and compliance requirements to ensure a smooth application process."
  },
  {
    question: "What is the delivery/lead time after placing an order?",
    answer: "Standard drone models typically ship within 3 to 4 weeks after order confirmation. Custom configurations or bulk fleet orders may take 6 to 8 weeks depending on the exact specifications, payload integrations, and order volume. Our team will provide a detailed delivery timeline at the time of quotation."
  }
];

function ProductsPage() {
  return (
    <>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(120px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-120px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-drift-right {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(16px); }
        }
        @keyframes slide-drift-left {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(-16px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.80; transform: scale(1.08); }
        }
        .drone-slide-r {
          animation: slide-in-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) both,
                     slide-drift-right 6s ease-in-out infinite 1.2s;
        }
        .drone-slide-l {
          animation: slide-in-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) both,
                     slide-drift-left 6s ease-in-out infinite 1.2s;
        }
        .hero-glow  { animation: glow-pulse 5s ease-in-out infinite; }
      `}</style>

      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-white pt-24 pb-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-500 mb-6">
              <span className="w-6 h-px bg-indigo-400" />
              Hardware
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
              Industrial UAV
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#6366f1,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                platforms
              </span>
              ,<br />
              engineered end-to-end.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              Four mission-tuned airframes — pick the platform that matches your environment,
              payload and range.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Products List ── */}
      {products.map((p, index) => {
        const isEven = index % 2 === 0;
        const bgColor = isEven ? "bg-white" : "bg-gray-50";
        const slideClass = isEven ? "drone-slide-r" : "drone-slide-l";
        const orderImgClass = isEven ? "order-2 lg:order-2" : "order-2 lg:order-1";
        const orderTextClass = isEven ? "order-1 lg:order-1" : "order-1 lg:order-2";

        // Define theme-specific colors
        let accentTextClass = "text-indigo-500";
        let lineBgClass = "bg-indigo-400";
        let titleGradient = "linear-gradient(90deg,#6366f1,#a855f7)";
        let btnBgClass = "bg-indigo-500 hover:bg-indigo-600";
        let viewBtnClass =
          "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-bold";
        let badgeAccentClass = "text-indigo-500";
        let badgeAccentClass2 = "text-green-500";
        let glowColor = "rgba(99,102,241,0.12)";
        let shadowColor = "rgba(99,102,241,0.20)";

        if (p.name === "Sentinel-S Survey") {
          accentTextClass = "text-blue-600";
          lineBgClass = "bg-blue-500";
          titleGradient = "linear-gradient(90deg,#3b82f6,#06b6d4)";
          btnBgClass = "bg-blue-500 hover:bg-blue-600";
          viewBtnClass = "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold";
          badgeAccentClass = "text-blue-500";
          badgeAccentClass2 = "text-cyan-500";
          glowColor = "rgba(59,130,246,0.12)";
          shadowColor = "rgba(59,130,246,0.20)";
        } else if (p.name === "Coming Soon") {
          accentTextClass = "text-purple-650";
          lineBgClass = "bg-purple-500";
          titleGradient = "linear-gradient(90deg,#8b5cf6,#d946ef)";
          btnBgClass = "bg-purple-500 hover:bg-purple-600";
          viewBtnClass = "border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold";
          badgeAccentClass = "text-purple-550";
          badgeAccentClass2 = "text-pink-500";
          glowColor = "rgba(139,92,246,0.12)";
          shadowColor = "rgba(139,92,246,0.20)";
        } else if (p.name === "AgriPro Spray") {
          accentTextClass = "text-green-600";
          lineBgClass = "bg-green-500";
          titleGradient = "linear-gradient(90deg,#16a34a,#65a30d)";
          btnBgClass = "bg-green-500 hover:bg-green-600";
          viewBtnClass = "border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold";
          badgeAccentClass = "text-green-500";
          badgeAccentClass2 = "text-lime-600";
          glowColor = "rgba(34,197,94,0.12)";
          shadowColor = "rgba(34,197,94,0.20)";
        } else if (p.name === "Atlas Heavy-Lift") {
          accentTextClass = "text-amber-600";
          lineBgClass = "bg-amber-500";
          titleGradient = "linear-gradient(90deg,#d97706,#ea580c)";
          btnBgClass = "bg-amber-500 hover:bg-amber-600";
          viewBtnClass = "border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold";
          badgeAccentClass = "text-amber-600";
          badgeAccentClass2 = "text-orange-500";
          glowColor = "rgba(245,158,11,0.12)";
          shadowColor = "rgba(245,158,11,0.20)";
        }

        // Adjust names and tags to look neat
        const displayTag = p.tagline;
        const displayName = p.name.split(" ")[0];
        const displaySubtitle = p.name.split(" ").slice(1).join(" ");

        // Custom badges based on drone
        let badge1Label = "Platform";
        let badge1Value = p.name;
        let badge2Label = "Spec";
        let badge2Value = p.payload;

        if (p.name === "THE THIRD EYE") {
          badge1Label = "Flagship";
          badge1Value = "The Third Eye UAV";
          badge2Label = "Max Flight";
          badge2Value = "55 min";
        } else if (p.name === "Sentinel-S Survey") {
          badge1Label = "Survey";
          badge1Value = "Sentinel-S";
          badge2Label = "Max Flight";
          badge2Value = "60 min";
        } else if (p.name === "Coming Soon") {
          badge1Label = "Status";
          badge1Value = "Coming Soon";
          badge2Label = "Max Flight";
          badge2Value = "30 min";
        } else if (p.name === "AgriPro Spray") {
          badge1Label = "Platform";
          badge1Value = "AgriPro Spray";
          badge2Label = "Payload";
          badge2Value = "16 kg tank";
        } else if (p.name === "Atlas Heavy-Lift") {
          badge1Label = "Cargo";
          badge1Value = "Atlas Heavy-Lift";
          badge2Label = "Max Capacity";
          badge2Value = "25 kg";
        }

        // Dynamic image
        const imgSource = p.name === "THE THIRD EYE" ? heroDrone : p.img;

        return (
          <section
            key={p.name}
            className={`relative overflow-hidden ${bgColor} min-h-[520px] flex items-center border-b border-gray-100`}
          >
            {/* Corner radial */}
            <div
              className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-[520px] h-[520px] pointer-events-none`}
              style={{
                background: `radial-gradient(ellipse at top ${isEven ? "left" : "right"}, ${glowColor.replace("0.12", "0.08")} 0%, transparent 65%)`,
              }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-12 items-center">
              {/* ── Image Block ── */}
              <div className={`relative flex items-center justify-center ${orderImgClass} w-full`}>
                <div
                  className="hero-glow absolute w-[400px] h-[400px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Sliding Wrapper */}
                <div className={`${slideClass} relative z-10 w-full max-w-[480px]`}>
                  <img
                    src={imgSource}
                    alt={p.name}
                    className="w-full object-contain"
                    style={{ filter: `drop-shadow(0 8px 32px ${shadowColor})` }}
                  />
                  {/* Badge top */}
                  <div
                    className={`absolute -top-4 ${isEven ? "-right-4" : "-left-4"} z-20 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-gray-900 text-xs font-semibold shadow-md`}
                  >
                    <div
                      className={`${badgeAccentClass} text-[10px] uppercase tracking-widest mb-1`}
                    >
                      {badge1Label}
                    </div>
                    {badge1Value}
                  </div>
                  {/* Badge bottom */}
                  <div
                    className={`absolute -bottom-4 ${isEven ? "-left-4" : "-right-4"} z-20 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-gray-900 text-xs font-semibold shadow-md`}
                  >
                    <div
                      className={`${badgeAccentClass2} text-[10px] uppercase tracking-widest mb-1`}
                    >
                      {badge2Label}
                    </div>
                    {badge2Value}
                  </div>
                </div>
              </div>

              {/* ── Text Block ── */}
              <div className={orderTextClass}>
                <Reveal>
                  {p.name !== "Coming Soon" && (
                    <span
                      className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase ${accentTextClass} mb-6`}
                    >
                      <span className={`w-6 h-px ${lineBgClass}`} />
                      {displayTag}
                    </span>
                  )}
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
                    {displayName}
                    <br />
                    <span
                      style={{
                        background: titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {displaySubtitle || "platform"}
                    </span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-10">
                    {p.name === "THE THIRD EYE" &&
                      "Flagship quadcopter engineered for inspection, mapping, and persistence surveillance."}
                    {p.name === "Sentinel-S Survey" &&
                      "Precision fixed-wing platform designed for high-resolution topographic and GIS mapping."}
                    {p.name === "Coming Soon" &&
                      "Ultra-light 2-inch cinematic FPV drone equipped with the Avatar Moonlight Kit for true 4K starlight footage and gyroflow stabilization."}
                    {p.name === "AgriPro Spray" &&
                      "16 kg tank capacity, NDVI multispectral mapping and prescription spray missions — reduce chemical inputs by up to 60%."}
                    {p.name === "Atlas Heavy-Lift" &&
                      "Robust multirotor built for logistics, construction support, and heavy payload industrial cargo delivery."}
                  </p>
                  {p.name === "Coming Soon" ? (
                    <div className="pt-2 mb-8">
                      <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-600 text-xs font-extrabold px-5 py-2.5 rounded-xl uppercase tracking-widest">
                        ✨ Launching Soon
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 mb-12">
                      <Link
                        to="/contact"
                        className={`inline-flex items-center gap-2 ${btnBgClass} text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors`}
                      >
                        Request Quote <ArrowUpRight size={16} />
                      </Link>
                      <Link
                        to={p.slug}
                        className={`inline-flex items-center gap-2 ${viewBtnClass} text-sm px-6 py-3 rounded-xl transition-colors`}
                      >
                        View Product <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  )}
                  {/* Stats */}
                  {p.name !== "Coming Soon" && (
                    <div className="flex gap-8">
                      {[
                        [p.flight, "Flight Time"],
                        [p.payload, "Payload"],
                        [p.range, "Range"],
                      ].map(([val, label]) => (
                        <div key={label}>
                          <div className="text-2xl font-black text-gray-900">{val}</div>
                          <div className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <FAQSection items={productFAQs} accentColor="indigo" />
    </>
  );
}
