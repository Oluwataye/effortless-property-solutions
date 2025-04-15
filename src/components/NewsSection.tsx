
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NewsSection = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["featured-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("publish_date", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  // Default news to show when data is loading or no news exist
  const defaultNews = [
    {
      id: "1",
      title: "AMOVATE Wins Property Management Award 2024",
      created_at: "2024-03-15T00:00:00.000Z",
      featured_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    },
    {
      id: "2", 
      title: "New Sustainable Building Project Launched",
      created_at: "2024-03-10T00:00:00.000Z",
      featured_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      title: "Expanding Our Services to New Regions",
      created_at: "2024-03-05T00:00:00.000Z",
      featured_image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80",
    },
  ];

  // Show loading or use default news if no data
  const displayNews = isLoading || !news || news.length === 0 
    ? defaultNews
    : news;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayNews.map((item) => (
        <div
          key={item.id}
          className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={item.featured_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{formatDate(item.created_at)}</p>
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
