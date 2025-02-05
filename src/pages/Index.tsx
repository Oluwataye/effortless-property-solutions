import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeSection from "@/components/HomeSection";
import ProjectsSection from "@/components/ProjectsSection";
import NewsSection from "@/components/NewsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <HomeSection title="Our Services">
        <Services />
      </HomeSection>

      <HomeSection title="Featured Projects" background="dark">
        <ProjectsSection />
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
            <Link to="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </HomeSection>

      <TestimonialsSection />

      <HomeSection title="Latest News">
        <NewsSection />
        <div className="text-center mt-12">
          <Button asChild>
            <Link to="/blog">
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </HomeSection>

      <HomeSection title="Get in Touch" background="dark" className="text-center">
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Ready to transform your property management experience? Contact us today
          to discuss how we can help you achieve your goals.
        </p>
        <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
          <Link to="/contact">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </HomeSection>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;