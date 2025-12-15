import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Building, Home, Factory, Stethoscope, FileText } from "lucide-react";

const industriesLinks = [
  {
    label: "Commercial",
    href: "/industries/commercial",
    description: "Office buildings & retail spaces",
    icon: Building,
  },
  {
    label: "Residential",
    href: "/industries/residential",
    description: "Homes & apartments",
    icon: Home,
  },
  {
    label: "Industrial",
    href: "/industries/industrial",
    description: "Warehouses & manufacturing",
    icon: Factory,
  },
  {
    label: "Healthcare",
    href: "/industries/healthcare",
    description: "Medical facilities",
    icon: Stethoscope,
  },
];

const resourcesLinks = [
  {
    label: "Case Studies",
    href: "/resources",
    description: "Success stories",
    icon: FileText,
  },
];

const IndustriesMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-muted-foreground hover:text-primary py-2 transition-all duration-200 font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Industries</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
          <div className="bg-background/98 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 p-6 min-w-[400px] animate-fade-in">
            <div className="grid grid-cols-2 gap-6">
              {/* Industries Column */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Industries
                </h3>
                <div className="space-y-1">
                  {industriesLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources Column */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <div className="space-y-1">
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Need industry expertise?
                  </p>
                  <Link
                    to="/contact"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Contact our specialists →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustriesMegaMenu;
