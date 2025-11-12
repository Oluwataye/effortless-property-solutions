import { Link } from "react-router-dom";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/about/impact-hero.png";

const Impact = () => {
  const initiatives = [
    "Diversity & Inclusion Programs",
    "Equal Opportunity Employment",
    "Community Investment",
    "Educational Partnerships",
    "Social Responsibility",
    "Cultural Awareness Training",
  ];

  const pillars = [
    {
      title: "Inclusive Workforce",
      description: "Building diverse teams that reflect the communities we serve and fostering an inclusive workplace culture.",
    },
    {
      title: "Community Engagement",
      description: "Investing in local communities through partnerships, volunteer programs, and social initiatives.",
    },
    {
      title: "Equitable Opportunities",
      description: "Creating pathways for underrepresented groups to thrive in the real estate industry.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Inclusive Impact | AMOVATE"
        description="Our commitment to diversity, inclusion, and social responsibility in creating equitable opportunities for all."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Inclusive Impact" parentPath="/about" parentLabel="About" />
        
        <ServiceHero
          title="Inclusive Impact"
          category="Diversity & Inclusion"
          description="Creating an inclusive environment where diverse perspectives drive innovation and everyone has the opportunity to succeed."
          backgroundImage={heroImage}
          icon={Heart}
        />

        {/* Initiatives Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Inclusion Initiatives
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initiatives.map((initiative, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{initiative}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Impact Pillars
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {pillars.map((pillar, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{pillar.title}</h3>
                      <p className="text-muted-foreground">{pillar.description}</p>
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
                Join Our Inclusive Community
              </h2>
              <p className="text-xl opacity-90">
                Be part of an organization that values diversity and drives positive change.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/careers">Explore Careers</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Impact;
