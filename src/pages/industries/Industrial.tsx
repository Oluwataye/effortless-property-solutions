import { Factory, Truck, Package, Warehouse, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Warehouse,
    title: "Warehouses",
    description: "Modern warehouse facilities for storage, distribution, and logistics operations."
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Purpose-built manufacturing facilities designed for operational efficiency."
  },
  {
    icon: Truck,
    title: "Logistics Centers",
    description: "Strategic distribution centers positioned for optimal supply chain performance."
  },
  {
    icon: Package,
    title: "Flex Spaces",
    description: "Versatile industrial spaces that adapt to your evolving business needs."
  }
];

const benefits = [
  "Strategic location analysis",
  "Loading dock specifications",
  "Power and utility assessments",
  "Zoning compliance expertise",
  "Expansion planning support",
  "Build-to-suit options"
];

const Industrial = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Industrial Real Estate | AMOVATE"
        description="Industrial real estate solutions including warehouses, manufacturing facilities, and logistics centers."
      />
      
      <ServiceBreadcrumb
        serviceName="Industrial"
        parentPath="/services"
        parentLabel="Industries"
      />
      
      <ServiceHero
        title="Industrial Real Estate"
        category="Industries"
        description="From warehouses to manufacturing plants, we deliver industrial real estate solutions that power your operations and support business growth."
        backgroundImage="/images/services/facility-management-hero.png"
        icon={Factory}
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Industrial Property Types
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized facilities for every industrial requirement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Industrial Expertise You Can Trust
              </h2>
              <p className="text-muted-foreground mb-8">
                Our industrial real estate specialists understand the unique requirements of manufacturing, logistics, and distribution operations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <img 
                src="/images/services/facility-management-hero.png" 
                alt="Industrial Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Power Your Operations</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Find the ideal industrial space for your business needs.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Explore Industrial Properties</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industrial;
