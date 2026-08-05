import { Link } from "react-router-dom";
import heroBg from "../assets/hero-drone.jpg";

export default RapidPrototypingPage;


function RapidPrototypingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={heroBg}
          alt="Rapid Prototyping"
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
            style={{ background: "#14b8a618", color: "#2dd4bf", border: "1px solid #14b8a640" }}
          >
            R&D
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Rapid Prototyping
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            Hardware ideas to flying prototypes in days. Mechanical, electronics, firmware and
            flight-test in one team.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our cross-functional engineering team collapses the concept-to-validation gap.
              Mechanical design, electronics, embedded firmware and flight-test all happen under one
              roof giving you a flying prototype in days, not months.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Capabilities</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "DFM/DFA design reviews",
                "Electronics schematic & PCB",
                "Embedded firmware development",
                "3D-printed structural parts",
                "Iterative test cycles",
                "Flight-envelope validation",
                "Pilot production runs",
                "Tech-transfer documentation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-teal-50 rounded-xl px-4 py-3 text-[14px] text-teal-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
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
                  title: "Concept Review",
                  desc: "Feasibility analysis, requirements capture and DFM review.",
                },
                {
                  step: "02",
                  title: "Build Sprint",
                  desc: "Mechanical, electronics and firmware developed in parallel sprints.",
                },
                {
                  step: "03",
                  title: "Bench Test",
                  desc: "Lab validation of all subsystems before integration.",
                },
                {
                  step: "04",
                  title: "Flight Test",
                  desc: "Outdoor test-flight validation with data logging and iteration.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-teal-100">{p.step}</span>
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
                ["Time to Prototype", "5–15 days"],
                ["Team", "Mech + Elec + FW"],
                ["Iterations", "Unlimited"],
                ["Output", "Flight-ready unit"],
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
            className="block text-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-teal-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
