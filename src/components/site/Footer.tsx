import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-brand/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="size-8 bg-brand text-white rounded grid place-items-center font-bold font-display text-xs">
                W
              </div>
              <span className="font-display font-bold text-lg tracking-tight">WINGSPANN</span>
            </div>
            <p className="text-brand/50 text-sm leading-relaxed max-w-xs">
              Pioneering the next generation of autonomous aerial intelligence and precision
              industrial manufacturing.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6">Solutions</h4>
            <ul className="space-y-3 text-sm text-brand/60">
              <li>
                <Link to="/services" className="hover:text-accent">
                  Drone Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent">
                  Survey & Mapping
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent">
                  Infrastructure Inspection
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent">
                  Custom UAV Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-brand/60 mb-6">
              <li>
                <Link to="/about" className="hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/rpto" className="hover:text-accent">
                  RPTO Training
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand/50 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand/50 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand/50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-brand/5 gap-4">
          <p className="text-[10px] text-brand/40 uppercase tracking-[0.2em]">
            © 2025 Wingspann Global Pvt Ltd
          </p>
          <div className="flex gap-8">
            <Link
              to="/privacy-policy"
              className="text-[10px] text-brand/40 hover:text-brand uppercase tracking-[0.2em]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-[10px] text-brand/40 hover:text-brand uppercase tracking-[0.2em]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
