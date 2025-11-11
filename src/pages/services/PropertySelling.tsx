import { Link } from "react-router-dom";
import { TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/services/property-selling-hero.png";

const PropertySelling = () => {
  const features = [
    "Property Valuation & Market Analysis",
    "Strategic Marketing & Advertising",
    "Professional Photography & Staging",
    "Buyer Screening & Qualification",
    "Negotiation & Offer Management",
    "Closing Coordination & Support",
  ];

  const benefits = [
    {
      title: "Maximum Value",
      description: "Strategic pricing and marketing ensure you get the best possible price for your property.",
    },
    {
      title: "Fast Sales",
      description: "Proven marketing strategies and wide networks accelerate your property sale timeline.",
    },
    {
      title: "Stress-Free Process",
      description: "We handle all aspects of the sale, from listing to closing, for a seamless experience.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Property Selling Services | AMOVATE"
        description="Maximize your property value with our expert selling services including valuation, marketing, negotiation, and closing support."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Property Selling" />
        
        <ServiceHero
          title="Property Selling"
          category="Sales Services"
          description="Maximize your property value with our proven selling strategies, professional marketing, and expert negotiation skills."
          backgroundImage={heroImage}
          icon={TrendingUp}
        />

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Selling Process
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
                Why Sell With Us?
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
                Ready to Sell Your Property?
              </h2>
              <p className="text-xl opacity-90">
                Get a free property valuation and discover how we can help you achieve the best sale price.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Request Valuation</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PropertySelling;
