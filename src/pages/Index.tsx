import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HomeNavigation from "@/components/HomeNavigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <HomeNavigation />
    </div>
  );
};

export default Index;