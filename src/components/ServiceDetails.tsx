
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ServiceDetailsProps {
  service: {
    category: string;
    description: string;
    icon: LucideIcon;
    image: string;
    features: string[];
    price?: number;
  };
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <service.icon className="h-6 w-6 text-red-600" />
            {service.category}
          </h3>
          <p className="text-gray-600 mb-6">{service.description}</p>
          
          {service.price && service.price > 0 && (
            <p className="text-xl font-semibold text-primary mb-6">
              Starting at ${service.price.toFixed(2)}
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                {feature}
              </div>
            ))}
          </div>
          
          <Button asChild>
            <Link to="/contact">
              Request Quote
            </Link>
          </Button>
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
  );
};

export default ServiceDetails;
