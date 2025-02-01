import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80')",
          opacity: "0.2",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary/90" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          AMOVATE SOLUTIONS LIMITED
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 animate-slide-in max-w-2xl mx-auto">
          Leading the way in property management and development with innovative solutions and exceptional service.
        </p>
        <div className="space-x-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-accent animate-slide-in"
          >
            <Link to="/services">
              Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-primary animate-slide-in"
          >
            <Link to="/contact">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;