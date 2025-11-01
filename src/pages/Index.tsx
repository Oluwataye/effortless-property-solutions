
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
        
        <HomeSection title="Featured Properties & Projects" className="bg-gradient-to-b from-white to-muted/30">
          <FeaturedProperties />
          <div className="mt-16">
            <ProjectsSection />
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
              <Link to="/portfolio" className="group">
                View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
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

        <HomeSection title="Ready to Elevate Your Property?" background="dark" className="text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
          <div className="relative z-10">
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white leading-relaxed">
              Transform your property management experience with our expert solutions. Get a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button asChild size="lg" variant="premium">
                <Link to="/contact" className="group">
                  Get Free Assessment <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/services" className="group">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <p className="text-white/80 text-sm mt-6">No obligation • Free consultation • 24/7 Support</p>
          </div>
        </HomeSection>

        <Footer />
        <ChatWidget />
      </div>
  );
};

export default Index;
