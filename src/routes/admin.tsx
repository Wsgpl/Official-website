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

  // Product Form State
  const [newProduct, setNewProduct] = useState({ slug: "", name: "", tagline: "", flightTime: "", payload: "", range: "" });
  const [creatingProduct, setCreatingProduct] = useState(false);

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

  // 7. Create Product
  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    setCreatingProduct(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Product created!");
        setNewProduct({ slug: "", name: "", tagline: "", flightTime: "", payload: "", range: "" });
        fetchProducts();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create product.");
    } finally {
      setCreatingProduct(false);
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
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Create Form */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={16} /> Add Product Specification
              </h3>
              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. THE THIRD EYE"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={newProduct.slug}
                    onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                    placeholder="the-third-eye"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    value={newProduct.tagline}
                    onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                    placeholder="Flagship industrial quadcopter"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Flight Time</label>
                    <input
                      type="text"
                      value={newProduct.flightTime}
                      onChange={(e) => setNewProduct({ ...newProduct, flightTime: e.target.value })}
                      placeholder="40 min"
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Payload</label>
                    <input
                      type="text"
                      value={newProduct.payload}
                      onChange={(e) => setNewProduct({ ...newProduct, payload: e.target.value })}
                      placeholder="180 g"
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Range</label>
                    <input
                      type="text"
                      value={newProduct.range}
                      onChange={(e) => setNewProduct({ ...newProduct, range: e.target.value })}
                      placeholder="4.1 km"
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={creatingProduct}
                  className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-amber-300 cursor-pointer"
                >
                  {creatingProduct ? "Saving…" : "Save Product"}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-white">Active Product Catalog</h3>
              {productsList.map((prod) => (
                <div key={prod.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">{prod.name}</h4>
                    <p className="text-xs text-slate-400">{prod.tagline}</p>
                    <div className="flex gap-4 text-[10px] font-mono text-slate-500">
                      <span>Flight: {prod.flightTime || "N/A"}</span>
                      <span>Payload: {prod.payload || "N/A"}</span>
                      <span>Range: {prod.range || "N/A"}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
