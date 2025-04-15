
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "ongoing")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  // Default projects to show when data is loading or no projects exist
  const defaultProjects = [
    {
      id: "1",
      name: "Luxury Residential Complex",
      image_urls: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"],
      location: "London, UK",
    },
    {
      id: "2",
      name: "Modern Office Building",
      image_urls: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"],
      location: "Manchester, UK",
    },
    {
      id: "3",
      name: "Shopping Mall Development",
      image_urls: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80"],
      location: "Birmingham, UK",
    },
  ];

  // Show loading or use default projects if no data
  const displayProjects = isLoading || !projects || projects.length === 0 
    ? defaultProjects
    : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayProjects.map((project) => (
        <div
          key={project.id}
          className="group relative overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <img
            src={project.image_urls?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="mb-4">{project.location}</p>
              <Link
                to="/portfolio"
                className="inline-flex items-center text-white hover:underline"
              >
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;
