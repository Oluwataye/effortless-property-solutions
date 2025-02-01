import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625')",
          opacity: "0.2",
        }}
      />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          AMOVATE SOLUTIONS LIMITED
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 animate-slide-in">
          Effortless solutions, tailored to you
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-accent animate-slide-in"
          onClick={() => navigate('/services')}
        >
          Explore Our Services
        </Button>
      </div>
    </div>
  );
};

export default Hero;