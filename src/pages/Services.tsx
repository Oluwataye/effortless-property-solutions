import Navbar from "@/components/Navbar";
import ServicesComponent from "@/components/Services";
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
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Services</h1>
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
    </div>
  );
};

export default ServicesPage;