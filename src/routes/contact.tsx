import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import infraImage from "../assets/infra.png";
import { Reveal } from "../components/site/Reveal";
import { QuoteForm } from "../components/site/QuoteForm";
import { toast } from "sonner";


export default ContactPage;


const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "info@wingspannglobal.com",
    href: "mailto:info@wingspannglobal.com",
  },
  { icon: Phone, label: "Phone", value: "+91 91757 78119", href: "tel:+919175778119" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us instantly",
    href: "https://wa.me/919175778119",
  },
  {
    icon: MapPin,
    label: "HQ Office",
    value: "Waluj, Shahajapur, Maharashtra 431136",
    href: "https://www.google.com/maps/place/WINGSPANN+GLOBAL+PVT+LTD/@19.8640409,75.221675",
  },
];

function ContactPage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  const heroText = "Get in Touch";
  const words = heroText.split(" ");

  useEffect(() => {
    if (!heroTextRef.current) return;
    const chars = heroTextRef.current.querySelectorAll(".contact-char");

    // Set initial shattered/offset state for character animation
    gsap.set(chars, {
      opacity: 0,
      y: 50,
      scale: 1.8,
      filter: "blur(10px)",
      rotation: () => (Math.random() - 0.5) * 30,
    });

    // Lock and snap chars together
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotation: 0,
      stagger: 0.08,
      duration: 1.6,
      ease: "power4.out",
      delay: 0.1,
    });
  }, []);

  return (
    <>
      {/* Image Hero Section */}
      <section className="relative w-full h-screen min-h-[420px] flex items-center justify-center bg-black overflow-hidden z-10">
        <img
          src={infraImage}
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-80"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/45 z-10" />

        {/* Animated Headline overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center">
          <h1
            ref={heroTextRef}
            className="font-display text-4xl sm:text-6xl md:text-[8.5rem] font-black tracking-tighter text-white text-center flex flex-wrap justify-center gap-x-[0.25em] select-none drop-shadow-2xl"
          >
            {words.map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="contact-char inline-block origin-center">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Top Header & Channels section */}
      <section className="pt-20 pb-12 md:pb-72 bg-surface text-brand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00D084]">
              Contact
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-brand">
              Let's engineer your next deployment.
            </h2>
            <p className="text-brand/60 text-lg leading-relaxed">
              Quotes within 24 hours. Consultations scheduled the same week.
            </p>
          </div>

          {/* Contact Channels Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "HQ Office" ? "_blank" : undefined}
                rel={c.label === "HQ Office" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 bg-white border border-brand/5 rounded-2xl hover:border-[#00D084]/40 hover:bg-slate-50 transition-colors group shadow-sm"
              >
                <div className="size-11 rounded-xl bg-[#00D084]/10 text-[#00D084] grid place-items-center group-hover:bg-[#00D084] group-hover:text-white transition-colors">
                  <c.icon size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/50">
                    {c.label}
                  </div>
                  <div className="font-display font-bold mt-0.5 text-sm md:text-base text-brand">
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Card Map Section */}
      <section className="relative w-full min-h-[300px] md:h-[680px] bg-slate-950">
        {/* Map Background Layer */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://maps.google.com/maps?q=WINGSPANN%20GLOBAL%20PVT%20LTD,%20Waluj,%20Shahajapur,%20Maharashtra%20431136&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wingspann Global Pvt Ltd Office Location Map"
          />
        </div>

        {/* Floating Card Overlay (Pushed up using negative translate-y to overlap the boundary) */}
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 flex justify-center py-8 md:py-0 md:-translate-y-60">
          <Reveal delay={0.1} className="w-full max-w-3xl">
            <div className="bg-white shadow-2xl rounded-3xl border-t-[5px] border-[#00D084] p-8 md:p-12 text-center">
              <QuoteForm variant="contactPage" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
