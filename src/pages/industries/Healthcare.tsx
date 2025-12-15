import { Heart, Stethoscope, Building, Users, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Building,
    title: "Medical Office Buildings",
    description: "Purpose-built medical office spaces designed for healthcare delivery."
  },
  {
    icon: Stethoscope,
    title: "Outpatient Facilities",
    description: "Modern ambulatory care centers and specialty clinics."
  },
  {
    icon: Heart,
    title: "Senior Living",
    description: "Assisted living, memory care, and independent living communities."
  },
  {
    icon: Users,
    title: "Medical Campuses",
    description: "Integrated healthcare campuses combining multiple services."
  }
];

const benefits = [
  "Healthcare zoning expertise",
  "ADA compliance guidance",
  "Medical equipment planning",
  "Patient flow optimization",
  "Regulatory compliance support",
  "Healthcare tenant representation"
];

const Healthcare = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Healthcare Real Estate | AMOVATE"
        description="Specialized healthcare real estate services for medical offices, outpatient facilities, and senior living communities."
      />
      
      <ServiceBreadcrumb
        serviceName="Healthcare"
        parentPath="/services"
        parentLabel="Industries"
      />
      
      <ServiceHero
        title="Healthcare Real Estate"
        category="Industries"
        description="Specialized real estate solutions for healthcare providers, from medical office buildings to senior living communities, designed to support exceptional patient care."
        backgroundImage="/images/services/property-development-hero.png"
        icon={Stethoscope}
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Healthcare Property Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Facilities designed for the unique needs of healthcare delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden order-2 lg:order-1">
              <img 
                src="/images/services/property-development-hero.png" 
                alt="Healthcare Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Healthcare Real Estate Specialists
              </h2>
              <p className="text-muted-foreground mb-8">
                We understand the complex requirements of healthcare facilities, from regulatory compliance to patient experience optimization.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Better Healthcare Spaces</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Partner with our healthcare real estate experts today.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Healthcare;
