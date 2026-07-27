import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Download, FileText, Package, ChevronRight } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import logoImg from "../../assets/email-removebg-preview.png";

import productApex from "../../assets/3Rd eye.jpg";
import productSentinel from "../../assets/EX 950 Drone.webp";
import productCaddx from "../../assets/1.png";

import companyBrochurePdf from "../../assets/company-brochure.pdf";
import thirdEyeBrochurePdf from "../../assets/the-third-eye-brochure.pdf";

const categories = [
  {
    id: "industrial",
    label: "Industrial Drone",
    categorySlug: "/products",
    items: [
      { name: "THE THIRD EYE", slug: "/products/the-third-eye", id: "third-eye" },
      { name: "X950 Series", slug: "/products/sentinel-s-survey", id: "sentinel" },
    ],
  },
  {
    id: "survey",
    label: "Survey & Mapping",
    categorySlug: "/products/sentinel-s-survey",
    items: [
      { name: "Sentinel-S Survey", slug: "/products/sentinel-s-survey", id: "sentinel" },
    ],
  },
  {
    id: "fpv",
    label: "FPV & Cinematic",
    categorySlug: "/products",
    items: [
      { name: "Coming Soon (4K FPV)", slug: "/products", id: "caddx" },
    ],
  },
];

const products = [
  {
    id: "third-eye",
    name: "THE THIRD EYE",
    tagline: "Flagship Industrial Quadcopter",
    img: productApex,
    slug: "/products/the-third-eye",
    category: "industrial",
  },
  {
    id: "sentinel",
    name: "Sentinel-S Survey",
    tagline: "Long-Range Survey & Mapping",
    img: productSentinel,
    slug: "/products/sentinel-s-survey",
    category: "survey",
  },
  {
    id: "caddx",
    name: "Coming Soon",
    tagline: "True 4K Starlight Cinematic FPV",
    img: productCaddx,
    slug: "/products",
    category: "fpv",
  },
];

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products", hasDropdown: true },
  { to: "/rpto", label: "RPTO" },
  { to: "/3d-printing", label: "3D Printing" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

function BrochureMenuLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowProducts(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setShowProducts(false);
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="transition-all h-full flex items-center gap-1 relative border-b-2 border-transparent text-brand/70 hover:text-brand px-0.5 cursor-pointer uppercase font-medium tracking-wider text-[13px]"
      >
        <span>OUR BROCHURE</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-2xl shadow-xl border border-gray-150 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 normal-case tracking-normal text-left">
          <div className="px-3 py-2 border-b border-gray-100 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
              DOWNLOAD CENTER
            </span>
            <h4 className="text-xs font-bold text-gray-900 mt-0.5">Brochures & Catalogs</h4>
          </div>

          <div className="space-y-1.5">
            {/* 1. Company Brochure */}
            <a
              href={companyBrochurePdf}
              download="Wingspann_Global_Company_Brochure.pdf"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/80 transition-colors group cursor-pointer border border-transparent hover:border-indigo-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100/80 text-indigo-600 grid place-items-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Company Brochure
                  </div>
                  <div className="text-[10px] text-gray-500">Full company overview & capabilities</div>
                </div>
              </div>
              <Download size={15} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </a>

            {/* 2. Product Brochure (Accordion Downward Expansion) */}
            <div
              className="rounded-xl border border-gray-150 bg-gray-50/70 p-2 space-y-1 relative"
              onMouseEnter={() => setShowProducts(true)}
            >
              <button
                onClick={() => setShowProducts((prev) => !prev)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100/80 text-purple-600 grid place-items-center shrink-0">
                    <Package size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Product Brochure</div>
                    <div className="text-[10px] text-gray-500">Select UAV model (3 platforms)</div>
                  </div>
                </div>
                <ChevronDown
                  size={15}
                  className={`text-gray-400 transition-transform duration-200 ${
                    showProducts ? "rotate-180 text-purple-600" : ""
                  }`}
                />
              </button>

              {/* Product Submenu List (Expands Downwards) */}
              {showProducts && (
                <div className="space-y-1.5 pt-2 pl-1 pr-1 border-t border-gray-200/80 mt-1">
                  {/* 1. THE THIRD EYE */}
                  <a
                    href={thirdEyeBrochurePdf}
                    download="THE_THIRD_EYE_Brochure.pdf"
                    onClick={() => {
                      setIsOpen(false);
                      setShowProducts(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition-all group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          THE THIRD EYE
                        </div>
                        <div className="text-[10px] text-gray-400">Flagship Industrial Quadcopter</div>
                      </div>
                    </div>
                    <Download size={14} className="text-indigo-600 shrink-0" />
                  </a>

                  {/* 2. Sentinel-S Survey */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-100/70 border border-gray-200/50 opacity-75">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-gray-700">Sentinel-S Survey</div>
                        <div className="text-[10px] text-gray-400">Fixed-Wing Survey Platform</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                      Coming Soon
                    </span>
                  </div>

                  {/* 3. Coming Soon (4K FPV) */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-100/70 border border-gray-200/50 opacity-75">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-gray-700">Coming Soon (4K FPV)</div>
                        <div className="text-[10px] text-gray-400">Cinematic Starlight FPV</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                      Coming Soon
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setProductsOpen(false), 150);
  };

  // Filtered products
  let filteredProducts = products;
  if (activeProductId) {
    filteredProducts = products.filter((p) => p.id === activeProductId);
  } else if (activeCategory) {
    if (activeCategory === "industrial") {
      filteredProducts = products.filter((p) => p.id === "third-eye" || p.id === "sentinel");
    } else {
      filteredProducts = products.filter((p) => p.category === activeCategory);
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-brand/5 py-2.5"
          : "bg-white py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Wingspann Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-[13px] font-medium uppercase tracking-wider h-full">
          {links.map((l) =>
            "hasDropdown" in l && l.hasDropdown ? (
              /* Products with Full-Width Mega-Dropdown */
              <div
                key={l.to}
                className="h-full flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={dropdownRef}
              >
                <NavLink
                  to={l.to}
                  end={false}
                  className={({ isActive }) =>
                    `transition-all h-full flex items-center gap-1 relative border-b-2 px-0.5 ${isActive
                      ? "text-accent border-b-accent font-semibold"
                      : "text-brand/70 hover:text-brand border-transparent"
                    }`
                  }
                >
                  {l.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  />
                </NavLink>

                {/* Full-Width Edge-to-Edge Rectangle Mega Dropdown (EFT Style - Compact Height) */}
                <div
                  className={`absolute top-full left-0 right-0 w-full bg-white border-t border-b border-gray-200/80 shadow-xl transition-all duration-200 origin-top ${productsOpen
                      ? "opacity-100 visible translate-y-0 pointer-events-auto"
                      : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    }`}
                >
                  <div className="max-w-7xl mx-auto px-8 py-4 flex gap-10 items-start">
                    {/* Left Sidebar Categories */}
                    <div className="w-52 shrink-0 pr-6 border-r border-gray-150 flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                          <div key={cat.id} className="space-y-1">
                            {/* Category Header Link */}
                            <Link
                              to={cat.categorySlug}
                              onClick={() => setProductsOpen(false)}
                              onMouseEnter={() => {
                                setActiveCategory(cat.id);
                                setActiveProductId(null);
                              }}
                              className={`text-left text-[12px] font-bold transition-colors w-full cursor-pointer rounded-md px-2.5 py-1 block ${activeCategory === cat.id && activeProductId === null
                                  ? "text-indigo-600 bg-indigo-50/80"
                                  : "text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
                                }`}
                            >
                              {cat.label}
                            </Link>

                            {/* Sub-items */}
                            <div className="pl-2.5 flex flex-col gap-0.5 border-l-2 border-gray-100 ml-2">
                              {cat.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.slug}
                                  onClick={() => setProductsOpen(false)}
                                  onMouseEnter={() => {
                                    setActiveCategory(cat.id);
                                    setActiveProductId(item.id);
                                  }}
                                  className={`text-left text-[11px] py-0.5 px-2 rounded transition-colors block ${activeProductId === item.id
                                      ? "text-indigo-600 font-semibold bg-indigo-50/60"
                                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                                    }`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Product Grid (Compact Tiles like EFT) */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                          {activeProductId
                            ? products.find((p) => p.id === activeProductId)?.name
                            : activeCategory
                              ? categories.find((c) => c.id === activeCategory)?.label
                              : "Featured Drones"}
                        </p>
                        <Link
                          to="/products"
                          onClick={() => setProductsOpen(false)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider"
                        >
                          View All →
                        </Link>
                      </div>

                      {/* Product Grid — Compact EFT layout */}
                      <div className="flex flex-wrap gap-6 items-start">
                        {filteredProducts.map((p) => (
                          <Link
                            key={p.slug}
                            to={p.slug}
                            onClick={() => setProductsOpen(false)}
                            className="group flex flex-col items-center text-center gap-2"
                          >
                            {/* EFT Compact Light Gray Square Box Container */}
                            <div className="w-44 h-44 rounded-2xl bg-[#f7f8fa] hover:bg-[#eaecf0] transition-colors duration-200 flex items-center justify-center p-3 overflow-hidden shadow-sm border border-gray-100">
                              <img
                                src={p.img}
                                alt={p.name}
                                className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-108"
                              />
                            </div>
                            {/* Model Name Under Box */}
                            <p className="text-[13px] font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight normal-case tracking-normal">
                              {p.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `transition-all h-full flex items-center relative border-b-2 px-0.5 ${isActive
                    ? "text-accent border-b-accent font-semibold"
                    : "text-brand/70 hover:text-brand border-transparent"
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          )}
          <BrochureMenuLink />
        </div>

        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 -mr-2 text-brand"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-brand/5 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium uppercase tracking-wider border-b border-brand/5 last:border-0 ${isActive ? "text-accent font-semibold" : "text-brand/80 hover:text-accent"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
