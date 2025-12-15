import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ServicesMegaMenu from "./ServicesMegaMenu";
import AboutMegaMenu from "./AboutMegaMenu";
import { mainNavigation } from "@/data/navigationData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-background/80 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <span className="text-3xl font-bold text-primary font-serif tracking-tight">
              AMOVATE
            </span>
            <span className="ml-2 text-secondary text-xl">●</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center divide-x divide-border/30">
            {mainNavigation.map((item) => {
              // Special handling for Services with mega menu
              if (item.hasMegaMenu && item.label === "Services") {
                return (
                  <div key={item.label} className="px-4 first:pl-0">
                    <ServicesMegaMenu />
                  </div>
                );
              }

              // Special handling for About with mega menu
              if (item.hasMegaMenu && item.label === "About") {
                return (
                  <div key={item.label} className="px-4">
                    <AboutMegaMenu />
                  </div>
                );
              }

              // Special handling for Contact button
              if (item.label === "Contact") {
                return (
                  <div key={item.label} className="pl-4">
                    <Link
                      to={item.href || "#"}
                      className="px-6 py-2.5 bg-[hsl(230,70%,30%)] hover:bg-[hsl(230,80%,20%)] text-white font-semibold rounded transition-all duration-200 inline-block"
                    >
                      {item.label.toUpperCase()}
                    </Link>
                  </div>
                );
              }

              // Regular navigation items
              return (
                <div key={item.label} className="px-4">
                  <Link
                    to={item.href || "#"}
                    className={`${
                      isActive(item.href || "#")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    } py-2 transition-all duration-200 font-medium inline-flex items-center gap-1`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            })}
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="ml-2 p-2 text-muted-foreground hover:text-primary hover:bg-accent/5 rounded-lg transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/5 rounded-lg transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-20 left-0 w-full bg-background/95 backdrop-blur-md shadow-xl p-6 animate-fade-in border-t border-border">
            <div className="container mx-auto">
              <input
                type="search"
                placeholder="Search properties, services..."
                className="w-full p-4 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background text-foreground"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in border-t border-border mt-2">
            {mainNavigation.map((item) => {
              if (item.hasMegaMenu && item.columns) {
                // Mobile accordion for mega menus (Services, About)
                return (
                  <div key={item.label} className="my-1">
                    <div className="py-3 px-4 text-muted-foreground font-medium">
                      {item.label}
                    </div>
                    {item.columns.map((column) => (
                      <div key={column.title} className="pl-4">
                        <div className="text-xs font-semibold text-muted-foreground py-2 px-4">
                          {column.title}
                        </div>
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-accent/5 rounded-lg transition-all"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }

              // Special handling for Contact button on mobile
              if (item.label === "Contact") {
                return (
                  <Link
                    key={item.label}
                    to={item.href || "#"}
                    className="block mx-4 my-2 px-6 py-3 bg-[hsl(230,70%,30%)] hover:bg-[hsl(230,80%,20%)] text-white font-semibold rounded text-center transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label.toUpperCase()}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href || "#"}
                  className={`block py-3 px-4 my-1 rounded-lg ${
                    isActive(item.href || "#")
                      ? "text-primary bg-accent/10 font-semibold"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                  } transition-all duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;