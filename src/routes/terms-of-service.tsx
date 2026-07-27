import { Link } from "react-router-dom";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-surface py-24 px-6 md:px-12 lg:px-24 text-brand">
      <div className="max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="border-b border-brand/10 pb-8 mb-10">
          <span className="text-xs font-bold font-mono uppercase tracking-[0.25em] text-accent block mb-3">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brand tracking-tight mb-4">
            WINGSPANN GLOBAL
          </h1>
          <p className="text-2xl font-bold text-brand/80 font-display">
            Terms and Conditions
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-brand/60">
            <span>www.wingspannglobal.com</span>
            <span>•</span>
            <span>Effective Date: April 2026</span>
            <span>•</span>
            <span>Last Updated: April 2026</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-indigo-500/10 text-indigo-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/20">
              Aligned with ISO/IEC 27001
            </span>
            <span className="bg-emerald-500/10 text-emerald-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/20">
              GDPR Compliant
            </span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-brand/5 p-6 md:p-8 rounded-2xl border border-brand/10 mb-12 space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-brand/90 font-medium">
            These Terms and Conditions govern your access to and use of the Wingspann Global website at{" "}
            <a href="https://www.wingspannglobal.com" className="text-accent underline font-semibold">
              www.wingspannglobal.com
            </a>
            . By using this site, you confirm that you have read, understood, and agree to be bound by these terms in full.
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-brand/80 space-y-10">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              1. Use of the Website
            </h2>
            <p className="leading-relaxed">
              This website is provided for informational and professional engagement purposes. You agree to use it only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their enjoyment of the site.
            </p>
            <p className="leading-relaxed font-semibold text-brand">
              You must not:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-brand/80">
              <li>Use the site for any unlawful, harmful, or fraudulent purpose</li>
              <li>Attempt to gain unauthorised access to any part of the website or its underlying infrastructure</li>
              <li>Upload or transmit malicious code, viruses, or disruptive content</li>
              <li>Scrape, harvest, or systematically extract content without written permission</li>
              <li>Impersonate Wingspann Global or any of its employees or representatives</li>
            </ul>
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>ISO 27001 Alignment:</strong> Acceptable use of information systems and assets is a core control under Annex A.8.1.3. Users are expected to interact with our systems in accordance with this policy.
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              2. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on this website — including text, graphics, logos, images, technical documentation, and software — is the property of Wingspann Global or its licensors and is protected by applicable intellectual property laws.
            </p>
            <p className="leading-relaxed">
              You may view, download, and print content for personal, non-commercial reference only. Reproduction, modification, distribution, or commercial use of any content requires the express written consent of Wingspann Global.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              3. Accuracy of Information
            </h2>
            <p className="leading-relaxed">
              We make every effort to ensure the information on this website is accurate and current. However, content is provided for general informational purposes and may not always reflect the most recent developments or product specifications. Decisions based on information found here should be confirmed directly with our team before being acted upon.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              4. Disclaimer of Warranties
            </h2>
            <p className="leading-relaxed">
              The website and its content are provided on an ‘as is’ and ‘as available’ basis. To the fullest extent permitted by law, Wingspann Global disclaims all warranties, including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Implied warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the website will be uninterrupted, error-free, or virus-free</li>
              <li>Warranties regarding the accuracy or completeness of any content</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by applicable law, Wingspann Global, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website, including loss of data, business interruption, or reliance on site content.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              6. Information Security Responsibilities
            </h2>
            <p className="leading-relaxed">
              Wingspann Global implements security controls consistent with ISO/IEC 27001 to protect its systems and any data processed through this website. Users of the website are expected to take reasonable steps to maintain security on their end, including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Using up-to-date browser software and operating systems</li>
              <li>Not sharing session credentials or login information where applicable</li>
              <li>Reporting any suspected security vulnerabilities or incidents to Wingspann Global promptly</li>
            </ul>
            <p className="leading-relaxed text-sm">
              Please do not submit any classified, proprietary, or sensitive information through the website’s public-facing channels. Wingspann Global accepts no liability for the security of information transmitted through unsecured or unauthenticated means outside of formal agreements.
            </p>
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>ISO 27001 Alignment:</strong> User responsibilities and acceptable behaviour on information systems are addressed under Annex A.9.3 (User responsibilities) and Annex A.16 (Information security incident management).
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              7. Submissions and Communications
            </h2>
            <p className="leading-relaxed">
              When you contact us through the website, you acknowledge that non-confidential information you share may be used by Wingspann Global for business-related purposes, such as following up on your enquiry or improving our services. Any personal data submitted is handled in accordance with Part One of this document.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              8. Data Breach Notification
            </h2>
            <p className="leading-relaxed">
              In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, Wingspann Global will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, and will inform affected individuals without undue delay where required, in line with our obligations under GDPR Article 33 and 34.
            </p>
            <p className="leading-relaxed">
              We maintain an internal incident response procedure as part of our ISO 27001-aligned information security management framework, which includes defined steps for identification, containment, assessment, notification, and post-incident review.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Articles 33 and 34. <strong>ISO 27001 Alignment:</strong> Annex A.16.1 — Management of information security incidents and improvements.
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              9. Governing Law and Jurisdiction
            </h2>
            <p className="leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Wingspann Global is incorporated, without regard to any conflict of law principles. Any disputes arising in connection with these terms or the use of this website are subject to the exclusive jurisdiction of the courts of that jurisdiction.
            </p>
            <p className="leading-relaxed text-sm">
              If you access this website from outside that jurisdiction, you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              10. Changes to These Terms
            </h2>
            <p className="leading-relaxed">
              Wingspann Global reserves the right to update these Terms and Conditions at any time. Changes take effect upon posting to this page. We recommend revisiting this page periodically to stay informed. Continued use of the website following any update constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              11. Termination of Access
            </h2>
            <p className="leading-relaxed">
              We reserve the right to restrict or terminate your access to this website, at our sole discretion and without prior notice, if we believe you have violated any of these terms or applicable law. Such termination does not affect any rights or remedies available to Wingspann Global.
            </p>
          </section>

          {/* Contact Section */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              Contact Us
            </h2>
            <p className="leading-relaxed">
              For questions about this Privacy Policy, to exercise your data protection rights, or to raise any concern, please reach out through our website at:
            </p>
            <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10 space-y-2">
              <h4 className="font-bold font-display text-brand">Wingspann Global</h4>
              <p className="text-sm">
                Website:{" "}
                <a href="https://www.wingspannglobal.com" className="text-accent underline">
                  www.wingspannglobal.com
                </a>
              </p>
              <p className="text-xs text-brand/70 pt-2">
                This document was last reviewed and updated in April 2026. © 2026 Wingspann Global. All rights reserved.
              </p>
            </div>
          </section>
        </div>

        {/* Footer link to Privacy Policy */}
        <div className="mt-16 pt-8 border-t border-brand/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand/60">
            Read our{" "}
            <Link to="/privacy-policy" className="text-accent underline font-semibold">
              Privacy Policy
            </Link>
          </p>
          <Link
            to="/contact"
            className="text-xs font-bold uppercase tracking-widest bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
