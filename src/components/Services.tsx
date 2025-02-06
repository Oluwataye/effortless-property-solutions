import { useState } from "react";
import { Building2, Home, Key, Construction, DollarSign } from "lucide-react";
import ServiceSelector from "./ServiceSelector";
import ServiceDetails from "./ServiceDetails";

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
          
          <ServiceSelector
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            services={services}
          />
        </div>

        {selectedCategory && (
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