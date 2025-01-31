import { Building2, Home, Key, Construction, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Facility Management",
    description: "Comprehensive facility management solutions for your properties",
    icon: Building2,
  },
  {
    title: "Real Estate Management",
    description: "Professional property management services",
    icon: Home,
  },
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
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <service.icon className="h-6 w-6 text-primary" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;