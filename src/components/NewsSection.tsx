import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      title: "AMOVATE Wins Property Management Award 2024",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    },
    {
      title: "New Sustainable Building Project Launched",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    },
    {
      title: "Expanding Our Services to New Regions",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {news.map((item) => (
        <div
          key={item.title}
          className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{item.date}</p>
            <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:underline"
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;