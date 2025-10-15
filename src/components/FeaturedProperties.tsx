
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <div
          key={property.id}
          className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full shadow-lg">
                {property.category || 'Featured'}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-3 font-serif group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <p className="text-muted-foreground mb-4 flex items-center">
              <span className="text-secondary mr-2">📍</span>
              {property.location}
            </p>
            
            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-primary">
                ${property.price?.toLocaleString()}
              </p>
            </div>
            
            {/* Property Features */}
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-border">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Bed className="h-5 w-5 text-secondary" />
                <span className="font-medium">{property.bedrooms}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Bath className="h-5 w-5 text-secondary" />
                <span className="font-medium">{property.bathrooms}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Ruler className="h-5 w-5 text-secondary" />
                <span className="font-medium">{property.area} ft²</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link
              to={`/portfolio`}
              className="inline-flex items-center justify-center w-full py-3 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg transition-all duration-200 group/btn"
            >
              View Details 
              <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
