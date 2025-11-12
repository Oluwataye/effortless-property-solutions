import { Link } from "react-router-dom";
import { Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/about/careers-hero.png";

const Careers = () => {
  const benefits = [
    "Competitive Compensation",
    "Professional Development",
    "Work-Life Balance",
    "Health & Wellness Programs",
    "Global Opportunities",
    "Inclusive Culture",
  ];

  const opportunities = [
    {
      title: "Growth & Development",
      description: "Access to continuous learning, mentorship programs, and career advancement opportunities.",
    },
    {
      title: "Innovation Culture",
      description: "Work with cutting-edge technologies and contribute to industry-leading solutions.",
    },
    {
      title: "Global Impact",
      description: "Make a difference across markets while working with diverse, talented teams.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Careers | AMOVATE"
        description="Join our team and build your career with opportunities for growth, innovation, and global impact in real estate."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Careers" />
        
        <ServiceHero
          title="Work With Us"
          category="Careers"
          description="Join a dynamic team where innovation meets opportunity. Build your career with industry leaders committed to excellence."
          backgroundImage={heroImage}
          icon={Briefcase}
        />

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Work With Us
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Career Opportunities
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {opportunities.map((opportunity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                      <p className="text-muted-foreground">{opportunity.description}</p>
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
                Ready to Join Our Team?
              </h2>
              <p className="text-xl opacity-90">
                Explore open positions and take the next step in your career journey.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
