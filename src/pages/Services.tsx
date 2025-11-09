import Navbar from "@/components/Navbar";
import ServicesComponent from "@/components/Services";
import Footer from "@/components/Footer";
import { Building2, Home, Key, Construction, DollarSign } from "lucide-react";

const ServicesPage = () => {
  const serviceDetails = [
    {
      title: "Facility Management",
      description: "Our comprehensive facility management solutions ensure your properties operate at peak efficiency. We handle maintenance, security, cleaning, and all aspects of building operations.",
      icon: Building2,
      features: [
        "24/7 maintenance support",
        "Security management",
        "Cleaning services",
        "Vendor management",
      ],
    },
    {
      title: "Real Estate Management",
      description: "Professional property management services that maximize your investment returns while minimizing operational headaches.",
      icon: Home,
      features: [
        "Tenant screening",
        "Rent collection",
        "Property maintenance",
        "Financial reporting",
      ],
    },
    {
      title: "Property Buying",
      description: "Expert guidance throughout your property acquisition journey, from search to closing.",
      icon: Key,
      features: [
        "Market analysis",
        "Property viewings",
        "Negotiation support",
        "Transaction management",
      ],
    },
    {
      title: "Property Development",
      description: "End-to-end property development services that turn your vision into reality.",
      icon: Construction,
      features: [
        "Project planning",
        "Construction management",
        "Quality control",
        "Timeline management",
      ],
    },
    {
      title: "Property Selling",
      description: "Strategic property marketing and sales services to help you achieve the best possible price.",
      icon: DollarSign,
      features: [
        "Market analysis",
        "Property staging",
        "Marketing strategy",
        "Negotiation support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 via-secondary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
              Comprehensive property solutions tailored to your needs
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <ServicesComponent />
        
        <div className="mt-20">
          {serviceDetails.map((service) => (
            <section key={service.title} className="mb-16">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <service.icon className="w-6 h-6" />
                {service.title}
              </h2>
              <p className="text-secondary mb-6">{service.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-secondary">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;