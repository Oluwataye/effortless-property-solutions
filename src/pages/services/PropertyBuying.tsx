import { Link } from "react-router-dom";
import { ShoppingCart, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/services/property-buying-hero.png";

const PropertyBuying = () => {
  const features = [
    "Property Search & Market Analysis",
    "Investment Strategy Consultation",
    "Due Diligence & Property Inspections",
    "Negotiation & Purchase Agreement",
    "Legal & Financial Guidance",
    "Closing Support & Documentation",
  ];

  const benefits = [
    {
      title: "Expert Market Knowledge",
      description: "Access insider knowledge and market trends to make informed investment decisions.",
    },
    {
      title: "Negotiation Power",
      description: "Our experienced negotiators secure the best possible terms and pricing for your purchase.",
    },
    {
      title: "Seamless Process",
      description: "From search to closing, we guide you through every step of the buying journey.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Property Buying Services | AMOVATE"
        description="Expert guidance for property acquisition including market analysis, due diligence, negotiation, and closing support."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Property Buying" />
        
        <ServiceHero
          title="Property Buying"
          category="Acquisition Services"
          description="Expert guidance for property acquisition that ensures you make the right investment decision with confidence."
          backgroundImage={heroImage}
          icon={ShoppingCart}
        />

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                How We Help You Buy
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Buy With Us?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Find Your Perfect Property
              </h2>
              <p className="text-xl opacity-90">
                Let our experts help you navigate the property buying process with confidence.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Get Expert Advice</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PropertyBuying;
