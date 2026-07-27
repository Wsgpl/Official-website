import { Link } from "react-router-dom";
import printBg from "../assets/3D1.webp";

export default PrintingServicesPage;


function PrintingServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={printBg}
          alt="3D Printing Services"
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
            style={{ background: "#eab30818", color: "#fbbf24", border: "1px solid #eab30840" }}
          >
            Additive
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            3D Printing Services
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            Industrial FDM, SLA, SLS and DMLS — CFR-Nylon, ULTEM, PEEK and titanium. STL to part in
            48 hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              From single prototypes to short-run production batches, our industrial additive
              manufacturing floor handles the most demanding materials and geometries. All parts are
              post-processed and certified with full material traceability.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Materials & Processes</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "CFR-Nylon (FDM)",
                "ULTEM 9085 (FDM)",
                "PEEK (FDM)",
                "Titanium Ti-6Al-4V (DMLS)",
                "Resin (SLA, sub-50µm)",
                "TPU / Elastomers",
                "PA12 / PA11 (SLS)",
                "Stainless Steel (DMLS)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-yellow-50 rounded-xl px-4 py-3 text-[14px] text-yellow-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Process</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Upload",
                  desc: "Drop your STL / STEP / OBJ file and we analyze geometry instantly.",
                },
                {
                  step: "02",
                  title: "Quote",
                  desc: "Material, infill and finish options scoped within hours.",
                },
                {
                  step: "03",
                  title: "Print",
                  desc: "Calibrated industrial machines run 24/7 with full QA.",
                },
                {
                  step: "04",
                  title: "Ship",
                  desc: "Post-processed and shipped — typically in 48–72 hours.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-yellow-100">{p.step}</span>
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
                ["Lead Time", "48–72 hours"],
                ["Processes", "FDM, SLA, SLS, DMLS"],
                ["Tolerances", "±0.1 mm"],
                ["Formats", "STL, STEP, OBJ"],
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
            className="block text-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-yellow-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
