import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Portfolio = () => {
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
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Our Portfolio</h1>
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

export default Portfolio;