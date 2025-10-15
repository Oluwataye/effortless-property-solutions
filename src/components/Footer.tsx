import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold mb-4 font-serif">AMOVATE</h3>
            <div className="w-12 h-1 bg-secondary mb-4" />
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              Leading the way in property management and development with innovative solutions and exceptional service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Home</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />About Us</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Services</Link></li>
              <li><Link to="/portfolio" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Property Management</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Facility Management</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Project Management</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-secondary mr-0 group-hover:mr-2 transition-all duration-200" />Property Development</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start">
                <span className="text-secondary mr-2">📍</span>
                <span>123 Business Street<br />London, UK</span>
              </li>
              <li className="flex items-center">
                <span className="text-secondary mr-2">📞</span>
                <a href="tel:+44123456789" className="hover:text-secondary transition-colors">+44 123 456 789</a>
              </li>
              <li className="flex items-center">
                <span className="text-secondary mr-2">✉️</span>
                <a href="mailto:info@amovate.com" className="hover:text-secondary transition-colors">info@amovate.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-sm text-white/60">
              © {currentYear} Amovate Solutions Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <Link to="/privacy" className="hover:text-secondary transition-colors duration-200">Privacy Policy</Link>
              <span className="text-white/20">•</span>
              <Link to="/terms" className="hover:text-secondary transition-colors duration-200">Terms of Service</Link>
              <span className="text-white/20">•</span>
              <Link to="/cookies" className="hover:text-secondary transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;