import { Link } from "react-router-dom";
import { Building2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/services/facility-management-hero.png";

const FacilityManagement = () => {
  const features = [
    "24/7 Building Operations & Maintenance",
    "Energy Management & Sustainability",
    "Preventive Maintenance Programs",
    "Emergency Response Services",
    "Vendor Management & Coordination",
    "Compliance & Safety Standards",
  ];

  const benefits = [
    {
      title: "Cost Efficiency",
      description: "Reduce operational costs through optimized maintenance and energy management strategies.",
    },
    {
      title: "Extended Asset Life",
      description: "Proactive maintenance extends the lifespan of your facility's critical systems and equipment.",
    },
    {
      title: "Regulatory Compliance",
      description: "Stay compliant with all local and national building codes and safety regulations.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Facility Management Services | AMOVATE"
        description="Comprehensive facility management solutions including building operations, maintenance, energy management, and compliance services."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Facility Management" />
        
        <ServiceHero
          title="Facility Management"
          category="Professional Services"
          description="Comprehensive facility management solutions that optimize operations, reduce costs, and enhance the performance of your properties."
          backgroundImage={heroImage}
          icon={Building2}
        />

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Services Include
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
                Why Choose Our Facility Management?
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
                Ready to Optimize Your Facility?
              </h2>
              <p className="text-xl opacity-90">
                Let our experts help you create a comprehensive facility management strategy.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FacilityManagement;
