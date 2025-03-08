import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "@/pages";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/admin/Dashboard";
import Properties from "@/pages/admin/Properties";
import Projects from "@/pages/admin/Projects";
import News from "@/pages/admin/News";
import ServicesAdmin from "@/pages/admin/Services";
import BlogPosts from "@/pages/admin/BlogPosts";
import Users from "@/pages/admin/Users";
import Testimonials from "@/pages/admin/Testimonials";
import Inquiries from "@/pages/admin/Inquiries";
import ContactAdmin from "@/pages/admin/ContactAdmin";
import Media from "@/pages/admin/Media";
import Chatbot from "@/pages/admin/Chatbot";
import Settings from "@/pages/admin/Settings";
import Login from "@/pages/admin/Login";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster"
import ChatWidget from "@/components/chat/ChatWidget";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/properties" element={<Properties />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/services" element={<ServicesAdmin />} />
        <Route path="/admin/blog-posts" element={<BlogPosts />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/testimonials" element={<Testimonials />} />
        <Route path="/admin/inquiries" element={<Inquiries />} />
        <Route path="/admin/contact" element={<ContactAdmin />} />
        <Route path="/admin/media" element={<Media />} />
        <Route path="/admin/chatbot" element={<Chatbot />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
    </Router>
  );
}

export default App;
