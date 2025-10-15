import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <span className="text-3xl font-bold text-primary font-serif tracking-tight">
              AMOVATE
            </span>
            <span className="ml-2 text-secondary text-xl">●</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-primary bg-accent/10"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            
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
          <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md shadow-xl p-6 animate-slide-down border-t border-border">
            <div className="container mx-auto">
              <input
                type="search"
                placeholder="Search properties, services..."
                className="w-full p-4 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-down border-t border-border mt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-3 px-4 my-1 rounded-lg ${
                  isActive(item.path)
                    ? "text-primary bg-accent/10 font-semibold"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                } transition-all duration-200`}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;