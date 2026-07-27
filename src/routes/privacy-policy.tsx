import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-brand/60">
            <span>www.wingspannglobal.com</span>
            <span>•</span>
            <span>Effective Date: April 2026</span>
            <span>•</span>
            <span>Last Updated: April 2026</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-emerald-500/10 text-emerald-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/20">
              GDPR Compliant
            </span>
            <span className="bg-indigo-500/10 text-indigo-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/20">
              Aligned with ISO/IEC 27001
            </span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-brand/5 p-6 md:p-8 rounded-2xl border border-brand/10 mb-12 space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-brand/90 font-medium">
            Welcome to Wingspann Global. This document sets out our Privacy Policy for use of our website at{" "}
            <a href="https://www.wingspannglobal.com" className="text-accent underline font-semibold">
              www.wingspannglobal.com
            </a>
            . By accessing or using this website, you agree to the terms described here. If you do not agree, please discontinue use of the site.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-brand/75">
            Wingspann Global is committed to handling personal data responsibly, maintaining robust information security practices, and being transparent about how we operate. This document reflects our obligations under the General Data Protection Regulation (GDPR) and our alignment with the ISO/IEC 27001 Information Security Management standard.
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-brand/80 space-y-10">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              1. About Wingspann Global and Our Role as Data Controller
            </h2>
            <p className="leading-relaxed">
              Wingspann Global is a next-generation aerospace company developing advanced unmanned and autonomous systems for defence, commercial, and research applications. Our website serves as an informational and engagement platform for clients, partners, investors, and interested individuals worldwide.
            </p>
            <p className="leading-relaxed">
              For the purposes of applicable data protection law, including the GDPR, Wingspann Global acts as the Data Controller in respect of any personal data collected through this website. This means we determine the purposes and means by which your personal data is processed.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Article 4(7) defines a ‘controller’ as the entity that determines the purposes and means of processing personal data. As the Data Controller, Wingspann Global is responsible for ensuring your rights under the GDPR are upheld.
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              2. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect two broad categories of information when you interact with our website:
            </p>
            <div className="space-y-4 pl-4">
              <h3 className="text-lg font-bold text-brand">a) Personal Identification Information</h3>
              <p className="leading-relaxed">
                Personal identification information refers to data that can directly or indirectly identify you as an individual. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-brand/80">
                <li>Full name and email address</li>
                <li>Job Title and phone number (where voluntarily provided)</li>
                <li>Company name and professional affiliation (where voluntarily provided)</li>
                <li>Mailing or physical address (where voluntarily provided)</li>
                <li>Any other details submitted through our contact or inquiry forms</li>
              </ul>
              <p className="leading-relaxed text-sm italic">
                We collect this information only when you voluntarily provide it to us — for example, when filling out a contact form, requesting a product demonstration, or subscribing to updates. We do not collect personal information without your knowledge.
              </p>

              <h3 className="text-lg font-bold text-brand pt-4">b) Non-Personal Identification Information</h3>
              <p className="leading-relaxed">
                Non-personal information is collected automatically when you browse our website. It does not identify you individually, but helps us understand how the site is used. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-brand/80">
                <li>IP address and approximate geographic location (country/city level)</li>
                <li>Browser type, version, and operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring URLs and entry/exit pages</li>
                <li>Date and time of visit, and device type</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              3. Cookies and Web Tracking
            </h2>
            <p className="leading-relaxed">
              Like most websites, Wingspann Global uses cookies to enhance your browsing experience. Cookies are small text files stored on your device by your web browser when you visit our site. They help us remember preferences, analyse usage patterns, and improve site functionality.
            </p>
            <h3 className="text-lg font-bold text-brand">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function. Without these, core features such as page navigation may not work correctly.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site. We may use tools like Google Analytics to track visits and page performance. This data is aggregated and anonymised.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and choices to avoid you re-entering them on subsequent visits.
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> Some embedded content (maps, video, social sharing tools) may set their own cookies, governed by the respective third party’s privacy policy.
              </li>
            </ul>
            <p className="leading-relaxed">
              You can control or disable cookies through your browser settings at any time. Disabling certain cookies may affect the functionality of parts of our website. Continuing to use our site without adjusting your browser settings constitutes acceptance of our cookie use as described here.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Article 6(1)(a) Where cookies involve the processing of personal data beyond what is strictly necessary, we rely on your consent as the lawful basis. Non-essential cookies are not set until consent is obtained through our cookie notice (where implemented).
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              4. Lawful Basis for Processing Personal Data
            </h2>
            <p className="leading-relaxed">
              Under the GDPR, we are required to have a lawful basis before processing any personal data. Depending on the nature of the processing, Wingspann Global relies on one or more of the following legal bases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Consent (Article 6(1)(a)):</strong> Where you have clearly and freely given us permission to process your data for a specific purpose, such as receiving communications or enabling non-essential cookies.
              </li>
              <li>
                <strong>Legitimate Interests (Article 6(1)(f)):</strong> Where processing is necessary for our legitimate business interests, such as improving our website, preventing fraud, or responding to business enquiries, and where those interests are not overridden by your rights.
              </li>
              <li>
                <strong>Legal Obligation (Article 6(1)(c)):</strong> Where we are required by law to process your information.
              </li>
              <li>
                <strong>Contractual Necessity (Article 6(1)(b)):</strong> Where processing is necessary to fulfil a contractual obligation or to take steps at your request prior to entering a contract.
              </li>
            </ul>
            <p className="leading-relaxed text-sm">
              We will always inform you of the lawful basis being relied upon at the point your data is collected, where this is not already clear from the context.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              5. How We Use the Information We Collect
            </h2>
            <p className="leading-relaxed">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>To respond to your enquiries and communicate with you effectively</li>
              <li>To send updates or information about Wingspann Global’s products and services (only where you have opted in or made a specific request)</li>
              <li>To understand how our website is used and to improve its content and performance</li>
              <li>To detect and prevent fraudulent or malicious activity on our platform</li>
              <li>To comply with applicable legal and regulatory obligations</li>
              <li>To process partnership, investment, or business development enquiries</li>
            </ul>
            <p className="leading-relaxed font-medium text-brand/90">
              We do not use your personal information for unsolicited marketing, automated decision-making that produces legal or similarly significant effects, or any purpose you have not been informed of.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              6. Sharing and Disclosure of Personal Data
            </h2>
            <p className="leading-relaxed">
              Wingspann Global does not sell, rent, or trade your personal information. We may share data in limited, specific circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With trusted service providers who assist in operating our website, under strict confidentiality and data processing agreements</li>
              <li>When required by law, court order, or a competent government authority</li>
              <li>To protect the safety, rights, or property of Wingspann Global, its personnel, or the public</li>
              <li>In connection with a merger, acquisition, or sale of business assets, with appropriate notice provided</li>
            </ul>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Articles 28 and 29 — Any third-party service providers acting as Data Processors are engaged under written Data Processing Agreements (DPAs) that bind them to GDPR-compliant standards of data handling.
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              7. International Data Transfers
            </h2>
            <p className="leading-relaxed">
              If any personal data is transferred to recipients located outside the European Economic Area (EEA) or equivalent jurisdictions, Wingspann Global ensures that such transfers are carried out in accordance with applicable data protection law, including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Transfers to countries with an adequacy decision recognised by the relevant supervisory authority</li>
              <li>Use of Standard Contractual Clauses (SCCs) as approved by the European Commission</li>
              <li>Other legally recognised transfer mechanisms, such as Binding Corporate Rules where applicable</li>
            </ul>
            <p className="leading-relaxed">
              Where such transfers occur, we take steps to ensure your data receives a level of protection equivalent to that provided within the EEA.
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Chapter V (Articles 44–50) governs the transfer of personal data to third countries and international organisations.
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              8. Data Retention
            </h2>
            <p className="leading-relaxed">
              We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law or regulation. Our general retention approach is as follows:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Contact form submissions and general correspondence:</strong> up to 3 years from the date of receipt</li>
              <li><strong>Business enquiries and partnership discussions:</strong> duration of engagement plus 2 years</li>
              <li><strong>Analytics and site usage data:</strong> typically, 26 months, in line with common analytics platform defaults</li>
            </ul>
            <p className="leading-relaxed">
              When data is no longer needed, it is securely deleted or anonymised. You may request deletion of your personal data at any time (see Section 11).
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Article 5(1)(e) — the storage limitation principle requires that personal data be kept no longer than necessary for the purposes for which it is processed.
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              9. Information Security and ISO/IEC 27001 Alignment
            </h2>
            <p className="leading-relaxed">
              Wingspann Global takes the security of your information seriously. We implement and maintain technical and organisational measures designed to protect personal data against accidental loss, unauthorised access, disclosure, alteration, or destruction.
            </p>
            <p className="leading-relaxed">
              Our information security practices are aligned with the ISO/IEC 27001 standard, the internationally recognised framework for Information Security Management Systems (ISMS). This alignment means we apply a structured, risk-based approach to identifying and managing information security risks across our operations. Key practices include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access Control:</strong> Access to systems holding personal data is restricted to authorised personnel only, based on the principle of least privilege (ISO 27001 Annex A.9).
              </li>
              <li>
                <strong>Encryption:</strong> Our website uses HTTPS (TLS encryption) for all data in transit. Sensitive data at rest is encrypted where appropriate (ISO 27001 Annex A.10).
              </li>
              <li>
                <strong>Risk Assessment:</strong> We conduct regular information security risk assessments to identify threats and implement appropriate controls (ISO 27001 Clause 6.1).
              </li>
              <li>
                <strong>Incident Management:</strong> We maintain procedures for detecting, reporting, and responding to information security incidents, including personal data breaches (ISO 27001 Annex A.16).
              </li>
              <li>
                <strong>Supplier Management:</strong> Third-party service providers handling data on our behalf are subject to security due diligence and contractual obligations (ISO 27001 Annex A.15).
              </li>
              <li>
                <strong>Business Continuity:</strong> We maintain plans to ensure critical systems and data can be recovered in the event of a disruption (ISO 27001 Annex A.17).
              </li>
            </ul>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl text-xs md:text-sm text-brand/90 italic">
              <strong>GDPR Reference:</strong> Article 32 requires that controllers implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk. Our ISO 27001-aligned practices directly support this obligation.
            </div>
            <p className="leading-relaxed text-sm">
              While we apply strong safeguards, no system connected to the internet can be guaranteed to be 100% secure. We will notify you and the relevant supervisory authority without undue delay in the event of a personal data breach that is likely to result in a risk to your rights and freedoms, as required under GDPR Article 33.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              10. Links to Third-Party Websites
            </h2>
            <p className="leading-relaxed">
              Our website may contain links to external websites not owned or controlled by Wingspann Global. We are not responsible for the privacy practices, cookie policies, or content of those sites. We encourage you to review the privacy notices of any third-party websites you visit.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              11. Your Data Protection Rights
            </h2>
            <p className="leading-relaxed">
              Under the GDPR and other applicable data protection laws, you have a number of rights in relation to your personal data. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Right of Access (Article 15):</strong> You have the right to request a copy of the personal data we hold about you, along with information about how it is being used.
              </li>
              <li>
                <strong>Right to Rectification (Article 16):</strong> You can ask us to correct inaccurate or incomplete personal data.
              </li>
              <li>
                <strong>Right to Erasure (Article 17):</strong> Also known as the ‘right to be forgotten’. You can request that we delete your personal data where there is no compelling reason for us to continue processing it.
              </li>
              <li>
                <strong>Right to Restrict Processing (Article 18):</strong> You can ask us to pause the processing of your data in certain circumstances.
              </li>
              <li>
                <strong>Right to Data Portability (Article 20):</strong> You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit it to another controller.
              </li>
              <li>
                <strong>Right to Object (Article 21):</strong> You can object to processing based on legitimate interests, including for direct marketing purposes.
              </li>
              <li>
                <strong>Rights Related to Automated Decision-Making (Article 22):</strong> You have the right not to be subject to decisions made solely by automated means where those decisions have a significant effect on you.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw it at any time, without affecting the lawfulness of processing prior to withdrawal.
              </li>
            </ul>
            <p className="leading-relaxed">
              To exercise any of these rights, please contact us using the details in Section 13. We will respond to all valid requests within 30 days, as required under GDPR Article 12. In complex cases, this may be extended by a further two months, and we will inform you accordingly.
            </p>
            <p className="leading-relaxed text-sm">
              If you believe we have not handled your personal data appropriately, you also have the right to lodge a complaint with your local supervisory authority. In the UK this is the Information Commissioner’s Office (ICO); within the EU, you may contact the supervisory authority in your member state.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              12. Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal obligations. When we do, we will revise the ‘Last Updated’ date at the top of this document. Your continued use of the website following any update constitutes your acceptance of the revised policy.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-brand tracking-tight border-b border-brand/5 pb-2">
              13. How to Contact Us
            </h2>
            <p className="leading-relaxed">
              For any questions about this Privacy Policy, to exercise your data protection rights, or to raise a concern about how we handle your data, please contact us at:
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
                Where a Data Protection Officer (DPO) has been appointed, enquiries may also be directed to that individual. Please refer to our website for current contact details.
              </p>
            </div>
          </section>
        </div>

        {/* Footer link to Terms of Service */}
        <div className="mt-16 pt-8 border-t border-brand/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand/60">
            Also read our{" "}
            <Link to="/terms-of-service" className="text-accent underline font-semibold">
              Terms and Conditions
            </Link>
          </p>
          <Link
            to="/contact"
            className="text-xs font-bold uppercase tracking-widest bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand/90 transition-colors"
          >
            Contact Legal Team
          </Link>
        </div>
      </div>
    </div>
  );
}
