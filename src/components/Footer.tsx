import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">AMOVATE</h3>
              <p className="text-secondary font-semibold text-xl">SOLUTIONS</p>
            </div>
            <p className="text-white/90 leading-relaxed text-base">
              Premier property management and development solutions. Transforming properties into exceptional spaces.
            </p>
            
            {/* Social Icons - Larger and more prominent */}
            <div>
              <p className="text-sm font-semibold mb-3 text-secondary">Connect With Us</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* 24/7 Support Badge */}
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 inline-block">
              <p className="text-secondary font-bold text-sm">24/7 Emergency Support</p>
              <a href="tel:+234123456789" className="text-white text-lg font-semibold hover:text-secondary transition-colors">
                +234 123 456 789
              </a>
            </div>
          </div>

          {/* Quick Links & Industries */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/90 hover:text-secondary transition-colors text-base hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/90 hover:text-secondary transition-colors text-base hover:translate-x-1 inline-block">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/90 hover:text-secondary transition-colors text-base hover:translate-x-1 inline-block">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/90 hover:text-secondary transition-colors text-base hover:translate-x-1 inline-block">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-secondary transition-colors text-base hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
            
            <h4 className="text-xl font-semibold mb-4 mt-8 text-secondary">Industries</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link to="/industries/commercial" className="hover:text-secondary transition-colors">
                  • Commercial
                </Link>
              </li>
              <li>
                <Link to="/industries/residential" className="hover:text-secondary transition-colors">
                  • Residential
                </Link>
              </li>
              <li>
                <Link to="/industries/industrial" className="hover:text-secondary transition-colors">
                  • Industrial
                </Link>
              </li>
              <li>
                <Link to="/industries/healthcare" className="hover:text-secondary transition-colors">
                  • Healthcare
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - More Prominent */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-secondary">Get In Touch</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Visit Us</p>
                  <p className="text-white/80 text-sm">123 Business Avenue<br />Lagos, Nigeria</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <a href="tel:+234123456789" className="text-white/80 hover:text-secondary transition-colors text-sm">
                    +234 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a href="mailto:info@amovate.com" className="text-white/80 hover:text-secondary transition-colors text-sm">
                    info@amovate.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} AMOVATE Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/70 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/70 hover:text-secondary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
