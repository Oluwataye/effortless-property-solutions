import { Link } from "react-router-dom";
import { MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import InteractiveMap from "@/components/InteractiveMap";
import heroImage from "/images/about/locations-hero.png";

const Locations = () => {
  const regions = [
    "North America Headquarters",
    "European Operations",
    "Asia-Pacific Offices",
    "Middle East Presence",
    "Latin America Offices",
    "Africa Operations",
  ];

  const advantages = [
    {
      title: "Global Reach",
      description: "Strategic locations across continents to serve clients worldwide with local expertise.",
    },
    {
      title: "Local Knowledge",
      description: "Deep understanding of regional markets, regulations, and cultural nuances.",
    },
    {
      title: "Seamless Service",
      description: "Coordinated operations ensuring consistent quality and support across all locations.",
    },
  ];

  return (
    <>
      <SEOHead 
        title="Office Locations | AMOVATE"
        description="Find our global office locations and discover how our worldwide presence enables us to serve you better."
      />
      
      <div className="min-h-screen pt-20">
        <ServiceBreadcrumb serviceName="Locations" />
        
        <ServiceHero
          title="Find Us"
          category="Office Locations"
          description="Serving clients globally with strategically located offices providing local expertise and international reach."
          backgroundImage={heroImage}
          icon={MapPin}
        />

        {/* Interactive Map Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Interactive Office Map
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Explore our global presence. Click on any marker to view detailed information about each office location.
              </p>
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* Regions Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Global Presence
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-lg font-medium">{region}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Our Locations Matter
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {advantages.map((advantage, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 space-y-3">
                      <h3 className="text-xl font-semibold">{advantage.title}</h3>
                      <p className="text-muted-foreground">{advantage.description}</p>
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
                Connect With Your Local Office
              </h2>
              <p className="text-xl opacity-90">
                Reach out to discover how our team can support your needs.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Locations;
