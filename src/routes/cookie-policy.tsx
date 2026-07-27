
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default CookiePolicyComponent;


function CookiePolicyComponent() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem("cookieConsent"));
  }, []);

  const handleConsent = (type: "accept" | "decline") => {
    localStorage.setItem("cookieConsent", type);
    setConsent(type);
    alert(`Preferences saved: ${type === 'accept' ? 'All cookies accepted.' : 'Only essential cookies accepted.'}`);
  };

  return (
    <div className="min-h-screen bg-surface py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand mb-8">
          Cookie Policy & Manager
        </h1>

        <div className="prose prose-slate max-w-none text-brand/80 space-y-6">
          <p className="text-lg leading-relaxed">
            At Wingspann, we believe in being transparent about how we collect and use data.
            This policy provides information about how and when we use cookies for these purposes.
            Capitalized terms used in this policy but not defined have the meaning set forth in
            our <Link to="/privacy-policy" className="text-accent underline">Privacy Policy</Link>, which also includes additional details about the collection and
            use of information at Wingspann.
          </p>

          <h2 className="text-2xl font-bold text-brand mt-10 mb-4">What is a cookie?</h2>
          <p className="leading-relaxed">
            Cookies are small text files sent by us to your computer or mobile device. They are
            unique to your account or your browser. Session-based cookies last only while your
            browser is open and are automatically deleted when you close your browser. Persistent
            cookies last until you or your browser delete them or until they expire.
          </p>

          <h2 className="text-2xl font-bold text-brand mt-10 mb-4">Does Wingspann use cookies?</h2>
          <p className="leading-relaxed">
            Yes. Wingspann uses cookies and similar technologies like single-pixel gifs and web
            beacons. We use both session-based and persistent cookies. Wingspann sets and accesses
            our own cookies on the domains operated by Wingspann and its corporate affiliates.
          </p>

          <h2 className="text-2xl font-bold text-brand mt-10 mb-4">How are cookies used?</h2>
          <p className="leading-relaxed">
            Some cookies are associated with your account and personal information in order to
            remember that you are logged in and which workspaces you are logged into. Other cookies
            are not tied to your account but are unique and allow us to carry out analytics and
            customization, among other similar things.
          </p>

          <div className="mt-12 p-8 bg-brand/5 rounded-2xl border border-brand/10 shadow-sm">
            <h3 className="text-2xl font-display font-bold text-brand mb-4">
              Manage Your Preferences
            </h3>
            <p className="mb-8 text-brand/70 leading-relaxed">
              You can update your cookie preferences below. Essential cookies cannot be disabled
              as they are necessary for the website to function securely and properly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleConsent("accept")}
                className={`rounded-xl px-6 py-3.5 text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${consent === "accept"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
              >
                {consent === "accept" ? "✓ All Cookies Accepted" : "Accept All Cookies"}
              </button>
              <button
                onClick={() => handleConsent("decline")}
                className={`rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand/20 ${consent === "decline"
                    ? "bg-brand/10 border-brand/30 text-brand"
                    : "border-brand/20 hover:bg-brand/5 text-brand"
                  }`}
              >
                {consent === "decline" ? "✓ Only Essential Allowed" : "Decline Non-Essential"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
