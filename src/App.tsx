import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
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

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <SEOHead />
            <Toaster />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/properties" element={
                  <ProtectedRoute requireAdmin>
                    <Properties />
                  </ProtectedRoute>
                } />
                <Route path="/admin/projects" element={
                  <ProtectedRoute requireAdmin>
                    <Projects />
                  </ProtectedRoute>
                } />
                <Route path="/admin/news" element={
                  <ProtectedRoute requireAdmin>
                    <News />
                  </ProtectedRoute>
                } />
                <Route path="/admin/services" element={
                  <ProtectedRoute requireAdmin>
                    <ServicesAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/admin/blog-posts" element={
                  <ProtectedRoute requireAdmin>
                    <BlogPosts />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute requireAdmin>
                    <Users />
                  </ProtectedRoute>
                } />
                <Route path="/admin/testimonials" element={
                  <ProtectedRoute requireAdmin>
                    <Testimonials />
                  </ProtectedRoute>
                } />
                <Route path="/admin/inquiries" element={
                  <ProtectedRoute requireAdmin>
                    <Inquiries />
                  </ProtectedRoute>
                } />
                <Route path="/admin/contact" element={
                  <ProtectedRoute requireAdmin>
                    <ContactAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/admin/media" element={
                  <ProtectedRoute requireAdmin>
                    <Media />
                  </ProtectedRoute>
                } />
                <Route path="/admin/chatbot" element={
                  <ProtectedRoute requireAdmin>
                    <Chatbot />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute requireAdmin>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ChatWidget />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
