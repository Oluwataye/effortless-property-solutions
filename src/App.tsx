import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ChatWidget from "@/components/chat/ChatWidget";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingFallback from "@/components/LoadingFallback";
import ProtectedRoute from "@/components/ProtectedRoute";
import SEOHead from "@/components/SEOHead";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import FacilityManagement from "./pages/services/FacilityManagement";
import RealEstateManagement from "./pages/services/RealEstateManagement";
import PropertyBuying from "./pages/services/PropertyBuying";
import PropertyDevelopment from "./pages/services/PropertyDevelopment";
import PropertySelling from "./pages/services/PropertySelling";
import Sustainability from "./pages/about/Sustainability";
import Leadership from "./pages/about/Leadership";
import Impact from "./pages/about/Impact";
import History from "./pages/about/History";
import Careers from "./pages/Careers";
import Locations from "./pages/Locations";
import Properties from "./pages/admin/Properties";
import Projects from "./pages/admin/Projects";
import News from "./pages/admin/News";
import ServicesAdmin from "./pages/admin/Services";
import BlogPosts from "./pages/admin/BlogPosts";
import Users from "./pages/admin/Users";
import Testimonials from "./pages/admin/Testimonials";
import Inquiries from "./pages/admin/Inquiries";
import ContactAdmin from "./pages/admin/Contact";
import Media from "./pages/admin/Media";
import Chatbot from "./pages/admin/Chatbot";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <SEOHead />
      <Toaster />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/sustainability" element={<Sustainability />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/impact" element={<Impact />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/facility-management" element={<FacilityManagement />} />
          <Route path="/services/real-estate-management" element={<RealEstateManagement />} />
          <Route path="/services/property-buying" element={<PropertyBuying />} />
          <Route path="/services/property-development" element={<PropertyDevelopment />} />
          <Route path="/services/property-selling" element={<PropertySelling />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route 
            path="/auth" 
            element={!isAuthenticated ? <Auth /> : <Navigate to="/admin/dashboard" />} 
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <ProtectedRoute requireAdmin>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute requireAdmin>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute requireAdmin>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute requireAdmin>
                <ServicesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog-posts"
            element={
              <ProtectedRoute requireAdmin>
                <BlogPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute requireAdmin>
                <Testimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute requireAdmin>
                <Inquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute requireAdmin>
                <ContactAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute requireAdmin>
                <Media />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chatbot"
            element={
              <ProtectedRoute requireAdmin>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requireAdmin>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/admin/dashboard" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ChatWidget />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
