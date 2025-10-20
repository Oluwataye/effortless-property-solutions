
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Bed, Bath, Ruler, MapPin, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-muted/30 shadow-lg animate-pulse">
            <div className="h-72 bg-muted" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-8 bg-muted rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no properties are available, show a message
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Properties Available</h3>
          <p className="text-muted-foreground">Check back soon for new listings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {properties.slice(0, 6).map((property, index) => (
        <div
          key={property.id}
          className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Image Container with Overlay */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={property.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Status & Category Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-secondary text-secondary-foreground font-bold text-xs px-3 py-1.5 shadow-lg border-0">
                {property.category?.toUpperCase() || 'RESIDENTIAL'}
              </Badge>
              {property.status === 'sold' && (
                <Badge className="bg-destructive text-destructive-foreground font-bold text-xs px-3 py-1.5 shadow-lg border-0">
                  SOLD
                </Badge>
              )}
            </div>
            
            {/* Price Badge - Positioned on Image */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-card/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-xl border border-border">
                <p className="text-sm text-muted-foreground font-medium">Price</p>
                <p className="text-2xl font-bold text-primary">
                  ${property.price?.toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Quick View Button - Appears on Hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-card/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-serif group-hover:text-primary transition-colors line-clamp-1">
                {property.title}
              </h3>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-sm line-clamp-1">{property.location || 'Location not specified'}</span>
              </div>
            </div>
            
            {/* Description - Optional */}
            {property.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {property.description}
              </p>
            )}
            
            {/* Property Features Grid */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-lg font-bold text-foreground">{property.bedrooms || 0}</p>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>
              
              <div className="text-center border-x border-border">
                <div className="flex items-center justify-center mb-1">
                  <Bath className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-lg font-bold text-foreground">{property.bathrooms || 0}</p>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Ruler className="h-5 w-5 text-secondary" />
                </div>
                <p className="text-lg font-bold text-foreground">{property.area || 0}</p>
                <p className="text-xs text-muted-foreground">Sq Ft</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link
              to={`/portfolio`}
              className="inline-flex items-center justify-center w-full py-3.5 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl transition-all duration-300 group/btn shadow-md hover:shadow-lg"
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
