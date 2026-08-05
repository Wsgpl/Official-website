import { Link } from "react-router-dom";
import infraBg from "../assets/infra.jpg";

export default InfrastructureInspectionPage;


function InfrastructureInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={infraBg}
          alt="Infrastructure Inspection"
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
            style={{ background: "#f9731618", color: "#fb923c", border: "1px solid #f9731640" }}
          >
            Inspection
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Infrastructure Inspection
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            RGB + thermal + LiDAR inspection of towers, bridges, dams and turbines. No scaffolding,
            no outage.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              We deploy multi-sensor drones to inspect critical infrastructure safely and
              efficiently. AI-assisted defect detection identifies cracks, corrosion, thermal
              anomalies and structural deformations all without scaffolding, rope access or
              shutdowns.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assets We Inspect</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Wind turbines & solar farms",
                "High-voltage transmission lines",
                "Bridges & viaducts",
                "Dams & reservoirs",
                "Chimney stacks & flare towers",
                "Oil & gas pipelines",
                "Communication towers",
                "Industrial boilers & tanks",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-orange-50 rounded-xl px-4 py-3 text-[14px] text-orange-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
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
                  title: "Mission Planning",
                  desc: "Airspace clearance, risk assessment and automated flight path generation.",
                },
                {
                  step: "02",
                  title: "Data Capture",
                  desc: "RGB, thermal and LiDAR sensors flown simultaneously for full coverage.",
                },
                {
                  step: "03",
                  title: "AI Analysis",
                  desc: "Defect detection algorithms flag anomalies with severity ratings.",
                },
                {
                  step: "04",
                  title: "Report Delivery",
                  desc: "Georeferenced inspection report integrated with your CMMS/asset platform.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-orange-100">{p.step}</span>
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
                ["Sensors", "RGB, Thermal, LiDAR"],
                ["Detection", "AI-assisted"],
                ["Output", "CMMS-ready report"],
                ["Availability", "24/7 operations"],
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
            className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-orange-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
