import { FileText, TrendingUp, Award, Building2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "Luxury Residential Development",
    category: "Residential",
    description: "Transformed a 50-acre site into a premium residential community with 200+ homes.",
    results: ["$150M in sales", "98% occupancy rate", "Award-winning design"],
    image: "/images/services/property-development-hero.png"
  },
  {
    title: "Corporate Office Portfolio",
    category: "Commercial",
    description: "Managed a portfolio of 15 commercial properties across major metropolitan areas.",
    results: ["25% increase in rental income", "95% tenant retention", "Reduced operating costs by 18%"],
    image: "/images/services/real-estate-management-hero.png"
  },
  {
    title: "Industrial Park Redevelopment",
    category: "Industrial",
    description: "Converted outdated industrial facilities into modern logistics centers.",
    results: ["500,000 sq ft redeveloped", "Triple net returns", "LEED certified"],
    image: "/images/services/facility-management-hero.png"
  },
  {
    title: "Healthcare Campus Expansion",
    category: "Healthcare",
    description: "Facilitated the acquisition and development of a 25-acre medical campus.",
    results: ["$80M project value", "On-time delivery", "State-of-the-art facilities"],
    image: "/images/services/property-buying-hero.png"
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Case Studies & Resources | AMOVATE"
        description="Explore our successful real estate projects and case studies across residential, commercial, industrial, and healthcare sectors."
      />
      
      <ServiceBreadcrumb
        serviceName="Case Studies"
        parentPath="/"
        parentLabel="Home"
      />
      
      <ServiceHero
        title="Case Studies"
        category="Resources"
        description="Discover how we've helped clients achieve exceptional results across diverse real estate sectors. Our case studies showcase our expertise and commitment to excellence."
        backgroundImage="/images/services/property-development-hero.png"
        icon={FileText}
      />

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real projects that demonstrate our capabilities and expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${study.image})` }} />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                      {study.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Key Results:</p>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Award className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">500+</p>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div>
              <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">$2B+</p>
              <p className="text-muted-foreground">Property Value Managed</p>
            </div>
            <div>
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">98%</p>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div>
              <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">25+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let us help you achieve similar success with your real estate goals.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
