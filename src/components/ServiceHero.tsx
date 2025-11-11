import { LucideIcon } from "lucide-react";
import SocialShareButtons from "./SocialShareButtons";

interface ServiceHeroProps {
  title: string;
  category: string;
  description: string;
  backgroundImage: string;
  icon: LucideIcon;
}

const ServiceHero = ({
  title,
  category,
  description,
  backgroundImage,
  icon: Icon,
}: ServiceHeroProps) => {
  return (
    <section
      className="relative min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Content Box */}
          <div className="max-w-xl bg-background/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Social Share Buttons */}
          <div className="lg:mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SocialShareButtons title={title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
