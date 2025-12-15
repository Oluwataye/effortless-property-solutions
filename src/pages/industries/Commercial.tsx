import { Building2, TrendingUp, Users, Shield, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Building2,
    title: "Office Buildings",
    description: "Premium office space acquisition, leasing, and management for businesses of all sizes."
  },
  {
    icon: TrendingUp,
    title: "Retail Properties",
    description: "Strategic retail location services from shopping centers to standalone storefronts."
  },
  {
    icon: Users,
    title: "Mixed-Use Developments",
    description: "Comprehensive solutions for properties combining commercial, retail, and residential spaces."
  },
  {
    icon: Shield,
    title: "Investment Properties",
    description: "Expert guidance on commercial real estate investments with strong ROI potential."
  }
];

const benefits = [
  "Access to premium commercial listings",
  "Market analysis and property valuation",
  "Lease negotiation expertise",
  "Property management services",
  "Investment portfolio optimization",
  "Tenant acquisition and retention"
];

const Commercial = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Commercial Real Estate | AMOVATE"
        description="Expert commercial real estate services including office buildings, retail spaces, and investment properties."
      />
      
      <ServiceBreadcrumb
        serviceName="Commercial"
        parentPath="/services"
        parentLabel="Industries"
      />
      
      <ServiceHero
        title="Commercial Real Estate"
        category="Industries"
        description="From office towers to retail centers, we provide comprehensive commercial real estate solutions that drive business success and maximize property value."
        backgroundImage="/images/services/real-estate-management-hero.png"
        icon={Building2}
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Commercial Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for every commercial property type.
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
                Why Choose Us for Commercial
              </h2>
              <p className="text-muted-foreground mb-8">
                Our commercial real estate team combines deep market knowledge with a client-first approach to deliver exceptional results.
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
                src="/images/services/real-estate-management-hero.png" 
                alt="Commercial Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Commercial Opportunities</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let our experts help you find the perfect commercial property.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Commercial;
