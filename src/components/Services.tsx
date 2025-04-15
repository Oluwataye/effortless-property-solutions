
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Home, Key, Construction, DollarSign } from "lucide-react";
import ServiceSelector from "./ServiceSelector";
import ServiceDetails from "./ServiceDetails";

// Map of icon names to Lucide icons
const iconMap: Record<string, any> = {
  Building2,
  Home,
  Key,
  Construction,
  DollarSign,
};

// Default service image map
const defaultImages = {
  "Property Management": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Facility Management": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Project Management": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  "Property Development & Sales": "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
};

// Default features for each service type
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
      
      // Transform database services to the format our components expect
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
    // If services are loaded and there is no selection yet, select the first one
    if (services && services.length > 0 && !selectedCategory) {
      setSelectedCategory(services[0].category);
    }
  }, [services, selectedCategory]);

  if (isLoading) {
    return (
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
              HOW CAN WE
              <br />
              HELP YOU
              <br />
              TODAY?
            </h2>
            <p className="text-xl text-gray-600 mb-8">I am looking for</p>
            <div className="animate-pulse bg-gray-300 h-12 w-full max-w-md mx-auto rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            HOW CAN WE
            <br />
            HELP YOU
            <br />
            TODAY?
          </h2>
          <p className="text-xl text-gray-600 mb-8">I am looking for</p>
          
          {services && services.length > 0 && (
            <ServiceSelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              services={services}
            />
          )}
        </div>

        {selectedCategory && services && (
          <div className="animate-fade-in">
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
