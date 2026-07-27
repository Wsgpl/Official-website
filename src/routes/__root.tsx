import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";

import { Navigation } from "../components/site/Navigation";
import { Footer } from "../components/site/Footer";
import { FloatingActions } from "../components/site/FloatingActions";
import { CookieBanner } from "../components/site/CookieBanner";

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand font-display">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-brand">Page not found</h2>
        <p className="mt-2 text-sm text-brand/60">This page has taken flight elsewhere.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded bg-brand px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RootLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface overflow-x-clip relative">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="bottom-left" richColors />
      <CookieBanner />
    </div>
  );
}

export default RootLayout;
