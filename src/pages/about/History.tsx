import { Link } from "react-router-dom";
import { History as HistoryIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import heroImage from "/images/about/history-hero.png";

const History = () => {
  const milestones = [
    "Founded with Vision & Purpose",
    "Expansion to Global Markets",
    "Industry Innovation Leadership",
    "Sustainable Practices Adoption",
    "Digital Transformation",
    "Community Impact Programs",
  ];

  const achievements = [
    {
      title: "Decades of Excellence",
      description: "Building a legacy of trust, innovation, and exceptional service across generations.",
    },
    {
      title: "Industry Pioneer",
      description: "Setting standards and leading transformative changes in real estate and facility management.",
    },
    {
      title: "Global Reach",
      description: "Growing from local roots to a worldwide presence serving diverse markets.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Our History | AMOVATE"
        description="Discover the journey and milestones that shaped AMOVATE into an industry leader in real estate and facility management."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Our History" parentPath="/about" parentLabel="About" />
        
        <ServiceHero
          title="Our History"
          category="Our Journey"
          description="A legacy of excellence, innovation, and trust built over decades of serving clients across global markets."
          backgroundImage={heroImage}
          icon={HistoryIcon}
        />

        {/* Milestones Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Key Milestones
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{milestone}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Achievements
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
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
                Be Part of Our Continuing Story
              </h2>
              <p className="text-xl opacity-90">
                Join us as we write the next chapter of innovation and excellence.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/careers">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default History;
