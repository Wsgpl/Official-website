import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { RootLayout, NotFoundComponent } from "./routes/__root";
import HomePage from "./routes/index";
import AboutPage from "./routes/about";
import RptoPage from "./routes/rpto";
import ProductsPage from "./routes/products";
import { ProductDetailPage } from "./routes/product-detail";
import ServicesPage from "./routes/services";
import PrintingServicesPage from "./routes/services.3d-printing-services";
import AgricultureSolutionsPage from "./routes/services.agriculture-solutions";
import CustomUAVPage from "./routes/services.custom-uav-development";
import DaaSPage from "./routes/services.drone-as-a-service";
import DroneManufacturingPage from "./routes/services.drone-manufacturing";
import DroneSurveyMappingPage from "./routes/services.drone-survey-mapping";
import InfrastructureInspectionPage from "./routes/services.infrastructure-inspection";
import RapidPrototypingPage from "./routes/services.rapid-prototyping";
import PrintingPage from "./routes/3d-printing";
import CareersPage from "./routes/careers";
import BlogPage from "./routes/blog";
import ContactPage from "./routes/contact";
import CookiePolicyComponent from "./routes/cookie-policy";
import PrivacyPolicyPage from "./routes/privacy-policy";
import TermsOfServicePage from "./routes/terms-of-service";
import AdminPage from "./routes/admin";

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="rpto" element={<RptoPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/3d-printing-services" element={<PrintingServicesPage />} />
          <Route path="services/agriculture-solutions" element={<AgricultureSolutionsPage />} />
          <Route path="services/custom-uav-development" element={<CustomUAVPage />} />
          <Route path="services/drone-as-a-service" element={<DaaSPage />} />
          <Route path="services/drone-manufacturing" element={<DroneManufacturingPage />} />
          <Route path="services/drone-survey-mapping" element={<DroneSurveyMappingPage />} />
          <Route path="services/infrastructure-inspection" element={<InfrastructureInspectionPage />} />
          <Route path="services/rapid-prototyping" element={<RapidPrototypingPage />} />
          <Route path="3d-printing" element={<PrintingPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cookie-policy" element={<CookiePolicyComponent />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="terms" element={<Navigate to="/terms-of-service" replace />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
