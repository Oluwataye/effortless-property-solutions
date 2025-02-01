import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Briefcase, Phone, FileText } from "lucide-react";

const navigationItems = [
  {
    title: "About Us",
    description: "Learn about our company's history, values, and team",
    path: "/about",
    icon: Users,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    title: "Our Services",
    description: "Explore our comprehensive range of services",
    path: "/services",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    title: "Portfolio",
    description: "View our successful projects and achievements",
    path: "/portfolio",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    title: "Blog",
    description: "Stay updated with our latest news and insights",
    path: "/blog",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    title: "Contact",
    description: "Get in touch with our team",
    path: "/contact",
    icon: Phone,
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  }
];

const HomeNavigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => navigate(item.path)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-70" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className={`text-sm opacity-0 transform translate-y-4 transition-all duration-300 ${
                    hoveredItem === item.title ? "opacity-100 translate-y-0" : ""
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNavigation;