import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Plane,
  Cpu,
  Layers,
  Shield,
  Award,
  Users,
  Target,
  ArrowUpRight,
  Lightbulb,
  Globe,
  Leaf,
  Handshake,
  Scale,
  ClipboardCheck,
  Zap,
  Star,
} from "lucide-react";

import printingHero from "../assets/printing-hero.jpg";
import businessBg from "../assets/Business.jpg";
import contactImage from "../assets/Contact.jpeg";
import if2 from "../assets/if2.jpeg";
import if3 from "../assets/if3.jpeg";
import if4 from "../assets/if4.jpeg";
import if5 from "../assets/if5.jpeg";
import if6 from "../assets/if6.jpeg";
import hqImage from "../assets/hq.jpeg";
import aboutBg from "../assets/aboutt.jpg";
import { Reveal } from "../components/site/Reveal";
import { SectionHeader } from "../components/site/SectionHeader";

import valPrecision from "../assets/val-precision.jpg";
import valInnovation from "../assets/val-innovation.jpg";
import valSafety from "../assets/val-safety.jpg";
import valGlobal from "../assets/val-global.jpg";
import valSustainability from "../assets/val-sustainability.jpg";
import valCollaboration from "../assets/val-collaboration.jpg";
import valIntegrity from "../assets/val-integrity.jpg";
import valAccountability from "../assets/val-accountability.jpg";
import valResilience from "../assets/val-resilience.jpg";
import valExcellence from "../assets/val-excellence.jpg";

export default AboutPage;


const coreValues = [
  { icon: Target, title: "Precision", subtitle: "Every Micron matters", image: valPrecision },
  { icon: Lightbulb, title: "Innovation", subtitle: "Pushing boundaries, redefining flights", image: valInnovation },
  { icon: Shield, title: "Safety", subtitle: "Protecting lives, missions and trust", image: valSafety },
  { icon: Globe, title: "Global Vision", subtitle: "Connecting skies, Visiting World.", image: valGlobal },
  { icon: Leaf, title: "Sustainability", subtitle: "Engineers with Earth in mind.", image: valSustainability },
  { icon: Handshake, title: "Collaboration", subtitle: "Greatness is a team Sport.", image: valCollaboration },
  { icon: Scale, title: "Integrity", subtitle: "Doing what is right every time.", image: valIntegrity },
  { icon: ClipboardCheck, title: "Accountability", subtitle: "Owning outcomes, delivering results", image: valAccountability },
  { icon: Zap, title: "Resilience", subtitle: "Failure is not an option.", image: valResilience },
  { icon: Award, title: "Excellence", subtitle: "Above Expectations, beyond limits.", image: valExcellence },
];

const infrastructureImages = [
  {
    url: if2,
    alt: "Advanced UAV Assembly Line",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    url: if5,
    alt: "R&D Engineering Hub",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    url: hqImage,
    alt: "Corporate Headquarters",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    url: if3,
    alt: "Aerospace Composites Lab",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    url: if6,
    alt: "Autonomous Systems Workshop",
    className: "md:col-span-2 md:row-span-1",
  },
];

function AboutPage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);


  const heroText = "Built for the Skies of Tomorrow";
  const words = heroText.split(" ");

  useEffect(() => {
    if (!heroTextRef.current) return;
    const chars = heroTextRef.current.querySelectorAll(".about-char");

    gsap.set(chars, {
      opacity: 0,
      y: 40,
      scale: 1.5,
      filter: "blur(8px)",
      rotation: () => (Math.random() - 0.5) * 20,
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotation: 0,
      stagger: 0.06,
      duration: 1.4,
      ease: "power4.out",
      delay: 0.1,
    });
  }, []);

  return (
    <>
      {/* Hero Section - Lightflows Style */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[#d5dadf] min-h-[70vh] flex flex-col justify-center">
        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Card containing the background image with the header text inside it */}
          <div
            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-cover bg-center min-h-[45vh] md:min-h-[60vh] flex items-center p-8 md:p-16 lg:p-20 mb-20 shadow-md"
            style={{ backgroundImage: `url(${aboutBg})` }}
          >
            {/* Dark overlay for contrast against white text */}
            <div className="absolute inset-0 bg-black/45 mix-blend-multiply z-0 pointer-events-none" />

            <div className="relative z-10 w-full">
              <Reveal>
                <h1
                  ref={heroTextRef}
                  className="font-sans text-[4rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] font-medium leading-[1.05] tracking-tight text-white flex flex-wrap gap-x-[0.25em] select-none"
                >
                  {words.map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, cIdx) => (
                        <span key={cIdx} className="about-char inline-block origin-center">
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2}>
            {/* Image inside the hero section with padding */}
            <div className="mt-16 md:mt-24 w-full">
              <img
                src={contactImage}
                alt="Wingspann Office"
                className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 md:py-32 bg-white text-[#222222]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Heading spanning full-width */}
          <div className="border-b border-black/10 pb-10 mb-16">
            <Reveal>
              <h3 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-tight text-[#111111] leading-none">
                Vision & Mission
              </h3>
            </Reveal>
          </div>

          {/* Bottom layout: Left tagline, right detail columns */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Tagline Column */}
            <div className="lg:w-1/3 shrink-0">
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.3] font-medium tracking-tight text-[#333333] max-w-xl">
                  Redefining the future of aerospace by building intelligent, reliable, and high-performance autonomous aerial systems.
                </h2>
              </Reveal>
            </div>

            {/* Content Column */}
            <div className="lg:w-2/3">
              <Reveal delay={0.2}>
                <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                  {/* Vision Column */}
                  <div className="flex-1 space-y-4">
                    <h4 className="text-xl font-display font-semibold text-[#111111]">
                      Our Vision
                    </h4>
                    <p className="text-black/75 text-base leading-relaxed">
                      At Wingspann Global, our vision is to redefine the future of aerospace by building intelligent, reliable, and high-performance autonomous aerial systems. We aim to drive innovation in drone technology by integrating advanced engineering, AI-driven autonomy, and modern avionics to create solutions that enhance efficiency, safety, and decision-making. Through continuous innovation and a strong focus on quality, we aspire to become a trusted partner across defense, industrial, and commercial sectors, enabling the next generation of mission-ready aviation.
                    </p>
                  </div>

                  {/* Mission Column */}
                  <div className="flex-1 space-y-4">
                    <h4 className="text-xl font-display font-semibold text-[#111111]">
                      Our Mission
                    </h4>
                    <p className="text-black/75 text-base leading-relaxed">
                      Our mission is to design, develop, and deliver cutting-edge unmanned aerial systems and drone-based solutions that address real-world operational challenges. We are committed to advancing next-generation UAV technologies that are scalable, cost-effective, and performance-driven, while supporting diverse applications such as surveillance, mapping, inspection, and data acquisition. By combining technical expertise, innovation, and a growing quality-driven approach, we strive to provide reliable and efficient solutions that empower industries with actionable aerial intelligence and long-term value.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white dark:bg-slate-950/20 text-brand dark:text-white border-t border-brand/5 dark:border-white/5 overflow-hidden">
        <style>{`
          @keyframes core-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% - 1.5rem)); }
          }
          .animate-core-marquee {
            animation: core-marquee 30s linear infinite;
          }
          .marquee-container:hover .animate-core-marquee {
            animation-play-state: paused;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <SectionHeader
            eyebrow="Our Beliefs"
            title="Core Values"
            description="Our operational philosophy guides every engineering choice, flight hour, and customer partnership."
          />
        </div>

        <div className="w-full overflow-hidden marquee-container pb-12 pt-4">
          <div className="flex gap-6 w-max">
            <div className="flex shrink-0 gap-6 animate-core-marquee">
              {coreValues.map((v, i) => (
                <div
                  key={`set1-${v.title}`}
                  className="shrink-0 w-[85vw] sm:w-[360px] flex flex-col group rounded-3xl overflow-hidden border border-brand/10 dark:border-white/10 hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-slate-900"
                >
                  <div className="h-[250px] overflow-hidden relative pointer-events-none select-none">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <img src={v.image} alt={v.title} draggable={false} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none" />
                  </div>
                  <div className="p-8 flex flex-col flex-1 pointer-events-none select-none">
                    <div className="size-12 grid place-items-center rounded-2xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <v.icon size={22} />
                    </div>
                    <h3 className="font-display font-extrabold text-xl tracking-tight text-brand dark:text-white mb-3">
                      {v.title}
                    </h3>
                    <p className="text-brand/70 dark:text-white/70 text-base font-medium leading-relaxed">
                      {v.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 gap-6 animate-core-marquee">
              {coreValues.map((v, i) => (
                <div
                  key={`set2-${v.title}`}
                  className="shrink-0 w-[85vw] sm:w-[360px] flex flex-col group rounded-3xl overflow-hidden border border-brand/10 dark:border-white/10 hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-slate-900"
                >
                  <div className="h-[250px] overflow-hidden relative pointer-events-none select-none">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <img src={v.image} alt={v.title} draggable={false} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none" />
                  </div>
                  <div className="p-8 flex flex-col flex-1 pointer-events-none select-none">
                    <div className="size-12 grid place-items-center rounded-2xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <v.icon size={22} />
                    </div>
                    <h3 className="font-display font-extrabold text-xl tracking-tight text-brand dark:text-white mb-3">
                      {v.title}
                    </h3>
                    <p className="text-brand/70 dark:text-white/70 text-base font-medium leading-relaxed">
                      {v.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Business Model */}
      <section className="py-24 bg-[#F8FAFC] text-brand border-t border-brand/5 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={businessBg}
            alt=""
            className="w-full h-full object-cover opacity-100 pointer-events-none"
          />
          {/* Gradient to darken the top for text readability, leaving the rest vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A18]/80 via-[#050A18]/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <SectionHeader
              title="Our Business Model"
              description="A multi-threaded commercial approach scaling custom aerospace hardware production alongside field service operations."
              invert
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <Reveal delay={0}>
              <div className="h-full bg-slate-950/60 backdrop-blur-xl border border-white/20 rounded-3xl p-10 lg:p-12 flex flex-col hover:border-white/40 hover:bg-slate-950/70 hover:-translate-y-1 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[80px] bg-white/5 pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="border-l-4 border-white pl-5 mb-6">
                      <h3 className="font-display text-3xl font-extrabold uppercase tracking-wide text-white leading-tight">
                        OEM
                      </h3>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mt-1">
                        Original Equipment Manufacturing
                      </p>
                    </div>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed mt-4">
                      Design and manufacture advanced UAVs and aerospace systems tailored to diverse
                      mission-specific requirements across defense, commercial, and industrial
                      applications. Focused on delivering reliable, high-performance hardware
                      solutions engineered for precision, durability, operational efficiency, and
                      seamless performance in complex and mission-critical environments.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full bg-slate-950/60 backdrop-blur-xl border border-white/20 rounded-3xl p-10 lg:p-12 flex flex-col hover:border-white/40 hover:bg-slate-950/70 hover:-translate-y-1 transition-all duration-500 shadow-2xl hover:shadow-3xl relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[80px] bg-white/5 pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="border-l-4 border-white pl-5 mb-6">
                      <h3 className="font-display text-3xl font-extrabold uppercase tracking-wide text-white leading-tight">
                        Services
                      </h3>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mt-1">
                        Operations & UAV Solutions
                      </p>
                    </div>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed mt-4">
                      In addition to drone manufacturing, we offer a range of UAV-based services,
                      including aerial mapping, surveying, surveillance, inspection, monitoring, and
                      data acquisition. Leveraging advanced drone technology and skilled operations,
                      we deliver accurate, efficient, and actionable insights tailored to diverse
                      industry requirements.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Capabilities Section */}
      <section className="py-24 bg-[#080A10] text-white border-t border-white/5 relative overflow-hidden">
        {/* Right Accent Bar */}
        <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-accent z-20" />

        {/* Decorative Dot Patterns */}
        <div
          className="absolute top-0 right-0 w-96 h-96 accent-dots-pattern pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at top right, white, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at top right, white, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 accent-dots-pattern pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at bottom left, white, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at bottom left, white, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
                Our Capabilities
              </h2>
              <div className="w-48 h-1 bg-accent mt-4 rounded-full" />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-white/95 text-lg md:text-xl leading-relaxed mt-10">
                <strong>We</strong> bring together advanced aerospace engineering, intelligent
                software systems, and mission-driven analytics to deliver integrated,
                high-performance solutions across the UAV ecosystem.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <div className="border-l-4 border-accent pl-6 py-2 space-y-5">
                {[
                  "Advanced UAV design & aerospace manufacturing",
                  "Unified fleet management & real-time telemetry",
                  "Autonomous operations & AI-driven mission planning",
                  "Smart route optimization & environmental analysis",
                  "Data integration & advanced analytics",
                  "Enterprise-grade security & regulatory compliance",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 text-white/85 text-base md:text-lg"
                  >
                    <span className="size-2 rounded-full bg-white/80 inline-block shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Infrastructure Section */}
      <section className="py-24 bg-black text-white border-t border-white/5 relative overflow-hidden">
        <style>{`
          @keyframes slide-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: slide-marquee 25s linear infinite;
          }
        `}</style>
        {/* Infinite Sliding Marquee */}
        <div className="w-full flex overflow-hidden whitespace-nowrap mb-24 select-none group">
          <div className="animate-marquee inline-block group-hover:[animation-play-state:paused]">
            <span className="text-[6rem] md:text-[11rem] font-sans font-medium text-white tracking-tighter mx-8 leading-none">
              Our Infrastructure
            </span>
            <span className="text-[6rem] md:text-[11rem] font-sans font-medium text-white tracking-tighter mx-8 leading-none">
              Our Infrastructure
            </span>
          </div>
          <div className="animate-marquee inline-block group-hover:[animation-play-state:paused]">
            <span className="text-[6rem] md:text-[11rem] font-sans font-medium text-white tracking-tighter mx-8 leading-none">
              Our Infrastructure
            </span>
            <span className="text-[6rem] md:text-[11rem] font-sans font-medium text-white tracking-tighter mx-8 leading-none">
              Our Infrastructure
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-16 lg:mt-0">
              <Reveal delay={0.1}>
                <div className="flex flex-col">
                  <div className="w-full overflow-hidden bg-[#c7e4ff]">
                    <img
                      src={infrastructureImages[0].url}
                      alt={infrastructureImages[0].alt}
                      className="w-full aspect-[4/3] lg:aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 md:p-8 text-[#242526] dark:text-white -mt-16 mx-4 md:mx-8 relative z-10 rounded-sm">
                    <h4 className="font-sans font-bold text-xl mb-1">{infrastructureImages[0].alt}</h4>
                    <p className="text-sm font-medium text-[#737a80] dark:text-slate-400"></p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col">
                  <div className="w-full overflow-hidden bg-zinc-900">
                    <img
                      src={infrastructureImages[2].url}
                      alt={infrastructureImages[2].alt}
                      className="w-full aspect-[4/3] lg:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 md:p-8 text-[#242526] dark:text-white -mt-16 mx-4 md:mx-8 relative z-10 rounded-sm">
                    <h4 className="font-sans font-bold text-xl mb-1">{infrastructureImages[2].alt}</h4>
                    <p className="text-sm font-medium text-[#737a80] dark:text-slate-400"></p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="flex flex-col">
                  <div className="w-full overflow-hidden bg-zinc-900">
                    <img
                      src={infrastructureImages[4].url}
                      alt={infrastructureImages[4].alt}
                      className="w-full aspect-[4/3] lg:aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 md:p-8 text-[#242526] dark:text-white -mt-16 mx-4 md:mx-8 relative z-10 rounded-sm">
                    <h4 className="font-sans font-bold text-xl mb-1">{infrastructureImages[4].alt}</h4>
                    <p className="text-sm font-medium text-[#737a80] dark:text-slate-400"></p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-16 lg:mt-48">
              <Reveal delay={0.2}>
                <div className="flex flex-col">
                  <div className="w-full overflow-hidden bg-zinc-900">
                    <img
                      src={infrastructureImages[1].url}
                      alt={infrastructureImages[1].alt}
                      className="w-full aspect-[4/3] lg:aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 md:p-8 text-[#242526] dark:text-white -mt-16 mx-4 md:mx-8 relative z-10 rounded-sm">
                    <h4 className="font-sans font-bold text-xl mb-1">{infrastructureImages[1].alt}</h4>
                    <p className="text-sm font-medium text-[#737a80] dark:text-slate-400"></p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col">
                  <div className="w-full overflow-hidden bg-zinc-900">
                    <img
                      src={infrastructureImages[3].url}
                      alt={infrastructureImages[3].alt}
                      className="w-full aspect-[4/3] lg:aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 md:p-8 text-[#242526] dark:text-white -mt-16 mx-4 md:mx-8 relative z-10 rounded-sm">
                    <h4 className="font-sans font-bold text-xl mb-1">{infrastructureImages[3].alt}</h4>
                    <p className="text-sm font-medium text-[#737a80] dark:text-slate-400"></p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={printingHero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Collaborate
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Let's build the future together.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Interested in requesting custom UAV engineering packages or industrial 3D printing
            consultations? Speak to our deployment specialists today.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest text-xs rounded transition-all inline-flex items-center gap-2"
            >
              Get in Touch <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
