import { Link } from "react-router-dom";
import { Home, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/services/real-estate-management-hero.png";

const RealEstateManagement = () => {
  const features = [
    "Tenant Acquisition & Screening",
    "Rent Collection & Financial Reporting",
    "Property Inspections & Maintenance",
    "Lease Administration",
    "Tenant Relations & Support",
    "Legal Compliance Management",
  ];

  const benefits = [
    {
      title: "Maximized Returns",
      description: "Optimize rental income through strategic pricing and reduced vacancy periods.",
    },
    {
      title: "Hassle-Free Management",
      description: "We handle day-to-day operations so you can focus on growing your portfolio.",
    },
    {
      title: "Tenant Satisfaction",
      description: "Professional management ensures happy tenants and longer lease terms.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Real Estate Management Services | AMOVATE"
        description="Professional property management services including tenant acquisition, rent collection, maintenance, and lease administration."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Real Estate Management" />
        
        <ServiceHero
          title="Real Estate Management"
          category="Property Management"
          description="Professional property management services that maximize your investment returns while minimizing the hassles of property ownership."
          backgroundImage={heroImage}
          icon={Home}
        />

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Comprehensive Management Services
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
                Benefits of Professional Management
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
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Let Us Manage Your Property
              </h2>
              <p className="text-xl opacity-90">
                Experience stress-free property ownership with our expert management team.
              </p>
              <Button asChild size="lg" variant="default">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RealEstateManagement;
