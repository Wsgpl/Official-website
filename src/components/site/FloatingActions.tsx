import { Link } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { motion } from "motion/react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 items-end">
      <motion.a
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        href="https://wa.me/15555555555?text=Hi%20Wingspann%2C%20I%27d%20like%20to%20learn%20more"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        className="size-14 bg-green-500 text-white rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle size={22} fill="currentColor" strokeWidth={0} />
      </motion.a>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to="/contact"
          className="h-12 px-5 bg-brand text-white rounded-full shadow-2xl shadow-brand/30 flex items-center gap-2.5 hover:-translate-y-1 transition-transform border border-white/10"
        >
          <FileText size={15} />
          <span className="text-[11px] font-bold uppercase tracking-widest">Request Quote</span>
        </Link>
      </motion.div>
    </div>
  );
}
