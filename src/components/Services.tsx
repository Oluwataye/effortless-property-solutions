import { useState } from "react";
import { Building2, Home, Key, Construction, DollarSign, ChevronDown } from "lucide-react";
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
    items: [
      {
        title: "Facility Management",
        description: "Comprehensive facility management solutions for your properties",
        icon: Building2,
      },
      {
        title: "Real Estate Management",
        description: "Professional property management services",
        icon: Home,
      }
    ]
  },
  {
    category: "Project Management",
    items: [
      {
        title: "Property Buying",
        description: "Expert guidance in property acquisition",
        icon: Key,
      },
      {
        title: "Property Development",
        description: "End-to-end property development services",
        icon: Construction,
      },
      {
        title: "Property Selling",
        description: "Strategic property marketing and sales",
        icon: DollarSign,
      }
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
            <SelectTrigger className="w-full max-w-md mx-auto text-xl border-b-2 border-red-600 rounded-none bg-transparent hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="w-full max-w-md">
              {services.map((serviceCategory) => (
                <SelectItem 
                  key={serviceCategory.category} 
                  value={serviceCategory.category}
                  className="text-lg py-3 hover:bg-gray-50"
                >
                  {serviceCategory.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {services
              .find(cat => cat.category === selectedCategory)
              ?.items.map((service) => (
                <Card
                  key={service.title}
                  className={cn(
                    "hover:shadow-lg transition-shadow duration-300",
                    "transform hover:-translate-y-1 transition-transform"
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <service.icon className="h-6 w-6 text-red-600" />
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;