import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TurnstileWidget } from "../components/site/TurnstileWidget";
import {
  Inbox,
  FileText,
  Package,
  LogOut,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldAlert,
  Download,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface SubmissionItem {
  submission: {
    id: string;
    createdAt: string;
    source: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    status: string;
    notified: boolean;
  };
  upload?: {
    id: string;
    originalFilename: string;
    storedPath: string;
    mimeType: string;
    sizeBytes: number;
  };
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: string;
  createdAt: string;
}

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  flightTime?: string;
  payload?: string;
  range?: string;
  status: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<"submissions" | "blog" | "products">("submissions");

  // Data States
  const [submissionsList, setSubmissionsList] = useState<SubmissionItem[]>([]);
  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [productsList, setProductsList] = useState<ProductItem[]>([]);

  // Blog Form State
  const [newBlog, setNewBlog] = useState({ slug: "", title: "", excerpt: "", body: "" });
  const [creatingBlog, setCreatingBlog] = useState(false);

  // Product Editor Modal State
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // 1. Check Authentication on Mount
  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        loadDashboardData();
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function loadDashboardData() {
    fetchSubmissions();
    fetchBlogPosts();
    fetchProducts();
  }

  async function fetchSubmissions() {
    try {
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionsList(data.submissions || []);
      }
    } catch (err) {
      toast.error("Failed to load submissions.");
    }
  }

  async function fetchBlogPosts() {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogList(data.posts || []);
      }
    } catch (err) {
      toast.error("Failed to load blog posts.");
    }
  }

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (res.ok && data.success) {
        setProductsList(data.products || []);
      }
    } catch (err) {
      toast.error("Failed to load products.");
    }
  }

  // 2. Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the Turnstile security check.");
      return;
    }

    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstileToken }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      toast.success(`Welcome back, ${data.user.name}!`);
      setUser(data.user);
      loadDashboardData();
    } catch (err: any) {
      toast.error(err.message || "Invalid login credentials.");
    } finally {
      setLoggingIn(false);
    }
  }

  // 3. Handle Logout
  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Logout failed.");
    }
  }

  // 4. Update Submission Status
  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success("Submission status updated.");
        fetchSubmissions();
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  }

  // 5. Create Blog Post
  async function handleCreateBlog(e: React.FormEvent) {
    e.preventDefault();
    setCreatingBlog(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Blog post created!");
        setNewBlog({ slug: "", title: "", excerpt: "", body: "" });
        fetchBlogPosts();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create blog post.");
    } finally {
      setCreatingBlog(false);
    }
  }

  // 6. Delete Blog Post
  async function handleDeleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog post deleted.");
        fetchBlogPosts();
      }
    } catch (err) {
      toast.error("Failed to delete post.");
    }
  }

  // 7. Save Product (Create or Update)
  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;
    setSavingProduct(true);
    try {
      const isEdit = Boolean(editingProduct.id);
      const url = isEdit ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isEdit ? "Product specification updated!" : "New product created!");
        setIsProductEditorOpen(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        toast.error(data.error || "Failed to save product.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save product.");
    } finally {
      setSavingProduct(false);
    }
  }

  // File upload helper for product media (hero media, logo, brochure PDF, section media)
  async function handleUploadPublicFile(file: File): Promise<string | null> {
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/products/upload-media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        toast.success(`Uploaded '${file.name}' successfully!`);
        return data.url;
      } else {
        toast.error(data.error || "Upload failed security validation.");
        return null;
      }
    } catch (err) {
      console.error("Public upload error:", err);
      toast.error("Failed to upload file.");
      return null;
    } finally {
      setUploadingFile(false);
    }
  }

  // 8. Delete Product
  async function handleDeleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted.");
        fetchProducts();
      }
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <span className="size-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm">Verifying Admin Session…</span>
        </div>
      </div>
    );
  }

  // ─── LOGIN VIEW ───
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-amber-400/10 text-amber-400 rounded-xl mb-2">
              <ShieldAlert size={28} />
            </div>
            <h1 className="text-2xl font-bold font-display text-white">Wingspann Admin Portal</h1>
            <p className="text-xs text-slate-400">Restricted Access — Please login with your administrator credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wingspannglobal.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Turnstile Protection */}
            <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              {loggingIn ? "Authenticating…" : "Sign In to Admin Portal"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD VIEW ───
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold font-mono">
            W
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">Wingspann Operations Control</h2>
            <p className="text-xs text-slate-400">LoggedIn as {user.name} ({user.email})</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          Logout
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "submissions"
                ? "bg-amber-400 text-slate-950"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Inbox size={16} />
            Submissions Inbox ({submissionsList.length})
          </button>

          <button
            onClick={() => setActiveTab("blog")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "blog"
                ? "bg-amber-400 text-slate-950"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <FileText size={16} />
            Blog Posts ({blogList.length})
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === "products"
                ? "bg-amber-400 text-slate-950"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Package size={16} />
            Products ({productsList.length})
          </button>
        </div>

        {/* ── SUBMISSIONS INBOX TAB ── */}
        {activeTab === "submissions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Incoming Leads & Enquiries</h3>
              {submissionsList.some((item) => !item.submission.notified) && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  ⚠️ {submissionsList.filter((i) => !i.submission.notified).length} Unnotified Submissions
                </span>
              )}
            </div>

            {submissionsList.some((item) => !item.submission.notified) && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3 text-xs text-amber-300">
                <ShieldAlert size={18} className="text-amber-400 shrink-0" />
                <span>
                  <strong>Email Delivery Alert:</strong> Submissions marked with ❌ Email Delivery Failed did not trigger an outbound email (due to tenant SMTP AUTH restrictions or missing API keys). All lead data is safely stored here in your database.
                </span>
              </div>
            )}

            {submissionsList.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                No submissions received yet.
              </div>
            ) : (
              <div className="grid gap-4">
                {submissionsList.map(({ submission: sub, upload: file }) => (
                  <div
                    key={sub.id}
                    className={`p-6 rounded-2xl bg-slate-900 border space-y-3 ${
                      !sub.notified ? "border-rose-500/40 bg-rose-950/10" : "border-slate-800"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          {sub.source}
                        </span>
                        <h4 className="font-bold text-white text-base">{sub.name}</h4>
                        <span className="text-xs text-slate-400">&lt;{sub.email}&gt;</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-mono">
                          {new Date(sub.createdAt).toLocaleString()}
                        </span>
                        <select
                          value={sub.status}
                          onChange={(e) => updateStatus(sub.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-xs rounded-lg px-2.5 py-1 text-slate-300 cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
                      <div><b className="text-slate-500 block">Phone:</b> {sub.phone || "N/A"}</div>
                      <div><b className="text-slate-500 block">Company:</b> {sub.company || "N/A"}</div>
                      <div><b className="text-slate-500 block">Subject / Role:</b> {sub.subject || "N/A"}</div>
                      <div>
                        <b className="text-slate-500 block">Email Delivery:</b>{" "}
                        {sub.notified ? (
                          <span className="text-emerald-400 font-semibold">✅ Sent</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 inline-block mt-0.5">
                            ❌ Delivery Failed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap font-mono">
                      {sub.message}
                    </div>

                    {file && (
                      <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-between text-xs text-sky-400">
                        <div className="flex items-center gap-2">
                          <Download size={14} />
                          <span><b>Attached File:</b> {file.originalFilename} ({(file.sizeBytes / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">{file.mimeType}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BLOG POSTS TAB ── */}
        {activeTab === "blog" && (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Create Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={16} /> Create New Blog Post
              </h3>
              <form onSubmit={handleCreateBlog} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="e.g. Next-Gen UAV Navigation"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={newBlog.slug}
                    onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })}
                    placeholder="next-gen-uav-navigation"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    placeholder="Short summary..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Body Content</label>
                  <textarea
                    required
                    rows={5}
                    value={newBlog.body}
                    onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
                    placeholder="Full article markdown/HTML content..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creatingBlog}
                  className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 cursor-pointer"
                >
                  {creatingBlog ? "Saving…" : "Publish Blog Post"}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-white">Existing Articles</h3>
              {blogList.map((post) => (
                <div key={post.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">{post.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                    <span className="text-[10px] font-mono text-slate-500">Slug: /{post.slug}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteBlog(post.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Product Catalog & Specifications</h3>
                <p className="text-xs text-slate-400">Manage listing cards, hero banners, feature grids, data sheets, media showcases, and stats bars.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    name: "",
                    slug: "",
                    tagline: "",
                    categoryEyebrow: "INDUSTRIAL UAV PLATFORM",
                    badge: "FLAGSHIP",
                    themeColor: "purple",
                    status: "active",
                    flightTime: "40 min",
                    payload: "180 g",
                    range: "4.1 km",
                    statHighlights: [
                      { label: "FLIGHT TIME", value: "40 min" },
                      { label: "PAYLOAD", value: "180 g" },
                      { label: "RANGE", value: "4.1 km" },
                    ],
                    featureGrids: [],
                    specSheet: [],
                    mediaSections: [],
                    statsBar: [],
                  });
                  setIsProductEditorOpen(true);
                }}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus size={16} /> Create New Product
              </button>
            </div>

            {/* Existing Product List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((prod) => (
                <div key={prod.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-md">
                        {prod.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">/{prod.slug}</span>
                    </div>
                    <h4 className="font-bold text-base text-white">{prod.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{prod.tagline}</p>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg">
                      <div><span className="text-slate-500 block">TIME</span>{prod.flightTime || "N/A"}</div>
                      <div><span className="text-slate-500 block">PAYLOAD</span>{prod.payload || "N/A"}</div>
                      <div><span className="text-slate-500 block">RANGE</span>{prod.range || "N/A"}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        setEditingProduct(JSON.parse(JSON.stringify(prod)));
                        setIsProductEditorOpen(true);
                      }}
                      className="px-3 py-1.5 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRODUCT EDITOR MODAL DRAWER ── */}
        {isProductEditorOpen && editingProduct && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex justify-end">
            <div className="w-full max-w-4xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-8 text-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10 pt-2">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingProduct.id ? `Edit: ${editingProduct.name}` : "Create New Product"}
                  </h2>
                  <p className="text-xs text-slate-400">Configure listing cards, hero assets, feature blocks, spec sheets, showcase sections, and stats.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsProductEditorOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    disabled={savingProduct}
                    className="px-5 py-2 bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 transition shadow-lg cursor-pointer"
                  >
                    {savingProduct ? "Saving..." : "Save Product Specification"}
                  </button>
                </div>
              </div>

              {/* 1. GENERAL & LISTING CARD */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800/80 pb-2">
                  1. Listing Card & General Info
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="THE THIRD EYE"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Slug</label>
                    <input
                      type="text"
                      value={editingProduct.slug || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="the-third-eye"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tagline / Short Description</label>
                    <input
                      type="text"
                      value={editingProduct.tagline || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="Flagship industrial quadcopter"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Category Eyebrow</label>
                    <input
                      type="text"
                      value={editingProduct.categoryEyebrow || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, categoryEyebrow: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="FLAGSHIP INDUSTRIAL QUADCOPTER"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={editingProduct.badge || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="FLAGSHIP / SURVEY / COMING SOON"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Status</label>
                    <select
                      value={editingProduct.status || "active"}
                      onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option value="active">Active (Visible)</option>
                      <option value="coming_soon">Coming Soon</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Theme Accent Color</label>
                    <select
                      value={editingProduct.themeColor || "purple"}
                      onChange={(e) => setEditingProduct({ ...editingProduct, themeColor: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    >
                      <option value="purple">Purple / Indigo (Third Eye Theme)</option>
                      <option value="blue">Blue / Cyan (Sentinel Theme)</option>
                      <option value="cyan">Cyan / Teal (Caddx Theme)</option>
                      <option value="emerald">Emerald Green</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Listing Card Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingProduct.imagePath || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, imagePath: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                        placeholder="/public-uploads/image.jpg"
                      />
                      <label className="px-3 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 cursor-pointer shrink-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUploadPublicFile(file);
                              if (url) setEditingProduct({ ...editingProduct, imagePath: url });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Listing Stat Badges */}
                <div className="pt-2 border-t border-slate-800/80">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-2">Stat Highlights (Shown on Card)</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Flight Time</span>
                      <input
                        type="text"
                        value={editingProduct.flightTime || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, flightTime: e.target.value })}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        placeholder="40 min"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Payload</span>
                      <input
                        type="text"
                        value={editingProduct.payload || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, payload: e.target.value })}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        placeholder="180 g"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Range</span>
                      <input
                        type="text"
                        value={editingProduct.range || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, range: e.target.value })}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        placeholder="4.1 km"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HERO SECTION */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800/80 pb-2">
                  2. Detail Page — Hero Banner & Assets
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Full Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={editingProduct.heroDescription || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, heroDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      placeholder="Detailed overview for the hero section..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Hero Media URL (Image or Video)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProduct.heroMediaUrl || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, heroMediaUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          placeholder="/public-uploads/hero.mp4"
                        />
                        <label className="px-3 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 cursor-pointer shrink-0">
                          Upload
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadPublicFile(file);
                                const isVid = file.type.startsWith("video/");
                                if (url) setEditingProduct({ ...editingProduct, heroMediaUrl: url, heroMediaType: isVid ? "video" : "image" });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Hero Media Type</label>
                      <select
                        value={editingProduct.heroMediaType || "image"}
                        onChange={(e) => setEditingProduct({ ...editingProduct, heroMediaType: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video (Autoplay Loop)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Brochure PDF URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProduct.brochureUrl || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, brochureUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          placeholder="/public-uploads/brochure.pdf"
                        />
                        <label className="px-3 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 cursor-pointer shrink-0">
                          Upload PDF
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadPublicFile(file);
                                if (url) setEditingProduct({ ...editingProduct, brochureUrl: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Hero Logo Icon URL (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProduct.heroLogoUrl || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, heroLogoUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                          placeholder="/public-uploads/logo.png"
                        />
                        <label className="px-3 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700 cursor-pointer shrink-0">
                          Upload Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadPublicFile(file);
                                if (url) setEditingProduct({ ...editingProduct, heroLogoUrl: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FEATURE GRIDS */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    3. Feature Grid Blocks (Repeatable)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const fg = editingProduct.featureGrids || [];
                      setEditingProduct({
                        ...editingProduct,
                        featureGrids: [...fg, { eyebrow: "FEATURE HIGHLIGHT", title: "New Feature Block", subtitle: "Description line...", cards: [] }],
                      });
                    }}
                    className="px-3 py-1 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700"
                  >
                    + Add Feature Block
                  </button>
                </div>

                {(editingProduct.featureGrids || []).map((block: any, bIdx: number) => (
                  <div key={bIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Block #{bIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const fg = [...editingProduct.featureGrids];
                          fg.splice(bIdx, 1);
                          setEditingProduct({ ...editingProduct, featureGrids: fg });
                        }}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Block
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={block.eyebrow || ""}
                        onChange={(e) => {
                          const fg = [...editingProduct.featureGrids];
                          fg[bIdx].eyebrow = e.target.value;
                          setEditingProduct({ ...editingProduct, featureGrids: fg });
                        }}
                        placeholder="Eyebrow Line"
                        className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        value={block.title || ""}
                        onChange={(e) => {
                          const fg = [...editingProduct.featureGrids];
                          fg[bIdx].title = e.target.value;
                          setEditingProduct({ ...editingProduct, featureGrids: fg });
                        }}
                        placeholder="Block Title"
                        className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        value={block.subtitle || ""}
                        onChange={(e) => {
                          const fg = [...editingProduct.featureGrids];
                          fg[bIdx].subtitle = e.target.value;
                          setEditingProduct({ ...editingProduct, featureGrids: fg });
                        }}
                        placeholder="Subtitle"
                        className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                    </div>

                    {/* Cards list in block */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Cards ({block.cards?.length || 0})</span>
                        <button
                          type="button"
                          onClick={() => {
                            const fg = [...editingProduct.featureGrids];
                            fg[bIdx].cards = [...(fg[bIdx].cards || []), { icon: "Shield", title: "New Card", description: "Details..." }];
                            setEditingProduct({ ...editingProduct, featureGrids: fg });
                          }}
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          + Add Card
                        </button>
                      </div>
                      {(block.cards || []).map((card: any, cIdx: number) => (
                        <div key={cIdx} className="grid grid-cols-12 gap-2 items-center bg-slate-950 p-2 rounded">
                          <input
                            type="text"
                            value={card.icon || "Shield"}
                            onChange={(e) => {
                              const fg = [...editingProduct.featureGrids];
                              fg[bIdx].cards[cIdx].icon = e.target.value;
                              setEditingProduct({ ...editingProduct, featureGrids: fg });
                            }}
                            placeholder="Icon (Shield, Zap, Radio, Cpu, Compass)"
                            className="col-span-3 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <input
                            type="text"
                            value={card.title || ""}
                            onChange={(e) => {
                              const fg = [...editingProduct.featureGrids];
                              fg[bIdx].cards[cIdx].title = e.target.value;
                              setEditingProduct({ ...editingProduct, featureGrids: fg });
                            }}
                            placeholder="Card Title"
                            className="col-span-3 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <input
                            type="text"
                            value={card.description || ""}
                            onChange={(e) => {
                              const fg = [...editingProduct.featureGrids];
                              fg[bIdx].cards[cIdx].description = e.target.value;
                              setEditingProduct({ ...editingProduct, featureGrids: fg });
                            }}
                            placeholder="Description"
                            className="col-span-5 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const fg = [...editingProduct.featureGrids];
                              fg[bIdx].cards.splice(cIdx, 1);
                              setEditingProduct({ ...editingProduct, featureGrids: fg });
                            }}
                            className="col-span-1 text-center text-rose-400 text-xs hover:font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4. TECHNICAL SPECIFICATION SHEET */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    4. Technical Specifications Data Sheet
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const ss = editingProduct.specSheet || [];
                      setEditingProduct({
                        ...editingProduct,
                        specSheet: [...ss, { categoryName: "Platform & Airframe", rows: [] }],
                      });
                    }}
                    className="px-3 py-1 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700"
                  >
                    + Add Spec Category
                  </button>
                </div>

                {(editingProduct.specSheet || []).map((cat: any, catIdx: number) => (
                  <div key={catIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={cat.categoryName || ""}
                        onChange={(e) => {
                          const ss = [...editingProduct.specSheet];
                          ss[catIdx].categoryName = e.target.value;
                          setEditingProduct({ ...editingProduct, specSheet: ss });
                        }}
                        placeholder="Category Name (e.g. Flight Performance)"
                        className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-amber-300 w-2/3"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const ss = [...editingProduct.specSheet];
                          ss.splice(catIdx, 1);
                          setEditingProduct({ ...editingProduct, specSheet: ss });
                        }}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Category
                      </button>
                    </div>

                    {/* Spec rows */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Spec Rows ({cat.rows?.length || 0})</span>
                        <button
                          type="button"
                          onClick={() => {
                            const ss = [...editingProduct.specSheet];
                            ss[catIdx].rows = [...(ss[catIdx].rows || []), { label: "Property", value: "Value" }];
                            setEditingProduct({ ...editingProduct, specSheet: ss });
                          }}
                          className="text-[10px] text-amber-400 hover:underline"
                        >
                          + Add Spec Row
                        </button>
                      </div>
                      {(cat.rows || []).map((row: any, rIdx: number) => (
                        <div key={rIdx} className="grid grid-cols-12 gap-2 items-center bg-slate-950 p-2 rounded">
                          <input
                            type="text"
                            value={row.label || ""}
                            onChange={(e) => {
                              const ss = [...editingProduct.specSheet];
                              ss[catIdx].rows[rIdx].label = e.target.value;
                              setEditingProduct({ ...editingProduct, specSheet: ss });
                            }}
                            placeholder="Label (e.g. Flight Time)"
                            className="col-span-5 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <input
                            type="text"
                            value={row.value || ""}
                            onChange={(e) => {
                              const ss = [...editingProduct.specSheet];
                              ss[catIdx].rows[rIdx].value = e.target.value;
                              setEditingProduct({ ...editingProduct, specSheet: ss });
                            }}
                            placeholder="Value (e.g. 40 Minutes)"
                            className="col-span-6 px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const ss = [...editingProduct.specSheet];
                              ss[catIdx].rows.splice(rIdx, 1);
                              setEditingProduct({ ...editingProduct, specSheet: ss });
                            }}
                            className="col-span-1 text-center text-rose-400 text-xs hover:font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5. MEDIA SHOWCASE SECTIONS */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    5. Feature / Media Showcase Sections (Repeatable)
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const ms = editingProduct.mediaSections || [];
                      setEditingProduct({
                        ...editingProduct,
                        mediaSections: [...ms, { title: "New Showcase Section", description: "Section description...", mediaUrls: [] }],
                      });
                    }}
                    className="px-3 py-1 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700"
                  >
                    + Add Showcase Section
                  </button>
                </div>

                {(editingProduct.mediaSections || []).map((sec: any, sIdx: number) => (
                  <div key={sIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Showcase Section #{sIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const ms = [...editingProduct.mediaSections];
                          ms.splice(sIdx, 1);
                          setEditingProduct({ ...editingProduct, mediaSections: ms });
                        }}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Section
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={sec.title || ""}
                        onChange={(e) => {
                          const ms = [...editingProduct.mediaSections];
                          ms[sIdx].title = e.target.value;
                          setEditingProduct({ ...editingProduct, mediaSections: ms });
                        }}
                        placeholder="Section Title"
                        className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        value={sec.description || ""}
                        onChange={(e) => {
                          const ms = [...editingProduct.mediaSections];
                          ms[sIdx].description = e.target.value;
                          setEditingProduct({ ...editingProduct, mediaSections: ms });
                        }}
                        placeholder="Section Description"
                        className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                    </div>

                    {/* Media Items */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Attached Media</span>
                        <label className="text-[10px] text-amber-400 hover:underline cursor-pointer">
                          + Upload Image/Video
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUploadPublicFile(file);
                                const isVid = file.type.startsWith("video/");
                                if (url) {
                                  const ms = [...editingProduct.mediaSections];
                                  ms[sIdx].mediaUrls = [...(ms[sIdx].mediaUrls || []), { url, type: isVid ? "video" : "image" }];
                                  setEditingProduct({ ...editingProduct, mediaSections: ms });
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                      {(sec.mediaUrls || []).map((med: any, mIdx: number) => (
                        <div key={mIdx} className="flex items-center justify-between bg-slate-950 p-2 rounded text-xs text-slate-300">
                          <span className="truncate max-w-md font-mono">{med.url} ({med.type})</span>
                          <button
                            type="button"
                            onClick={() => {
                              const ms = [...editingProduct.mediaSections];
                              ms[sIdx].mediaUrls.splice(mIdx, 1);
                              setEditingProduct({ ...editingProduct, mediaSections: ms });
                            }}
                            className="text-rose-400 hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 6. STATS BAR */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    6. Bottom Stats Bar Items
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const sb = editingProduct.statsBar || [];
                      setEditingProduct({
                        ...editingProduct,
                        statsBar: [...sb, { value: "40", unit: "min", label: "Max Flight" }],
                      });
                    }}
                    className="px-3 py-1 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700"
                  >
                    + Add Stat Item
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {(editingProduct.statsBar || []).map((sb: any, sbIdx: number) => (
                    <div key={sbIdx} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                      <input
                        type="text"
                        value={sb.value || ""}
                        onChange={(e) => {
                          const list = [...editingProduct.statsBar];
                          list[sbIdx].value = e.target.value;
                          setEditingProduct({ ...editingProduct, statsBar: list });
                        }}
                        placeholder="Value (40)"
                        className="col-span-3 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        value={sb.unit || ""}
                        onChange={(e) => {
                          const list = [...editingProduct.statsBar];
                          list[sbIdx].unit = e.target.value;
                          setEditingProduct({ ...editingProduct, statsBar: list });
                        }}
                        placeholder="Unit (min)"
                        className="col-span-3 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        value={sb.label || ""}
                        onChange={(e) => {
                          const list = [...editingProduct.statsBar];
                          list[sbIdx].label = e.target.value;
                          setEditingProduct({ ...editingProduct, statsBar: list });
                        }}
                        placeholder="Label (Max Endurance)"
                        className="col-span-5 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...editingProduct.statsBar];
                          list.splice(sbIdx, 1);
                          setEditingProduct({ ...editingProduct, statsBar: list });
                        }}
                        className="col-span-1 text-center text-rose-400 text-xs hover:font-bold"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
