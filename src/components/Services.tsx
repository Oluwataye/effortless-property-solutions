import { useState } from "react";
import { Building2, Home, Key, Construction, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const services = [
  {
    category: "Property Management",
    description: "Comprehensive property management services to maximize your real estate investments.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    features: [
      "Tenant screening and management",
      "Property maintenance and repairs",
      "Rent collection and financial reporting",
      "24/7 emergency response"
    ]
  },
  {
    category: "Facility Management",
    description: "Efficient facility management to ensure smooth operations of your properties.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    features: [
      "Building maintenance",
      "Cleaning services",
      "Security management",
      "Utilities management"
    ]
  },
  {
    category: "Project Management",
    description: "Expert project management for successful real estate development and renovations.",
    icon: Construction,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    features: [
      "Construction oversight",
      "Timeline coordination",
      "Budget management",
      "Quality control"
    ]
  },
  {
    category: "Property Development & Sales",
    description: "End-to-end property development and sales services for optimal returns.",
    icon: DollarSign,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    features: [
      "Property acquisition",
      "Construction management",
      "Development planning",
      "Sales and marketing"
    ]
  }
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
          
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger 
              className="w-full max-w-md mx-auto text-xl border-b-2 border-red-600 
                rounded-none bg-transparent hover:bg-gray-50 transition-colors
                focus:ring-0 focus:ring-offset-0 focus:border-red-700"
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent 
              className="w-full max-w-md bg-white border border-gray-200 shadow-lg
                rounded-sm mt-1 overflow-hidden"
            >
              {services.map((service) => (
                <SelectItem 
                  key={service.category} 
                  value={service.category}
                  className="text-lg py-4 px-6 hover:bg-gray-50 cursor-pointer
                    border-b border-gray-100 last:border-b-0
                    transition-colors duration-200 ease-in-out"
                >
                  {service.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory && (
          <div className="animate-fade-in">
            {services
              .filter(service => service.category === selectedCategory)
              .map((service) => (
                <div key={service.category} className="max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <service.icon className="h-6 w-6 text-red-600" />
                        {service.category}
                      </h3>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-red-600 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img 
                        src={service.image} 
                        alt={`${service.category} illustration`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;