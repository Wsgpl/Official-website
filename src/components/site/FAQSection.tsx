import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  accentColor?: string; // indigo, blue, green, amber, sky
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Have questions about our platforms or operations? Find answers here.",
  items,
  accentColor = "indigo",
}: FAQSectionProps) {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggleFAQ = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    indigo: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50/20 dark:bg-indigo-950/10",
      border: "border-indigo-100/70 dark:border-indigo-900/30",
    },
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50/20 dark:bg-blue-950/10",
      border: "border-blue-100/70 dark:border-blue-900/30",
    },
    green: {
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-50/20 dark:bg-green-950/10",
      border: "border-green-100/70 dark:border-green-900/30",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50/20 dark:bg-amber-950/10",
      border: "border-amber-100/70 dark:border-amber-900/30",
    },
    sky: {
      text: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50/20 dark:bg-sky-950/10",
      border: "border-sky-100/70 dark:border-sky-900/30",
    },
  };

  const colors = colorMap[accentColor] || colorMap.indigo;

  // Split FAQs into two columns for wider screen viewports
  const leftColItems = items.filter((_, i) => i % 2 === 0);
  const rightColItems = items.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-24 bg-gray-50/40 dark:bg-[#0b0c10] border-t border-gray-150/80 dark:border-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Minimal & Elegant Header */}
        <Reveal>
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 text-gray-400 dark:text-slate-500 border border-gray-200/50 dark:border-slate-800/50">
              Information
            </span>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight font-display">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </Reveal>

        {/* 2-Column Responsive Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Left Column FAQs */}
          <div className="space-y-4">
            {leftColItems.map((item) => {
              const origIdx = items.indexOf(item);
              const isOpen = !!openStates[origIdx];
              return (
                <Reveal key={origIdx} delay={origIdx * 0.04}>
                  <div
                    className={`border rounded-2xl transition-all duration-350 overflow-hidden ${
                      isOpen
                        ? `${colors.border} ${colors.bg} shadow-sm`
                        : "border-gray-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0f111a] hover:border-gray-300 dark:hover:border-slate-700 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(origIdx)}
                      className="w-full flex items-center justify-between text-left p-6 md:p-7 gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-gray-900 dark:text-white text-base md:text-[17px] leading-snug tracking-tight">
                        {item.question}
                      </span>
                      <span
                        className={`flex-shrink-0 size-8 md:size-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? `${colors.border} bg-white dark:bg-slate-900 ${colors.text} shadow-sm`
                            : "border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 bg-gray-50/50 dark:bg-slate-950/20"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 md:px-7 md:pb-7 text-sm md:text-[15px] text-gray-600 dark:text-gray-450 leading-relaxed border-t border-gray-150/40 dark:border-slate-800/40 pt-4 bg-white/40 dark:bg-slate-900/10">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column FAQs */}
          <div className="space-y-4">
            {rightColItems.map((item) => {
              const origIdx = items.indexOf(item);
              const isOpen = !!openStates[origIdx];
              return (
                <Reveal key={origIdx} delay={origIdx * 0.04}>
                  <div
                    className={`border rounded-2xl transition-all duration-350 overflow-hidden ${
                      isOpen
                        ? `${colors.border} ${colors.bg} shadow-sm`
                        : "border-gray-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0f111a] hover:border-gray-300 dark:hover:border-slate-700 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(origIdx)}
                      className="w-full flex items-center justify-between text-left p-6 md:p-7 gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-gray-900 dark:text-white text-base md:text-[17px] leading-snug tracking-tight">
                        {item.question}
                      </span>
                      <span
                        className={`flex-shrink-0 size-8 md:size-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? `${colors.border} bg-white dark:bg-slate-900 ${colors.text} shadow-sm`
                            : "border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 bg-gray-50/50 dark:bg-slate-950/20"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 md:px-7 md:pb-7 text-sm md:text-[15px] text-gray-650 dark:text-gray-440 leading-relaxed border-t border-gray-150/40 dark:border-slate-800/40 pt-4 bg-white/40 dark:bg-slate-900/10">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
