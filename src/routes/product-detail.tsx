import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowUpRight,
  Download,
  Shield,
  Zap,
  Radio,
  Cpu,
  Compass,
  Map,
  Wind,
  Eye,
  ShieldAlert,
  CheckCircle2,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "../components/site/Reveal";
import { FAQSection } from "../components/site/FAQSection";
import { QuoteForm } from "../components/site/QuoteForm";
import { X } from "lucide-react";

interface CardItem {
  icon?: string;
  title: string;
  description: string;
}

interface FeatureGridBlock {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cards: CardItem[];
}

interface SpecRow {
  label: string;
  value: string;
}

interface SpecCategory {
  categoryName: string;
  rows: SpecRow[];
}

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface MiniFeature {
  title: string;
  description: string;
}

interface SideInfoCard {
  title: string;
  items: SpecRow[];
}

interface MediaSectionBlock {
  title: string;
  description?: string;
  mediaUrls?: MediaItem[];
  miniFeatures?: MiniFeature[];
  sideInfoCard?: SideInfoCard;
}

interface StatBarItem {
  value: string;
  unit: string;
  label: string;
}

export interface ProductDetailData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  categoryEyebrow?: string;
  badge?: string;
  themeColor?: string;
  flightTime?: string;
  payload?: string;
  range?: string;
  applications?: string[];
  imagePath?: string;
  status: string;
  statHighlights?: SpecRow[];
  heroLogoUrl?: string;
  heroDescription?: string;
  heroMediaUrl?: string;
  heroMediaType?: "image" | "video";
  brochureUrl?: string;
  heroStats?: SpecRow[];
  featureGrids?: FeatureGridBlock[];
  specSheet?: SpecCategory[];
  mediaSections?: MediaSectionBlock[];
  statsBar?: StatBarItem[];
}

const ICON_MAP: Record<string, any> = {
  Shield,
  Zap,
  Radio,
  Cpu,
  Compass,
  Map,
  Wind,
  Eye,
  ShieldAlert,
  CheckCircle2,
  FileText,
};

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    async function fetchProductDetail() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (res.ok && data.success && data.product) {
          setProduct(data.product);
        } else {
          setError(data.error || "Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading product specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">{error || "The requested product platform does not exist."}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Theme Styling Configuration
  const isBlueTheme = product.themeColor === "blue";
  const isCyanTheme = product.themeColor === "cyan";
  const isEmeraldTheme = product.themeColor === "emerald";

  const themeGradient = isBlueTheme
    ? "linear-gradient(90deg,#3b82f6,#06b6d4)"
    : isCyanTheme
    ? "linear-gradient(90deg,#06b6d4,#3b82f6)"
    : isEmeraldTheme
    ? "linear-gradient(90deg,#10b981,#059669)"
    : "linear-gradient(90deg,#6366f1,#a855f7)";

  const accentBadgeClass = isBlueTheme
    ? "text-blue-500"
    : isCyanTheme
    ? "text-cyan-500"
    : isEmeraldTheme
    ? "text-emerald-500"
    : "text-indigo-500";

  const accentLineClass = isBlueTheme
    ? "bg-blue-400"
    : isCyanTheme
    ? "bg-cyan-400"
    : isEmeraldTheme
    ? "bg-emerald-400"
    : "bg-indigo-400";

  const primaryBtnClass = isBlueTheme
    ? "bg-blue-600 hover:bg-blue-700"
    : isCyanTheme
    ? "bg-cyan-600 hover:bg-cyan-700"
    : isEmeraldTheme
    ? "bg-emerald-600 hover:bg-emerald-700"
    : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pt-24 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${accentBadgeClass}`}>
                    <span className={`w-6 h-px ${accentLineClass}`} />
                    {product.categoryEyebrow || "INDUSTRIAL UAV PLATFORM"}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase bg-gray-900 text-white rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                {product.heroLogoUrl && (
                  <img
                    src={product.heroLogoUrl}
                    alt={`${product.name} Logo`}
                    className="h-12 w-auto object-contain mb-4"
                  />
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-gray-900">
                  <span style={{ background: themeGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {product.name}
                  </span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl pt-2">
                  {product.heroDescription || product.tagline}
                </p>
              </Reveal>

              {/* Action Buttons & Brochure Download */}
              <Reveal>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className={`inline-flex items-center gap-2 px-7 py-3.5 ${primaryBtnClass} text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all`}
                  >
                    Request Quote
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {product.brochureUrl && (
                    <a
                      href={product.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition"
                    >
                      <Download className="w-4 h-4 text-gray-500" />
                      Download Brochure
                    </a>
                  )}
                </div>
              </Reveal>

              {/* Stat Badges under Hero Title */}
              {(product.heroStats || product.statHighlights) && (
                <Reveal>
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-lg">
                    {(product.heroStats || product.statHighlights || []).map((st, i) => (
                      <div key={i} className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100/80">
                        <div className="text-xl font-black text-gray-900">{st.value}</div>
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-900 group">
                  {product.heroMediaUrl ? (
                    product.heroMediaType === "video" ? (
                      <video
                        src={product.heroMediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-[400px] object-cover"
                      />
                    ) : (
                      <img
                        src={product.heroMediaUrl}
                        alt={product.name}
                        className="w-full h-[400px] object-cover"
                      />
                    )
                  ) : product.imagePath ? (
                    <img
                      src={product.imagePath}
                      alt={product.name}
                      className="w-full h-[400px] object-cover"
                    />
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE GRIDS (Repeatable Blocks) ── */}
      {product.featureGrids && product.featureGrids.length > 0 && (
        <div className="space-y-16 py-20 bg-white border-b border-gray-100">
          {product.featureGrids.map((block, bIdx) => (
            <section key={bIdx} className="max-w-7xl mx-auto px-6">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto mb-14">
                  {block.eyebrow && (
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accentBadgeClass} block mb-3`}>
                      {block.eyebrow}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{block.title}</h2>
                  {block.subtitle && <p className="text-gray-500 text-base md:text-lg">{block.subtitle}</p>}
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {block.cards.map((card, cIdx) => {
                  const IconComp = card.icon && ICON_MAP[card.icon] ? ICON_MAP[card.icon] : CheckCircle2;
                  return (
                    <Reveal key={cIdx}>
                      <div className="bg-gray-50/60 p-7 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg h-full flex flex-col justify-between">
                        <div>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white border border-gray-100 shadow-sm ${accentBadgeClass}`}>
                            <IconComp className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ── TECHNICAL SPECIFICATIONS SHEET ── */}
      {product.specSheet && product.specSheet.length > 0 && (
        <section className="py-20 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="mb-12">
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accentBadgeClass} block mb-2`}>
                  DATA SHEET
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Technical Specifications</h2>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-8">
              {product.specSheet.map((cat, catIdx) => (
                <Reveal key={catIdx}>
                  <div className="bg-white p-7 rounded-2xl border border-gray-200/70 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${accentLineClass}`} />
                      {cat.categoryName}
                    </h3>
                    <div className="space-y-4">
                      {cat.rows.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-start text-sm pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                          <span className="text-gray-500 font-medium">{row.label}</span>
                          <span className="text-gray-900 font-semibold text-right max-w-[60%]">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MEDIA SHOWCASE SECTIONS ── */}
      {product.mediaSections && product.mediaSections.length > 0 && (
        <div className="py-20 space-y-24 bg-white border-b border-gray-100">
          {product.mediaSections.map((sec, secIdx) => (
            <section key={secIdx} className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <Reveal>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{sec.title}</h2>
                    {sec.description && <p className="text-gray-600 text-lg leading-relaxed">{sec.description}</p>}
                  </Reveal>

                  {/* Mini Features */}
                  {sec.miniFeatures && sec.miniFeatures.length > 0 && (
                    <div className="space-y-4 pt-4">
                      {sec.miniFeatures.map((mf, mfIdx) => (
                        <Reveal key={mfIdx}>
                          <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${accentBadgeClass}`} />
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm mb-1">{mf.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{mf.description}</p>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}

                  {/* Side Stat Card */}
                  {sec.sideInfoCard && (
                    <Reveal>
                      <div className="p-6 rounded-2xl bg-gray-900 text-white space-y-3 mt-6">
                        <h4 className="font-bold text-sm text-gray-300 uppercase tracking-wider">{sec.sideInfoCard.title}</h4>
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          {sec.sideInfoCard.items.map((item, iIdx) => (
                            <div key={iIdx}>
                              <div className="text-xs text-gray-400">{item.label}</div>
                              <div className="text-base font-bold text-white mt-0.5">{item.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Media Player Column */}
                {sec.mediaUrls && sec.mediaUrls.length > 0 && (
                  <div className="lg:col-span-6">
                    <Reveal>
                      <div className="space-y-4">
                        {sec.mediaUrls.map((med, mIdx) => (
                          <div key={mIdx} className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-900">
                            {med.type === "video" ? (
                              <video
                                src={med.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-[320px] object-cover"
                              />
                            ) : (
                              <img
                                src={med.url}
                                alt={sec.title}
                                className="w-full h-[320px] object-cover"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ── STATS BAR (Dark Bottom Banner) ── */}
      {product.statsBar && product.statsBar.length > 0 && (
        <section className="bg-gray-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {product.statsBar.map((sb, sbIdx) => (
                <Reveal key={sbIdx}>
                  <div className="text-center p-6 rounded-2xl bg-gray-900/60 border border-gray-800">
                    <div className="text-3xl md:text-4xl font-black tracking-tight text-white mb-1">
                      {sb.value} <span className={`text-base font-bold ${accentBadgeClass}`}>{sb.unit}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sb.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Request Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsQuoteOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Request Quote for {product.name}</h3>
            <p className="text-gray-500 text-sm mb-6">Fill out your contact info and our industrial UAV team will send a formal proposal.</p>
            <QuoteForm defaultTopic="quote" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
