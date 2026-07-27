import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Slight delay so it doesn't pop in instantly
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setShow(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (type: "accept" | "decline") => {
    localStorage.setItem("cookieConsent", type);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] w-[calc(100%-3rem)] max-w-sm bg-surface text-brand shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-brand/10 rounded-2xl p-6 md:bottom-8 md:left-8 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <h3 className="font-display text-lg font-bold mb-2">
        We use cookies to improve and personalize your experience
      </h3>
      <p className="text-sm text-brand/70 mb-6">
        For more choices and details, please use our Cookie Manager and Cookie List.
      </p>
      
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleConsent("decline")}
          className="flex-1 rounded-lg border border-brand/20 px-4 py-2.5 text-sm font-semibold hover:bg-brand/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          Decline All
        </button>
        <button
          onClick={() => handleConsent("accept")}
          className="flex-1 rounded-lg bg-indigo-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          Accept All
        </button>
      </div>
      
      <div className="text-center">
        <Link 
          to="/cookie-policy" 
          className="text-xs text-brand/60 underline hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand/20 rounded-sm"
          onClick={() => setShow(false)}
        >
          Cookie Manager
        </Link>
      </div>
    </div>
  );
}
