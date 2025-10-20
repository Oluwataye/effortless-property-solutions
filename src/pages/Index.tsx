
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeSection from "@/components/HomeSection";
import ProjectsSection from "@/components/ProjectsSection";
import NewsSection from "@/components/NewsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import FeaturedProperties from "@/components/FeaturedProperties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen">
        <SEOHead />
        <Navbar />
        <Hero />
        
        <Services />
        
        <HomeSection title="Featured Properties" className="bg-gradient-to-b from-white to-muted/30">
          <FeaturedProperties />
          <div className="text-center mt-12">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
              <Link to="/portfolio" className="group">
                View All Properties <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </HomeSection>

        <HomeSection title="Featured Projects" background="dark" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-95" />
          <div className="relative z-10">
            <ProjectsSection />
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary shadow-gold transition-all">
                <Link to="/portfolio" className="group">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </HomeSection>

        <HomeSection title="What Our Clients Say" className="bg-white">
          <TestimonialsSection />
        </HomeSection>

        <HomeSection title="Latest News" className="bg-gradient-to-b from-muted/30 to-white">
          <NewsSection />
          <div className="text-center mt-12">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
              <Link to="/blog" className="group">
                View All News <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </HomeSection>

        <HomeSection title="Get in Touch" background="dark" className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
          <div className="relative z-10">
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed">
              Ready to transform your property management experience? Contact us today
              to discuss how we can help you achieve your goals.
            </p>
            <Button asChild size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary shadow-gold transition-all">
              <Link to="/contact" className="group">
                Contact Us <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </HomeSection>

        <Footer />
        <ChatWidget />
      </div>
  );
};

export default Index;
