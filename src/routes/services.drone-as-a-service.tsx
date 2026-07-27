import { Link } from "react-router-dom";
import droneBg from "../assets/3Rd eye.jpg";

export default DaaSPage;


function DaaSPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={droneBg}
          alt="Drone-as-a-Service"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,10,20,0.55) 0%, rgba(8,10,20,0.80) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 max-w-5xl mx-auto">
          <span
            className="inline-flex self-start text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#8b5cf618", color: "#a78bfa", border: "1px solid #8b5cf640" }}
          >
            DaaS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Drone-as-a-Service
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            Skip CapEx. Certified pilots, fully-insured fleets and turnkey data delivery on
            recurring or project basis.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Outsource your entire aerial operations stack to Wingspann. We bring certified
              Part-107 and CAA pilots, fully insured drone fleets and a cloud-based data delivery
              portal. Available on a per-project or recurring contract basis — no hardware
              investment required.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Part-107 / CAA certified pilots",
                "Fully insured operations",
                "Hardware provisioning",
                "Data processing & delivery",
                "Cloud delivery portal",
                "Recurring or one-off contracts",
                "Mission planning & reporting",
                "24/7 support",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-violet-50 rounded-xl px-4 py-3 text-[14px] text-violet-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Define Requirements",
                  desc: "Tell us your mission type, frequency, geography and deliverables.",
                },
                {
                  step: "02",
                  title: "Get a Proposal",
                  desc: "We scope the right fleet, sensors and data pipeline for your needs.",
                },
                {
                  step: "03",
                  title: "We Operate",
                  desc: "Our pilots execute missions on schedule with zero involvement from you.",
                },
                {
                  step: "04",
                  title: "Data Delivered",
                  desc: "Processed outputs arrive in your cloud portal within agreed SLAs.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-violet-100">{p.step}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
            <dl className="space-y-3 text-sm">
              {[
                ["Pilots", "Part-107 / CAA cert."],
                ["Insurance", "Full coverage"],
                ["Contract", "Project or recurring"],
                ["Portal", "Cloud delivery"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-semibold text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Link
            to="/contact"
            className="block text-center bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-violet-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
