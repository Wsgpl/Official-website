
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Reveal } from "../components/site/Reveal";
import { FAQSection } from "../components/site/FAQSection";
import { Star } from "lucide-react";
import servicesHero from "../assets/fixing-drone-maintenance-shop.jpg";
import mappingBg from "../assets/mapping.png";
import agriBg from "../assets/agri.jpg";
import printBg from "../assets/3D1.webp";
import droneBg from "../assets/3Rd eye.jpg";
import heroBg from "../assets/hero-drone.jpg";
import infraBg from "../assets/infra.jpg";
import maintenanceBg from "../assets/fixing-drone-maintenance-shop.jpg";
import adfBg from "../assets/adf22399-40e9-4045-826a-a5acc1de6686.jpg";
import servBg from "../assets/serv.jpg";
import warroomsImg from "../assets/Warrooms.jpg";

export default ServicesPage;


// ─── Icons ───────────────────────────────────────────────────────────────────

const DroneManufacturingIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <circle cx="26" cy="26" r="6" fill="#6366f1" opacity="0.85" />
    <circle cx="26" cy="26" r="10" stroke="#6366f1" strokeWidth="0.8" opacity="0.25" />
    <line x1="26" y1="16" x2="26" y2="7" stroke="#d0d0e8" strokeWidth="2.5" strokeLinecap="round" />
    <line
      x1="26"
      y1="36"
      x2="26"
      y2="45"
      stroke="#d0d0e8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line x1="16" y1="26" x2="7" y2="26" stroke="#d0d0e8" strokeWidth="2.5" strokeLinecap="round" />
    <line
      x1="36"
      y1="26"
      x2="45"
      y2="26"
      stroke="#d0d0e8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <ellipse
      cx="26"
      cy="6"
      rx="7"
      ry="2.5"
      fill="#e8e8f8"
      stroke="#6366f1"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <ellipse
      cx="26"
      cy="46"
      rx="7"
      ry="2.5"
      fill="#e8e8f8"
      stroke="#6366f1"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <ellipse
      cx="6"
      cy="26"
      rx="2.5"
      ry="7"
      fill="#e8e8f8"
      stroke="#6366f1"
      strokeWidth="0.8"
      opacity="0.7"
    />
    <ellipse
      cx="46"
      cy="26"
      rx="2.5"
      ry="7"
      fill="#e8e8f8"
      stroke="#6366f1"
      strokeWidth="0.8"
      opacity="0.7"
    />
  </svg>
);

const SurveyIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <ellipse cx="26" cy="26" rx="20" ry="14" stroke="#2a8a4a" strokeWidth="0.8" opacity="0.35" />
    <ellipse cx="26" cy="26" rx="13" ry="9" stroke="#2a8a4a" strokeWidth="0.8" opacity="0.5" />
    <ellipse cx="26" cy="26" rx="7" ry="4.5" stroke="#2a8a4a" strokeWidth="0.8" opacity="0.7" />
    <ellipse cx="26" cy="26" rx="2.5" ry="1.5" fill="#2a8a4a" opacity="0.9" />
    <line
      x1="26"
      y1="10"
      x2="26"
      y2="18"
      stroke="#6366f1"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <line
      x1="26"
      y1="34"
      x2="26"
      y2="42"
      stroke="#6366f1"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <line
      x1="10"
      y1="26"
      x2="18"
      y2="26"
      stroke="#6366f1"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <line
      x1="34"
      y1="26"
      x2="42"
      y2="26"
      stroke="#6366f1"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <line
      x1="8"
      y1="34"
      x2="44"
      y2="34"
      stroke="#6366f1"
      strokeWidth="0.7"
      strokeDasharray="3 3"
      opacity="0.3"
    />
  </svg>
);

const InspectionIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <rect
      x="22"
      y="10"
      width="8"
      height="34"
      rx="2"
      fill="#f4ede8"
      stroke="#d8b8a8"
      strokeWidth="0.8"
    />
    <line
      x1="18"
      y1="18"
      x2="34"
      y2="18"
      stroke="#c8a898"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="26"
      x2="34"
      y2="26"
      stroke="#c8a898"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="34"
      x2="34"
      y2="34"
      stroke="#c8a898"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M16 20 Q26 12 36 20"
      stroke="#e06830"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      opacity="0.65"
    />
    <path
      d="M12 24 Q26 8 40 24"
      stroke="#e06830"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.35"
    />
    <circle cx="26" cy="17" r="3.5" fill="#e06830" opacity="0.85" />
    <circle cx="26" cy="17" r="5.5" stroke="#e06830" strokeWidth="0.7" fill="none" opacity="0.35" />
    <rect
      x="14"
      y="44"
      width="24"
      height="4"
      rx="1.5"
      fill="#f0e8e0"
      stroke="#d8c8b8"
      strokeWidth="0.8"
    />
  </svg>
);

const AgricultureIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <rect
      x="6"
      y="6"
      width="40"
      height="40"
      rx="3"
      fill="none"
      stroke="#c0d8b0"
      strokeWidth="0.8"
    />
    <rect x="7" y="7" width="12" height="12" rx="1" fill="#d8f0c0" opacity="0.9" />
    <rect x="20" y="7" width="12" height="12" rx="1" fill="#90cc60" opacity="0.85" />
    <rect x="33" y="7" width="12" height="12" rx="1" fill="#c8e870" opacity="0.9" />
    <rect x="7" y="20" width="12" height="12" rx="1" fill="#80c050" opacity="0.85" />
    <rect x="20" y="20" width="12" height="12" rx="1" fill="#50a830" opacity="0.9" />
    <rect x="33" y="20" width="12" height="12" rx="1" fill="#e8e050" opacity="0.9" />
    <rect x="7" y="33" width="12" height="12" rx="1" fill="#c0e090" opacity="0.85" />
    <rect x="20" y="33" width="12" height="12" rx="1" fill="#d8f0a0" opacity="0.85" />
    <rect x="33" y="33" width="12" height="12" rx="1" fill="#c86830" opacity="0.8" />
    <circle cx="15" cy="4" r="1.5" fill="#6366f1" opacity="0.6" />
    <circle cx="26" cy="3" r="1.5" fill="#6366f1" opacity="0.6" />
    <circle cx="38" cy="4" r="1.5" fill="#6366f1" opacity="0.6" />
    <line x1="15" y1="5" x2="15" y2="7" stroke="#6366f1" strokeWidth="0.8" opacity="0.4" />
    <line x1="26" y1="4" x2="26" y2="7" stroke="#6366f1" strokeWidth="0.8" opacity="0.4" />
    <line x1="38" y1="5" x2="38" y2="7" stroke="#6366f1" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const DaaSIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <path
      d="M12 34 Q6 34 6 27 Q6 20 14 20 Q16 14 22 14 Q26 10 32 13 Q38 10 41 16 Q47 16 47 23 Q47 30 41 31 Z"
      fill="#f4f0fe"
      stroke="#c8b8f0"
      strokeWidth="0.8"
    />
    <line
      x1="26"
      y1="36"
      x2="26"
      y2="25"
      stroke="#6366f1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 29 L26 24 L31 29"
      stroke="#6366f1"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="28" r="1.5" fill="#6366f1" opacity="0.4" />
    <circle cx="34" cy="28" r="1.5" fill="#6366f1" opacity="0.4" />
    <rect
      x="16"
      y="40"
      width="20"
      height="9"
      rx="4"
      fill="#ede8fe"
      stroke="#c8b8f0"
      strokeWidth="0.8"
    />
    <text
      x="26"
      y="47.5"
      textAnchor="middle"
      fontSize="7"
      fill="#6366f1"
      fontFamily="sans-serif"
      fontWeight="700"
    >
      DaaS
    </text>
  </svg>
);

const PrintingIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <polygon
      points="26,7 42,16 26,25 10,16"
      fill="#fef8e8"
      stroke="#d4b840"
      strokeWidth="0.8"
      opacity="0.9"
    />
    <polygon
      points="42,16 42,30 26,39 26,25"
      fill="#fef0c0"
      stroke="#d4b840"
      strokeWidth="0.8"
      opacity="0.85"
    />
    <polygon
      points="10,16 26,25 26,39 10,30"
      fill="#fdf8d8"
      stroke="#d4b840"
      strokeWidth="0.8"
      opacity="0.85"
    />
    <line x1="10" y1="21" x2="26" y2="30" stroke="#d4b840" strokeWidth="0.6" opacity="0.5" />
    <line x1="10" y1="25" x2="26" y2="34" stroke="#d4b840" strokeWidth="0.6" opacity="0.5" />
    <rect x="20" y="35" width="12" height="5" rx="1.5" fill="#6366f1" opacity="0.65" />
    <line
      x1="26"
      y1="40"
      x2="26"
      y2="46"
      stroke="#a0a2f8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 1.5"
    />
    <circle cx="26" cy="47" r="2" fill="#6366f1" opacity="0.75" />
    <circle cx="26" cy="47" r="3.5" stroke="#6366f1" strokeWidth="0.6" fill="none" opacity="0.35" />
  </svg>
);

const PrototypingIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <rect
      x="8"
      y="8"
      width="36"
      height="36"
      rx="4"
      fill="#f0fafa"
      stroke="#b0dada"
      strokeWidth="0.8"
    />
    <path
      d="M14 26 L20 26 L20 18 L28 18"
      stroke="#1a8a78"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.65"
    />
    <path
      d="M28 34 L36 34 L36 26 L28 26"
      stroke="#1a8a78"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.65"
    />
    <line
      x1="16"
      y1="34"
      x2="24"
      y2="34"
      stroke="#1a8a78"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.4"
    />
    <line
      x1="28"
      y1="18"
      x2="36"
      y2="18"
      stroke="#1a8a78"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.4"
    />
    <rect x="22" y="21" width="8" height="10" rx="1.5" fill="#1a8a78" opacity="0.75" />
    <line
      x1="22"
      y1="24.5"
      x2="19"
      y2="24.5"
      stroke="#1a8a78"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    <line
      x1="22"
      y1="27.5"
      x2="19"
      y2="27.5"
      stroke="#1a8a78"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    <line
      x1="30"
      y1="24.5"
      x2="33"
      y2="24.5"
      stroke="#1a8a78"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    <line
      x1="30"
      y1="27.5"
      x2="33"
      y2="27.5"
      stroke="#1a8a78"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    <circle cx="14" cy="26" r="2" fill="#6366f1" opacity="0.8" />
    <circle cx="28" cy="34" r="2" fill="#6366f1" opacity="0.8" />
  </svg>
);

const UAVIcon = () => (
  <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
    <path
      d="M6 26 Q14 18 26 17 Q38 18 46 26 Q38 34 26 35 Q14 34 6 26Z"
      fill="#fdf0fe"
      stroke="#d8b0e8"
      strokeWidth="0.8"
    />
    <path
      d="M20 22 L10 13 L14 22"
      stroke="#c060d8"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
    <path
      d="M32 22 L42 13 L38 22"
      stroke="#c060d8"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
    <path
      d="M20 30 L10 39 L14 30"
      stroke="#c060d8"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
    <path
      d="M32 30 L42 39 L38 30"
      stroke="#c060d8"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.75"
    />
    <ellipse cx="26" cy="26" rx="5" ry="4" fill="#6366f1" opacity="0.7" />
    <circle cx="46" cy="26" r="2" fill="#c060d8" opacity="0.5" />
    <line
      x1="48"
      y1="26"
      x2="52"
      y2="26"
      stroke="#c060d8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="1.5 1.5"
      opacity="0.5"
    />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Drone Manufacturing",
    summary:
      "Carbon-fiber airframes, custom payload bays and production-grade assembly with full MIL-STD traceability.",
    details:
      "Our state-of-the-art manufacturing facilities produce industrial-grade, carbon-fiber airframes engineered for maximum endurance and reliability. We specialize in custom payload bays and perform rigorous production-grade assembly. Every unit we build is subjected to full MIL-STD traceability and quality assurance, ensuring that your fleet can operate flawlessly in the most demanding enterprise environments.",
    tag: "Manufacturing",
    tagColor: "#3b82f6",
    img: maintenanceBg,
    slug: "/services/drone-manufacturing",
  },
  {
    title: "Drone Survey & Mapping",
    summary:
      "RTK/PPK workflows delivering centimeter-grade orthomosaics, DSM/DTM, contour lines and 3D meshes.",
    details:
      "Unlock unparalleled geospatial precision with our advanced surveying workflows. Utilizing RTK/PPK technology, we deliver centimeter-grade orthomosaics, highly accurate DSM/DTM models, contour lines, and immersive 3D meshes. Whether for construction, mining, or urban planning, our mapping solutions provide the reliable data you need to make critical project decisions faster and more accurately.",
    tag: "Survey",
    tagColor: "#22c55e",
    img: mappingBg,
    slug: "/services/drone-survey-mapping",
  },
  {
    title: "Infrastructure Inspection",
    summary:
      "RGB + thermal + LiDAR inspection of towers, bridges, dams and turbines. No scaffolding, no outage.",
    details:
      "Transform how you manage critical assets with our non-destructive, aerial inspection services. We deploy specialized drones equipped with RGB, high-resolution thermal, and LiDAR sensors to inspect telecommunication towers, bridges, dams, and wind turbines. Identify structural anomalies instantly without the need for dangerous scaffolding or costly operational outages.",
    tag: "Inspection",
    tagColor: "#f97316",
    img: infraBg,
    slug: "/services/infrastructure-inspection",
  },
  {
    title: "Agriculture Solutions",
    summary:
      "NDVI multispectral analysis, precision spraying and variable-rate seeding reducing inputs by up to 60%.",
    details:
      "Maximize your crop yield and reduce waste with our precision agriculture solutions. We provide comprehensive NDVI multispectral analysis to assess crop health down to the square meter. Our intelligent drone systems execute precision spraying and variable-rate seeding missions autonomously, dramatically reducing chemical inputs by up to 60% while boosting overall farm profitability.",
    tag: "Agriculture",
    tagColor: "#84cc16",
    img: agriBg,
    slug: "/services/agriculture-solutions",
  },
  {
    title: "Drone-as-a-Service",
    summary:
      "Skip CapEx. Certified pilots, fully-insured fleets and turnkey data delivery on recurring or project basis.",
    details:
      "Scale your drone operations without the heavy capital expenditure. Our Drone-as-a-Service (DaaS) model provides you with certified, highly-trained pilots, fully-insured fleets, and turnkey data delivery. Whether you need ongoing recurring flights or specialized one-off project support, we handle the logistics, maintenance, and compliance so you can focus on the results.",
    tag: "DaaS",
    tagColor: "#8b5cf6",
    img: droneBg,
    slug: "/services/drone-as-a-service",
  },
  {
    title: "3D Printing Services",
    summary:
      "Industrial FDM, SLA, SLS and DMLS CFR-Nylon, ULTEM, PEEK and titanium. STL to part in 48 hours.",
    details:
      "Accelerate your hardware development with our industrial additive manufacturing services. We offer high-precision FDM, SLA, SLS, and DMLS printing using advanced engineering materials like CFR-Nylon, ULTEM, PEEK, and aerospace-grade titanium. From initial concept STL files to functional, production-ready parts in your hands in under 48 hours.",
    tag: "Additive",
    tagColor: "#eab308",
    img: printBg,
    slug: "/services/3d-printing-services",
  },
  {
    title: "Rapid Prototyping",
    summary:
      "Hardware ideas to flying prototypes in days. Mechanical, electronics, firmware and flight-test in one team.",
    details:
      "Turn your hardware ideas into flying realities at unprecedented speeds. Our rapid prototyping division houses mechanical engineers, electronics experts, firmware developers, and flight-test technicians all under one roof. We seamlessly guide your project from initial CAD sketches through rigorous flight testing, reducing your time-to-market by months.",
    tag: "R&D",
    tagColor: "#14b8a6",
    img: heroBg,
    slug: "/services/rapid-prototyping",
  },
  {
    title: "Custom UAV Development",
    summary:
      "Bespoke airframes for confined-space, extreme cold, high altitude, or unique payloads spec to certification.",
    details:
      "When off-the-shelf drones simply won't cut it, we engineer bespoke aerial solutions tailored to your exact mission parameters. We build specialized airframes designed for confined-space navigation, extreme cold-weather operations, high-altitude flights, or entirely unique payload integrations. We manage the entire lifecycle from initial specification to final regulatory certification.",
    tag: "Custom",
    tagColor: "#d946ef",
    img: droneBg,
    slug: "/services/custom-uav-development",
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl hover:bg-white/90 hover:dark:bg-slate-900/90 transition-all duration-300 flex flex-col">
        {/* Image area */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.15) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Badge */}
          <span
            className="inline-flex self-start items-center text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: service.tagColor + "18", color: service.tagColor }}
          >
            {service.tag}
          </span>

          {/* Title */}
          <h3 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight leading-snug mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-gray-500 dark:text-slate-350 leading-relaxed flex-1">{service.summary}</p>

          {/* Explore button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-1 mt-5 text-[13px] font-semibold transition-colors w-fit"
            style={{ color: service.tagColor }}
          >
            Explore &rarr;
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-8 mt-2">
              <div className="w-full md:w-2/5 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-inner">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span
                  className="inline-flex self-start items-center text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                  style={{ background: service.tagColor + "18", color: service.tagColor }}
                >
                  {service.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                  {service.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  {service.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const serviceFAQs = [
  {
    question: "What after-sales services does Wingspann Global provide?",
    answer: "We offer comprehensive after-sales support including repair and maintenance, Annual Maintenance Contracts (AMC), genuine spare parts supply, regular firmware updates, pilot training, and on-site technical support to ensure minimal downtime for your fleet."
  },
  {
    question: "Do you offer pilot training or DGCA Remote Pilot Certificate (RPC) preparation?",
    answer: "Yes, we partner with DGCA-authorized Remote Pilot Training Organizations (RPTOs) to provide structured drone pilot training. We assist our clients in completing their training and successfully acquiring their Remote Pilot Certificate (RPC), which is legally required for operating drones commercially in India."
  },
  {
    question: "What is your average service/repair turnaround time?",
    answer: "Most minor repairs and servicing are completed within 3 to 5 business days, subject to parts availability. For enterprise clients under an AMC plan, we offer priority repair turnaround times within 24 to 48 hours to ensure business continuity."
  },
  {
    question: "Do you provide long-term spare parts support?",
    answer: "Yes, we guarantee a minimum of 5 years of spare parts support and availability after the purchase of any Wingspann drone model, ensuring long-term serviceability and ROI for your investment."
  },
  {
    question: "Is on-site or field service available?",
    answer: "Yes, on-site field service and technical support are available for enterprise clients and bulk fleet operators. We provide field support across major operational zones in India, particularly for agricultural spraying operations and large-scale industrial inspection projects."
  },
  {
    question: "What does an AMC (Annual Maintenance Contract) cover?",
    answer: "Our AMC packages cover scheduled periodic maintenance, free firmware updates, priority service requests, discounts on spare parts, and on-site troubleshooting. Detailed inclusions can be tailored based on your fleet size and application. Contact us for plan details and pricing."
  },
  {
    question: "How much area can your drones cover in a day of operation?",
    answer: "An agricultural drone like the AgriPro Spray (16-litre payload) can cover approximately 6 to 10 acres per hour. In a standard day of operation, a single drone can comfortably cover 40 to 60 acres, depending on field geometry, batteries, and weather conditions."
  }
];

function ServicesPage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  const heroText1 = "End-to-end programs for";
  const heroText2 = "autonomy & manufacturing.";

  const words1 = heroText1.split(" ");
  const words2 = heroText2.split(" ");

  useEffect(() => {
    if (!heroTextRef.current) return;
    const chars = heroTextRef.current.querySelectorAll(".about-char");

    gsap.fromTo(
      chars,
      { y: 50, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        transformOrigin: "bottom center",
      }
    );
  }, []);

  return (
    <>
      <section
        className="relative pt-32 pb-16 md:pt-48 md:pb-24 min-h-[70vh] flex flex-col justify-center bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${adfBg})` }}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 relative z-10 max-w-5xl text-left">
          <Reveal>
            <h1
              ref={heroTextRef}
              className="font-sans text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold leading-[1.15] tracking-tight text-white flex flex-col gap-1.5 select-none text-left"
            >
              <div className="flex flex-wrap gap-x-[0.25em]">
                {words1.map((word, wIdx) => (
                  <span key={`w1-${wIdx}`} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                      <span key={`c1-${cIdx}`} className="about-char inline-block origin-center">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-[0.25em]">
                {words2.map((word, wIdx) => (
                  <span key={`w2-${wIdx}`} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                      <span key={`c2-${cIdx}`} className="about-char inline-block origin-center">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </h1>
          </Reveal>


        </div>
      </section>

      {/* Overview & Grid */}
      <section className="py-20 relative overflow-hidden bg-slate-950">
        {/* Background Image with Subtle Shadow Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={servBg}
            alt="Services background"
            className="w-full h-full object-cover object-right pointer-events-none select-none brightness-[0.75] contrast-[1.05]"
          />
          {/* Subtle shadowy overlay - keeps background image clear & colorful while ensuring text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header Banner in circled area */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                8+ Specialized Industrial Services. <br className="hidden sm:inline" />
                Turnkey UAV Solutions &amp; Tactical War Rooms.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-slate-100 text-base md:text-lg font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Wingspann provides an end-to-end aerial intelligence and manufacturing ecosystem. From custom UAV airframe engineering, AI LiDAR mapping, and precision agriculture to additive 3D printing, Drone-as-a-Service, and live multi-feed <strong className="text-white font-bold">War Room Command Centers</strong> — explore our service cards below and scroll down to discover our full War Room setup.
              </p>
            </Reveal>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WAR ROOM COMMAND & CONTROL SECTION ── */}
      <WarRoomSection />

      <FAQSection items={serviceFAQs} accentColor="indigo" />
    </>
  );
}

function WarRoomSection() {
  return (
    <section id="war-room" className="py-24 bg-white text-gray-900 overflow-hidden relative border-t border-gray-200/60">
      {/* Anchor for legacy link compatibility */}
      <div id="warrooms" className="absolute -top-10 left-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <Reveal>
            <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold tracking-[0.16em] uppercase text-amber-600 mb-3">
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes jumping-words {
                  0%, 100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-6px);
                  }
                }
              ` }} />
              {["Command", "&", "Control"].map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block"
                  style={{
                    animation: "jumping-words 1.6s ease-in-out infinite",
                    animationDelay: `${idx * 0.15}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              War Room real-time command centers built around your drone feed.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              We design and set up dedicated command rooms that pull live video from your drone
              fleet, thermal and CCTV sources onto one video wall overlaid on GIS maps so
              incident commanders, police, fire and disaster-response teams see the same live
              picture and act on it together.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Illustration & Side Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Command room illustration */}
          {/* Command room image card */}
          <Reveal delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 aspect-[4/3] bg-slate-900">
              <img
                src={warroomsImg}
                alt="Command War Room"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right Text */}
          <Reveal delay={0.2}>
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
                One room, every feed, one picture.
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Instead of teams watching separate screens, every drone, camera and map layer
                streams into a single operational view. Built on the same situational-awareness
                model used by disaster response agencies live optical and thermal feeds
                overlaid on GIS maps, hazard zones and unit positions, shared with every
                responding agency at once.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Fixed installations for permanent operations centers, or rapid-deploy mobile
                units for field command posts during an active incident.
              </p>
            </div>
          </Reveal>
        </div>

        {/* 6 Features Grid */}
        <div className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Live Feed Aggregation",
                desc: "Multiple drone, thermal and CCTV streams pulled onto one video wall in real time.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <rect x="4" y="10" width="40" height="24" rx="2" /><path d="M4 34h40M18 40h12" /><circle cx="14" cy="20" r="3" /><circle cx="24" cy="20" r="3" /><circle cx="34" cy="20" r="3" />
                  </svg>
                ),
              },
              {
                title: "GIS & Map Overlay",
                desc: "Hazard zones, unit positions and flight paths mapped live alongside video feeds.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <path d="M24 4 L44 14 L44 30 L24 44 L4 30 L4 14 Z" /><circle cx="24" cy="24" r="6" />
                  </svg>
                ),
              },
              {
                title: "Multi-Agency Access",
                desc: "Police, fire, disaster-management and health teams view the same live picture at once.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <circle cx="16" cy="16" r="6" /><circle cx="34" cy="16" r="6" /><circle cx="24" cy="36" r="6" /><path d="M16 22v6M34 22v6M22 34l-4-4M28 34l4-4" />
                  </svg>
                ),
              },
              {
                title: "Thermal & Night Feeds",
                desc: "Low-light and thermal channels for search-and-rescue and after-dark operations.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <circle cx="24" cy="24" r="16" /><path d="M24 16v8l6 4" />
                  </svg>
                ),
              },
              {
                title: "Incident Logging & Playback",
                desc: "Every feed timestamped and recorded, ready for after-action review or evidence.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <rect x="8" y="8" width="32" height="32" rx="2" /><path d="M16 24h16M16 18h10M16 30h8" />
                  </svg>
                ),
              },
              {
                title: "Rapid-Deploy Mobile Unit",
                desc: "A trailer or vehicle-mounted command post that reaches the field within the hour.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-indigo-600">
                    <rect x="12" y="6" width="24" height="36" rx="3" /><path d="M20 38h8" />
                  </svg>
                ),
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group h-full">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Usecases tags */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-3 mb-14">
            {[
              "Disaster Response",
              "Law Enforcement & Security",
              "Large Public Events",
              "Perimeter & Border Surveillance",
              "Industrial Site Monitoring",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide border border-gray-900/80 text-gray-900 px-4 py-2.5 rounded-lg bg-gray-50/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTA bar */}
        <Reveal delay={0.35}>
          <div className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-gray-600 text-base max-w-lg font-medium leading-relaxed">
              Tell us the scale of your operations centre a fixed installation, a mobile unit,or both  and we'll scope a War Room for your team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-amber-600 text-white font-mono text-xs uppercase tracking-wider font-semibold px-7 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Request a War Room Consultation</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
