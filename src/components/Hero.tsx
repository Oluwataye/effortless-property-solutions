import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80')",
        }}
      />
      
      {/* Lighter Gradient Overlay for Better Image Visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-accent/60"
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Subtitle */}
          <p className="text-secondary text-sm md:text-base font-semibold tracking-wider uppercase animate-fade-in">
            Premier Real Estate Solutions
          </p>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-in leading-tight drop-shadow-lg">
            AMOVATE
            <span className="block text-secondary mt-2 text-5xl md:text-7xl lg:text-8xl">SOLUTIONS</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-2xl text-white mb-12 animate-slide-in max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            Transforming properties into exceptional living and working spaces through innovative management and development solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button
              asChild
              size="lg"
              variant="premium"
            >
              <Link to="/services" className="group">
                Explore Our Services 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link to="/contact" className="group">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators - Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all hover:scale-105 shadow-lg">
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2 drop-shadow-lg">500+</p>
              <p className="text-white text-sm font-medium">Properties Managed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all hover:scale-105 shadow-lg">
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2 drop-shadow-lg">15+</p>
              <p className="text-white text-sm font-medium">Years of Excellence</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all hover:scale-105 shadow-lg">
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2 drop-shadow-lg">98%</p>
              <p className="text-white text-sm font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;