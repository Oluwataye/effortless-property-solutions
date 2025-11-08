import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Home, Key, Construction, DollarSign, ChevronDown } from "lucide-react";
import ServiceDetails from "./ServiceDetails";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";

const iconMap: Record<string, any> = {
  Building2,
  Home,
  Key,
  Construction,
  DollarSign,
};

const defaultImages = {
  "Property Management": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Facility Management": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Project Management": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Property Development & Sales": "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
};

const defaultFeatures = {
  "Property Management": [
    "Tenant screening and management",
    "Property maintenance and repairs",
    "Rent collection and financial reporting",
    "24/7 emergency response"
  ],
  "Facility Management": [
    "Building maintenance",
    "Cleaning services",
    "Security management",
    "Utilities management"
  ],
  "Project Management": [
    "Construction oversight",
    "Timeline coordination",
    "Budget management",
    "Quality control"
  ],
  "Property Development & Sales": [
    "Property acquisition",
    "Construction management",
    "Development planning",
    "Sales and marketing"
  ],
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      
      return data.map(service => ({
        category: service.name,
        description: service.description,
        icon: service.icon && iconMap[service.icon] ? iconMap[service.icon] : Building2,
        image: defaultImages[service.name as keyof typeof defaultImages] || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        features: defaultFeatures[service.name as keyof typeof defaultFeatures] || [
          "Professional service",
          "Experienced team",
          "Competitive pricing",
          "Customer satisfaction guarantee"
        ],
        price: service.price
      }));
    },
  });

  useEffect(() => {
    if (services && services.length > 0 && !selectedCategory) {
      setSelectedCategory(services[0].category);
    }
  }, [services, selectedCategory]);

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-muted/20 to-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-secondary/10 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              How Can We
              <br />
              <span className="text-primary">Help You Today?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-light">I am looking for</p>
            <div className="animate-pulse bg-muted h-14 w-full max-w-lg mx-auto rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.08),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-block mb-6 px-6 py-2 bg-secondary/10 rounded-full animate-slide-down">
            <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight animate-slide-in">
            How Can We
            <br />
            <span className="text-primary">Help You Today?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-light">
            Explore our comprehensive range of professional services
          </p>
          <p className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
            From property management to development consulting, we deliver excellence across all aspects of real estate services. Select a service below to learn more.
          </p>
          
          {services && services.length > 0 && (
            <div className="animate-scale-in">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full max-w-md mx-auto text-xl h-14 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    {selectedCategory || "Select a Service"}
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-[400px] max-w-[90vw] bg-background border-2 shadow-lg"
                  align="center"
                >
                  {services.map((service) => (
                    <DropdownMenuItem 
                      key={service.category}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link 
                        to="/services"
                        onClick={() => setSelectedCategory(service.category)}
                        className="flex items-center gap-3 py-4 px-4 text-lg hover:bg-primary/5 transition-colors"
                      >
                        <service.icon className="h-6 w-6 text-primary" />
                        <span className="font-medium">{service.category}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {selectedCategory && services && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            {services
              .filter(service => service.category === selectedCategory)
              .map((service) => (
                <ServiceDetails key={service.category} service={service} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
