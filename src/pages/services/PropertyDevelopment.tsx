import { Link } from "react-router-dom";
import { Hammer, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const PropertyDevelopment = () => {
  const features = [
    "Site Selection & Feasibility Studies",
    "Planning & Design Management",
    "Permit Acquisition & Regulatory Compliance",
    "Construction Management",
    "Quality Control & Assurance",
    "Project Delivery & Handover",
  ];

  const benefits = [
    {
      title: "End-to-End Solutions",
      description: "Complete development services from concept to completion under one roof.",
    },
    {
      title: "Risk Mitigation",
      description: "Comprehensive planning and oversight minimize project risks and delays.",
    },
    {
      title: "Value Creation",
      description: "Strategic development approaches maximize property value and ROI.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Property Development Services | AMOVATE"
        description="End-to-end property development solutions including planning, design, construction management, and project delivery."
      />
      
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Hammer className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Property Development
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                End-to-end development solutions that transform your vision into reality with expertise, efficiency, and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/portfolio">View Developments</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Development Services
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
                Why Choose Our Development Team?
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
                Ready to Develop Your Property?
              </h2>
              <p className="text-xl opacity-90">
                Partner with us to bring your development vision to life.
              </p>
              <Button asChild size="lg" variant="default">
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PropertyDevelopment;
