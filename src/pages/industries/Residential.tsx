import { Home, Heart, Key, Shield, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Single Family Homes",
    description: "Find your dream home from our extensive portfolio of single-family residences."
  },
  {
    icon: Heart,
    title: "Luxury Properties",
    description: "Exclusive access to premium luxury homes and estates in prestigious locations."
  },
  {
    icon: Key,
    title: "Condos & Townhomes",
    description: "Modern living solutions with shared amenities and low-maintenance lifestyles."
  },
  {
    icon: Shield,
    title: "Investment Rentals",
    description: "Build wealth through carefully selected residential investment properties."
  }
];

const benefits = [
  "Personalized home search",
  "Neighborhood expertise",
  "School district guidance",
  "Mortgage pre-approval assistance",
  "Home inspection coordination",
  "Closing support services"
];

const Residential = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Residential Real Estate | AMOVATE"
        description="Find your perfect home with our residential real estate services including single-family homes, condos, and luxury properties."
      />
      
      <ServiceBreadcrumb
        serviceName="Residential"
        parentPath="/services"
        parentLabel="Industries"
      />
      
      <ServiceHero
        title="Residential Real Estate"
        category="Industries"
        description="Whether you're buying your first home or selling a luxury estate, our residential experts guide you through every step of your real estate journey."
        backgroundImage="/images/services/property-buying-hero.png"
        icon={Home}
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Residential Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for every residential need.
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
            <div className="relative h-80 rounded-lg overflow-hidden order-2 lg:order-1">
              <img 
                src="/images/services/property-buying-hero.png" 
                alt="Residential Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Your Home Journey Starts Here
              </h2>
              <p className="text-muted-foreground mb-8">
                We understand that buying or selling a home is one of life's biggest decisions. Our dedicated team provides personalized support every step of the way.
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Home</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start your home search with our expert residential team today.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Residential;
