import { useState, useRef } from "react";
import { Reveal } from "../components/site/Reveal";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Code,
  Upload,
  Trash2,
  CheckCircle2,
  ChevronRight,
  FileText,
  X
} from "lucide-react";
import careerHeroBg from "../assets/1000468625.jpg";
import { TurnstileWidget } from "../components/site/TurnstileWidget";

export default CareersPage;


interface RoleCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
}

const roleCategories: RoleCategory[] = [
  {
    id: "technical",
    title: "Technical Roles",
    subtitle: "Engineering, R&D & Manufacturing",
    description: "Design and build our core technologies. Work on embedded firmware, flight control software (GNC), composite structure layups, CAD modeling, and industrial additive manufacturing.",
    bulletPoints: [
      "Software & Embedded Systems",
      "Aerodynamics, FEA Stress Analysis & Composites Layout",
      "3D Printing, Prototyping & Mechanical Assembly"
    ]
  },
  {
    id: "non-technical",
    title: "Non-Technical Roles",
    subtitle: "Operations, Sales & HR",
    description: "Scale our growth, operations, and team logistics. Manage DGCA drone compliance, on-field operations, pilot dispatch, sales/marketing outreach, and talent recruitment pipelines.",
    bulletPoints: [
      "Technical Sales, Enterprise Partnerships & Field Ops",
      "Aerospace Program Management & DGCA Compliance",
      "HR, Recruiting, Finance & Global Logistics"
    ]
  }
];

function CareersPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [coverLetterDragActive, setCoverLetterDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  // File drag & drop states
  const [dragActive, setDragActive] = useState(false);

  const handleApplyClick = (category: RoleCategory) => {
    if (isFormOpen && selectedCategory?.id === category.id) {
      setIsFormOpen(false);
      return;
    }
    setSelectedCategory(category);
    setIsFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setResume(file);
      } else {
        alert("Please upload a PDF, DOC, or DOCX file (max 5MB).");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setResume(file);
      } else {
        alert("Please upload a PDF, DOC, or DOCX file (max 5MB).");
      }
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const isRightType = validTypes.includes(file.type) || file.name.endsWith(".pdf") || file.name.endsWith(".doc") || file.name.endsWith(".docx");
    const isRightSize = file.size <= 5 * 1024 * 1024; // 5MB limit
    return isRightType && isRightSize;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please select a role category to apply for.");
      return;
    }
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }
    if (!turnstileToken) {
      alert("Please complete the security check.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("source", "careers");
      payload.append("name", name);
      payload.append("email", email);
      if (phone) payload.append("phone", phone);
      payload.append("subject", selectedCategory.title);
      payload.append("message", message || `Application for ${selectedCategory.title}`);
      payload.append("turnstileToken", turnstileToken);
      payload.append("file", resume);

      const res = await fetch("/api/submit", {
        method: "POST",
        body: payload,
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setResume(null);
    setCoverLetter(null);
    setIsSubmitted(false);
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const handleCoverLetterDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setCoverLetterDragActive(true);
    } else if (e.type === "dragleave") {
      setCoverLetterDragActive(false);
    }
  };

  const handleCoverLetterDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverLetterDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        if (file.size <= 5 * 1024 * 1024) {
          setCoverLetter(file);
        } else {
          alert("Cover letter must be under 5MB.");
        }
      } else {
        alert("Please upload a PDF file for the cover letter.");
      }
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        if (file.size <= 5 * 1024 * 1024) {
          setCoverLetter(file);
        } else {
          alert("Cover letter must be under 5MB.");
        }
      } else {
        alert("Please upload a PDF file for the cover letter.");
      }
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#0B0D13] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 13, 19, 0.45), rgba(11, 13, 19, 0.75)), url(${careerHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Subtle grid layout background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        {/* Glowing backdrop elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-indigo-500/10 pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-blue-500/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-indigo-400 mb-4">
              <span className="w-8 h-px bg-indigo-500/30" />
              Careers at Wingspann
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white mb-6 leading-none">
              Shape the Future <br className="hidden sm:inline" /> of Autonomous Flight
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We design, build, and deploy mission-critical UAV systems. Join our team of aerospace, electronics, software, and operational specialists to build flight hardware that matters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Jobs / Categories Section */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Select Your Career Track
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
              Choose the profile category that matches your skills. Click Apply Now to submit your resume directly to our talent team.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Card */}
          <Reveal delay={0.05}>
            <div className="group relative h-full bg-white border border-gray-150 hover:border-blue-200 rounded-[2.5rem] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between">
              <div>
                <div className="size-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code size={28} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                  {roleCategories[0].subtitle}
                </span>
                <h3 className="font-display font-black text-2xl text-gray-900 mt-2 mb-4 group-hover:text-blue-650 transition-colors">
                  {roleCategories[0].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {roleCategories[0].description}
                </p>
                <div className="space-y-3 mb-8">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Core Disciplines:</h4>
                  <ul className="space-y-2">
                    {roleCategories[0].bulletPoints.map((pt, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2.5">
                        <span className="text-blue-500 mt-1 shrink-0">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleApplyClick(roleCategories[0])}
                className={`w-full py-4 border text-xs font-bold uppercase tracking-widest transition-all rounded-2xl flex items-center justify-center gap-2 cursor-pointer ${
                  isFormOpen && selectedCategory?.id === roleCategories[0].id
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : "border-blue-100 group-hover:border-blue-500 text-blue-600 group-hover:text-white group-hover:bg-blue-600"
                }`}
              >
                {isFormOpen && selectedCategory?.id === roleCategories[0].id
                  ? "Hide Application Form"
                  : "Apply for Tech Roles"}{" "}
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ${
                    isFormOpen && selectedCategory?.id === roleCategories[0].id ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </Reveal>

          {/* Non-Technical Card */}
          <Reveal delay={0.12}>
            <div className="group relative h-full bg-white border border-gray-150 hover:border-indigo-200 rounded-[2.5rem] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between">
              <div>
                <div className="size-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={28} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                  {roleCategories[1].subtitle}
                </span>
                <h3 className="font-display font-black text-2xl text-gray-900 mt-2 mb-4 group-hover:text-indigo-650 transition-colors">
                  {roleCategories[1].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {roleCategories[1].description}
                </p>
                <div className="space-y-3 mb-8">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Core Disciplines:</h4>
                  <ul className="space-y-2">
                    {roleCategories[1].bulletPoints.map((pt, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2.5">
                        <span className="text-indigo-500 mt-1 shrink-0">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleApplyClick(roleCategories[1])}
                className={`w-full py-4 border text-xs font-bold uppercase tracking-widest transition-all rounded-2xl flex items-center justify-center gap-2 cursor-pointer ${
                  isFormOpen && selectedCategory?.id === roleCategories[1].id
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                    : "border-indigo-100 group-hover:border-indigo-600 text-indigo-600 group-hover:text-white group-hover:bg-indigo-600"
                }`}
              >
                {isFormOpen && selectedCategory?.id === roleCategories[1].id
                  ? "Hide Application Form"
                  : "Apply for Non-Tech Roles"}{" "}
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ${
                    isFormOpen && selectedCategory?.id === roleCategories[1].id ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application Form Section (Dropdown Expansion Panel) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.section
            ref={formRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#0B0D13] text-white border-t border-gray-800 scroll-mt-20"
          >
            <div className="py-20 max-w-3xl mx-auto px-6 relative">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="absolute right-6 top-8 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Application Form"
              >
                <X size={22} />
              </button>

              <Reveal>
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-indigo-400 mb-3">
                    Join the Squad
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">
                    Submit Your Application
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
                    Fill out your details below and upload your resume for the{" "}
                    <span className="text-white font-bold">{selectedCategory?.title || "selected track"}</span>.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-6">
                      <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-400 grid place-items-center mx-auto mb-2 animate-bounce">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">Application Received!</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you for applying for the <span className="text-indigo-400 font-semibold">{selectedCategory?.title}</span> track. Our talent team will review your profile and contact you within 5-7 business days.
                      </p>
                      <button
                        onClick={handleResetForm}
                        className="mt-6 px-6 py-3 border border-white/20 hover:border-white/40 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all rounded-lg"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Selected Role Category Banner */}
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">
                            Selected Career Track
                          </span>
                          <h4 className="text-base font-bold text-white">
                            {selectedCategory ? selectedCategory.title : "No Track Selected"}
                          </h4>
                        </div>
                        <div>
                          <select
                            value={selectedCategory?.id || ""}
                            onChange={(e) => {
                              const found = roleCategories.find((cat) => cat.id === e.target.value);
                              setSelectedCategory(found || null);
                            }}
                            className="bg-[#12141C] border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl text-white outline-none focus:border-indigo-500/80 cursor-pointer"
                            required
                          >
                            <option value="" disabled>Select a track...</option>
                            {roleCategories.map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* General inputs */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-[#12141C] border border-white/10 text-sm px-5 py-3.5 rounded-xl text-white outline-none focus:border-indigo-500 focus:bg-[#12141C]/80 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@company.com"
                            className="w-full bg-[#12141C] border border-white/10 text-sm px-5 py-3.5 rounded-xl text-white outline-none focus:border-indigo-500 focus:bg-[#12141C]/80 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-[#12141C] border border-white/10 text-sm px-5 py-3.5 rounded-xl text-white outline-none focus:border-indigo-500 focus:bg-[#12141C]/80 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Uploads Section (Side-by-Side Grid) */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Resume Upload Dropzone */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Resume / CV *</label>
                          <div
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-[1.25rem] p-4 text-center transition-all flex items-center justify-center min-h-[90px] ${dragActive
                                ? "border-indigo-500 bg-indigo-500/5"
                                : resume
                                  ? "border-emerald-500/50 bg-emerald-500/5"
                                  : "border-white/10 hover:border-white/20 bg-white/[0.01]"
                              }`}
                          >
                            <input
                              type="file"
                              id="resume-upload"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                            />

                            {resume ? (
                              <div className="flex items-center justify-between gap-3 text-left w-full">
                                <div className="flex items-center gap-3">
                                  <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <FileText size={18} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-white truncate max-w-[150px]">{resume.name}</p>
                                    <p className="text-[10px] text-gray-400">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setResume(null)}
                                  className="text-rose-455 hover:text-rose-400 transition-colors p-1"
                                  title="Remove file"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ) : (
                              <label
                                htmlFor="resume-upload"
                                className="cursor-pointer w-full block"
                              >
                                <div className="flex items-center justify-center gap-3">
                                  <div className="size-9 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center shrink-0">
                                    <Upload size={18} />
                                  </div>
                                  <div className="text-left leading-tight">
                                    <div>
                                      <span className="text-indigo-400 font-bold text-xs hover:underline">Click to upload</span>
                                      <span className="text-gray-450 text-xs"> or drag & drop</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-0.5">PDF, DOC, or DOCX (max 5MB)</p>
                                  </div>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Optional Cover Letter PDF Upload */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Cover Letter PDF</label>
                            <span className="text-[9px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-full leading-none">Optional</span>
                          </div>
                          <div
                            onDragEnter={handleCoverLetterDrag}
                            onDragOver={handleCoverLetterDrag}
                            onDragLeave={handleCoverLetterDrag}
                            onDrop={handleCoverLetterDrop}
                            className={`relative border-2 border-dashed rounded-[1.25rem] p-4 text-center transition-all flex items-center justify-center min-h-[90px] ${coverLetterDragActive
                                ? "border-indigo-500 bg-indigo-500/5"
                                : coverLetter
                                  ? "border-emerald-500/50 bg-emerald-500/5"
                                  : "border-white/10 hover:border-white/20 bg-white/[0.01]"
                              }`}
                          >
                            <input
                              type="file"
                              id="cover-letter-upload"
                              onChange={handleCoverLetterChange}
                              accept=".pdf"
                              className="hidden"
                            />
                            {coverLetter ? (
                              <div className="flex items-center justify-between gap-3 text-left w-full">
                                <div className="flex items-center gap-3">
                                  <div className="size-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                    <FileText size={18} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-white truncate max-w-[150px]">{coverLetter.name}</p>
                                    <p className="text-[10px] text-gray-400">{(coverLetter.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setCoverLetter(null)}
                                  className="text-rose-455 hover:text-rose-400 transition-colors p-1"
                                  title="Remove file"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ) : (
                              <label htmlFor="cover-letter-upload" className="cursor-pointer w-full block">
                                <div className="flex items-center justify-center gap-3">
                                  <div className="size-9 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center shrink-0">
                                    <Upload size={18} />
                                  </div>
                                  <div className="text-left leading-tight">
                                    <div>
                                      <span className="text-indigo-400 font-bold text-xs hover:underline">Click to upload</span>
                                      <span className="text-gray-450 text-xs"> or drag & drop</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-0.5">PDF only (max 5MB)</p>
                                  </div>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Written Message */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Message <span className="normal-case font-normal text-gray-500">(optional)</span></label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about yourself and why you're a great fit for Wingspann..."
                          rows={4}
                          className="w-full bg-[#12141C] border border-white/10 text-sm px-5 py-4 rounded-xl text-white outline-none focus:border-indigo-500 focus:bg-[#12141C]/80 transition-colors resize-none"
                        />
                      </div>

                      {/* Turnstile Abuse Protection */}
                      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold uppercase text-xs tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-500/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

