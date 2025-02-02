import { useState, useEffect } from "react";
import { Menu, X, Search, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">AMOVATE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-secondary-dark hover:text-primary"
                } transition-colors`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            
            {session ? (
              <button
                onClick={handleSignOut}
                className="text-secondary-dark hover:text-primary transition-colors flex items-center"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-secondary-dark hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            )}
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-secondary-dark hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md p-4 animate-slide-down">
            <div className="container mx-auto">
              <input
                type="search"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-secondary-dark hover:text-primary"
                } transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 text-secondary-dark hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="block py-2 text-secondary-dark hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;