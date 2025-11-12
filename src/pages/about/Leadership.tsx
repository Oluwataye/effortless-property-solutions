import { Link } from "react-router-dom";
import { Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/about/leadership-hero.png";

const Leadership = () => {
  const values = [
    "Strategic Vision & Innovation",
    "Global Market Expertise",
    "Integrity & Transparency",
    "Client-Centric Approach",
    "Operational Excellence",
    "Sustainable Growth",
  ];

  const principles = [
    {
      title: "Visionary Leadership",
      description: "Our leaders drive innovation and set industry standards through forward-thinking strategies.",
    },
    {
      title: "Collaborative Culture",
      description: "We foster a culture of collaboration that empowers teams and drives success.",
    },
    {
      title: "Global Perspective",
      description: "Our leadership team brings diverse international experience and insights.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Global Leadership | AMOVATE"
        description="Meet our global leadership team driving innovation and excellence in real estate and facility management."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Global Leadership" parentPath="/about" parentLabel="About" />
        
        <ServiceHero
          title="Global Leadership"
          category="Our Team"
          description="Experienced leaders driving innovation, excellence, and sustainable growth across global markets."
          backgroundImage={heroImage}
          icon={Users}
        />

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Leadership Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Leadership Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {principles.map((principle, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{principle.title}</h3>
                      <p className="text-muted-foreground">{principle.description}</p>
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
                Work With Industry Leaders
              </h2>
              <p className="text-xl opacity-90">
                Partner with a team that sets the standard for excellence.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Connect With Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Leadership;
