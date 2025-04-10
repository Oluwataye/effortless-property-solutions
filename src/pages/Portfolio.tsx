
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Ruler } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const PortfolioContent = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const projects = [
    {
      title: "Luxury Apartment Complex",
      category: "Property Development",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      description: "A modern 200-unit luxury apartment complex featuring state-of-the-art amenities.",
    },
    {
      title: "Corporate Office Building",
      category: "Facility Management",
      image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
      description: "Comprehensive facility management for a 20-story corporate office building.",
    },
    {
      title: "Residential Community",
      category: "Property Management",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      description: "Full-service property management for a 500-unit residential community.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">Our Properties</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={property.image_urls?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-sm text-primary mb-2">${property.price?.toLocaleString()}</p>
                  <p className="text-secondary mb-4">{property.location}</p>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
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
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No properties available at this time.</p>
          </div>
        )}

        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-primary mb-2">{project.category}</p>
                <p className="text-secondary">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContent />
    </QueryClientProvider>
  );
};

export default Portfolio;
