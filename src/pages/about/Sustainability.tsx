import { Link } from "react-router-dom";
import { Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/about/sustainability-hero.png";

const Sustainability = () => {
  const initiatives = [
    "Carbon Neutrality by 2030",
    "Green Building Certifications",
    "Energy-Efficient Operations",
    "Sustainable Supply Chain",
    "Waste Reduction Programs",
    "Renewable Energy Integration",
  ];

  const commitments = [
    {
      title: "Environmental Stewardship",
      description: "We prioritize eco-friendly practices in all our operations and developments.",
    },
    {
      title: "Community Impact",
      description: "Creating sustainable spaces that benefit both people and the planet.",
    },
    {
      title: "Innovation Leadership",
      description: "Leading the industry with cutting-edge sustainable technologies and practices.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Sustainability | AMOVATE"
        description="Our commitment to environmental sustainability through green building practices, energy efficiency, and carbon neutrality goals."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Sustainability" parentPath="/about" parentLabel="About" />
        
        <ServiceHero
          title="Sustainability"
          category="Our Commitment"
          description="Building a sustainable future through innovative practices, environmental stewardship, and a commitment to carbon neutrality."
          backgroundImage={heroImage}
          icon={Lightbulb}
        />

        {/* Initiatives Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Sustainability Initiatives
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

        {/* Commitments Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Commitments
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {commitments.map((commitment, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{commitment.title}</h3>
                      <p className="text-muted-foreground">{commitment.description}</p>
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
                Join Us in Building a Sustainable Future
              </h2>
              <p className="text-xl opacity-90">
                Partner with us to create environmentally responsible properties.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Sustainability;
