import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Home, Key, Construction, DollarSign, ChevronDown, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";

const iconMap: Record<string, any> = {
  Building2,
  Home,
  Key,
  Construction,
  DollarSign,
};

const HomeServiceSelector = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      
      return data.map(service => ({
        category: service.name,
        description: service.description,
        icon: service.icon && iconMap[service.icon] ? iconMap[service.icon] : Building2,
      }));
    },
  });

  const handleServiceSelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    // Navigate to services page
    navigate('/services');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--secondary)/0.08),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-12 leading-tight tracking-wide uppercase">
            How Can We Help You Today?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            I am looking for
          </p>
          
          {services && services.length > 0 && (
            <div className="animate-scale-in">
              <DropdownMenu onOpenChange={(open) => !open && setSearchQuery("")}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="w-full max-w-md mx-auto text-xl h-14 border-b-2 border-foreground rounded-none hover:bg-transparent hover:border-primary transition-all bg-transparent font-light italic animate-scale-in"
                  >
                    <span className={selectedCategory ? "animate-scale-in" : ""}>
                      {selectedCategory || "Select"}
                    </span>
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-[400px] max-w-[90vw] bg-background border-2 shadow-xl z-50"
                  align="center"
                  sideOffset={8}
                >
                  <div className="p-2 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {services
                      .filter((service) => 
                        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((service) => (
                        <DropdownMenuItem 
                          key={service.category}
                          className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10"
                          onSelect={() => handleServiceSelect(service.category)}
                        >
                          <div className="flex items-center gap-3 py-2 w-full">
                            <service.icon className="h-6 w-6 text-primary flex-shrink-0" />
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-lg text-foreground">{service.category}</span>
                              <span className="text-sm text-muted-foreground line-clamp-1">{service.description}</span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    {services.filter((service) => 
                      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      service.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        No services found
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeServiceSelector;
