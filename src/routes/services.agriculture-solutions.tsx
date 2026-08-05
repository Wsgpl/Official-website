import { Link } from "react-router-dom";
import agriBg from "../assets/agri.jpg";

export default AgricultureSolutionsPage;


function AgricultureSolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={agriBg}
          alt="Agriculture Solutions"
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
            style={{ background: "#84cc1618", color: "#a3e635", border: "1px solid #84cc1640" }}
          >
            Agriculture
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Agriculture Solutions
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            NDVI multispectral analysis, prescription spraying and variable-rate seeding reducing
            inputs by up to 60%.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Our precision agriculture platform combines multispectral imaging, AI-powered crop
              analytics and variable-rate drone operations. Targeted inputs reduce chemical usage by
              up to 60% while improving yield outcomes and integrating seamlessly with existing farm
              management systems.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "NDVI & NDRE multispectral mapping",
                "Prescription spray missions",
                "Variable-rate seeding",
                "Crop health monitoring",
                "Yield zone mapping",
                "Soil moisture analysis",
                "Pest & disease detection",
                "Farm management integration",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-lime-50 rounded-xl px-4 py-3 text-[14px] text-lime-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-lime-500 flex-shrink-0" />
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
                  title: "Scout & Map",
                  desc: "Multispectral flight captures crop health indices across entire field.",
                },
                {
                  step: "02",
                  title: "Analyze",
                  desc: "AI algorithms generate prescription maps identifying treatment zones.",
                },
                {
                  step: "03",
                  title: "Apply",
                  desc: "Drone executes variable-rate spray or seed mission from prescription file.",
                },
                {
                  step: "04",
                  title: "Monitor",
                  desc: "Follow-up flights track crop response and ROI validation.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-lime-100">{p.step}</span>
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
                ["Input Savings", "Up to 60%"],
                ["Sensors", "NDVI, NDRE, RGB"],
                ["Tank Capacity", "Up to 40 L"],
                ["Coverage", "Up to 200 ha/day"],
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
            className="block text-center bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-lime-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
