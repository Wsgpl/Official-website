import { Link } from "react-router-dom";
import droneBg from "../assets/3Rd eye.jpg";

export default CustomUAVPage;


function CustomUAVPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={droneBg}
          alt="Custom UAV Development"
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
            style={{ background: "#d946ef18", color: "#e879f9", border: "1px solid #d946ef40" }}
          >
            Custom
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Custom UAV Development
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            Bespoke airframes for confined-space, extreme cold, high altitude, or unique payloads
            from spec to certification.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              When off-the-shelf platforms don't meet your mission requirements, we engineer
              purpose-built UAVs from the ground up. Specialized platforms for confined-space
              inspection, arctic operations, stratospheric altitudes, or unique sensor payloads
              full lifecycle from specification through type-certification support.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Confined-space inspection drones",
                "Arctic/extreme cold operations",
                "High-altitude platforms",
                "Custom payload integration",
                "BVLOS-optimized design",
                "Tethered UAV systems",
                "Fixed-wing hybrids",
                "Type-certification support",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-fuchsia-50 rounded-xl px-4 py-3 text-[14px] text-fuchsia-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Lifecycle</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Requirements",
                  desc: "Mission specification, environment profile and payload definition.",
                },
                {
                  step: "02",
                  title: "Design",
                  desc: "Aerodynamic modeling, structural design and systems architecture.",
                },
                {
                  step: "03",
                  title: "Build & Test",
                  desc: "Prototype construction followed by ground and flight validation.",
                },
                {
                  step: "04",
                  title: "Certification",
                  desc: "Regulatory documentation, type-cert support and pilot training.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-fuchsia-100">{p.step}</span>
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
                ["Timeline", "3–12 months"],
                ["MOQ", "1 unit"],
                ["Cert Support", "DGCA / FAA / EASA"],
                ["Payload", "Custom"],
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
            className="block text-center bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-fuchsia-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
