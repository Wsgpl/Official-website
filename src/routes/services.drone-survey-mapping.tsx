import { Link } from "react-router-dom";
import mappingBg from "../assets/mapping.png";

export default DroneSurveyMappingPage;


function DroneSurveyMappingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={mappingBg}
          alt="Drone Survey & Mapping"
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
            style={{ background: "#22c55e18", color: "#4ade80", border: "1px solid #22c55e40" }}
          >
            Survey
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Drone Survey & Mapping
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            RTK/PPK workflows delivering centimeter-grade orthomosaics, DSM/DTM, contour lines and
            textured 3D meshes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              We deploy RTK and PPK-enabled UAVs to collect aerial imagery and LiDAR data at
              survey-grade accuracy. Ground Control Point workflows validate outputs to sub-5cm
              horizontal and vertical accuracy, delivering GIS-ready files in all major formats.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deliverables</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Orthomosaic (GeoTIFF/ECW)",
                "Digital Surface Model (DSM)",
                "Digital Terrain Model (DTM)",
                "Contour lines (DXF/SHP)",
                "Textured 3D mesh (OBJ/LAS)",
                "Point cloud (LAZ/LAS)",
                "Volumetric calculations",
                "GCP-validated survey report",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 text-[14px] text-green-800 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Workflow</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Site Assessment",
                  desc: "Airspace clearance, GCP planning and flight-path design.",
                },
                {
                  step: "02",
                  title: "Data Acquisition",
                  desc: "RTK/PPK-enabled drone flights with calibrated cameras or LiDAR.",
                },
                {
                  step: "03",
                  title: "Processing",
                  desc: "Photogrammetry or LiDAR processing pipeline with GCP integration.",
                },
                {
                  step: "04",
                  title: "Delivery",
                  desc: "GIS-ready outputs uploaded to your cloud portal within 48 hours.",
                },
              ].map((p) => (
                <div key={p.step} className="flex gap-5 p-5 rounded-2xl border border-gray-100">
                  <span className="text-3xl font-black text-green-100">{p.step}</span>
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
                ["Accuracy", "Sub-5 cm H/V"],
                ["Coverage", "Up to 500 ha/day"],
                ["Sensors", "RGB, LiDAR, MS"],
                ["Formats", "GeoTIFF, LAZ, SHP"],
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
            className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Request Quote ↗
          </Link>
          <Link
            to="/services"
            className="block text-center border border-gray-200 text-gray-600 hover:border-green-300 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            ← Back to Services
          </Link>
        </aside>
      </div>
    </div>
  );
}
