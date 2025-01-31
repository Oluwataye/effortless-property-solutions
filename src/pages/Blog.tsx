import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "The Future of Property Management",
      date: "2024-03-15",
      category: "Industry Trends",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      excerpt: "Exploring how technology is reshaping property management practices.",
    },
    {
      title: "Sustainable Facility Management",
      date: "2024-03-10",
      category: "Facility Management",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      excerpt: "Best practices for implementing sustainable facility management solutions.",
    },
    {
      title: "Investment Property Tips",
      date: "2024-03-05",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      excerpt: "Expert advice on maximizing your investment property returns.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-secondary text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-primary mb-2">{post.category}</p>
                <p className="text-secondary">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;