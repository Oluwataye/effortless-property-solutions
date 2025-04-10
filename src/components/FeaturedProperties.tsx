
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Bed, Bath, Ruler } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

const FeaturedProperties = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
        ))}
      </div>
    );
  }

  // If no properties are available, show a message
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No properties available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {properties.map((property) => (
        <div
          key={property.id}
          className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={property.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
            <p className="text-muted-foreground mb-2">{property.location}</p>
            <p className="text-xl font-bold mb-3">${property.price?.toLocaleString()}</p>
            
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center">
                <Ruler className="h-4 w-4 mr-1" />
                <span>{property.area} sq ft</span>
              </div>
            </div>
            
            <Link
              to={`/portfolio`}
              className="inline-flex items-center text-primary hover:underline"
            >
              View Property <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
