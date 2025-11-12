import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNavigation } from "@/data/navigationData";
import { cn } from "@/lib/utils";

const AboutMegaMenu = () => {
  const aboutItem = mainNavigation.find((item) => item.label === "About");

  if (!aboutItem?.columns) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-medium">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[90vw] max-w-[800px] p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aboutItem.columns.map((column) => (
                  <div key={column.title} className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-muted-foreground">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.links.map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <li key={link.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={link.href}
                                className={cn(
                                  "block group rounded-md p-3 transition-all duration-200",
                                  "hover:bg-accent hover:shadow-sm",
                                  "focus:outline-none focus:ring-2 focus:ring-ring"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  {IconComponent && (
                                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                                      <IconComponent className="h-4 w-4 text-primary" />
                                    </div>
                                  )}
                                  <div className="space-y-1 flex-1">
                                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                      {link.label}
                                    </p>
                                    {link.description && (
                                      <p className="text-xs text-muted-foreground line-clamp-2">
                                        {link.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AboutMegaMenu;
