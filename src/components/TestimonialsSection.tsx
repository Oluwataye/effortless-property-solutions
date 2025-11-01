
import { usePublicTestimonials } from "@/hooks/use-public-testimonials";
import { TestimonialCarousel } from "./testimonials/TestimonialCarousel";

const defaultTestimonials = [
  {
    id: "1",
    name: "John Smith",
    position: "Property Owner",
    company: "Smith Estates",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "AMOVATE Solutions transformed how I manage my 12-unit residential complex. Their proactive maintenance system caught issues before they became expensive problems.",
    result: "35% reduction in maintenance costs",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Real Estate Investor",
    company: "Johnson Holdings",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "Since partnering with AMOVATE, my portfolio occupancy rate jumped from 85% to 98%. Their tenant screening process is thorough and their response time is incredible.",
    result: "98% occupancy maintained",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Brown",
    position: "Commercial Property Director",
    company: "Metro Business Park",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "AMOVATE's technology platform gives me real-time insights into property performance. The financial reporting alone has saved me 20 hours per month.",
    result: "20 hours saved monthly",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { testimonials, isLoading } = usePublicTestimonials();

  // Display loading state or fallback to default testimonials if no approved ones exist
  const displayTestimonials = isLoading || !testimonials || testimonials.length === 0 
    ? defaultTestimonials
    : testimonials.map(t => ({
        id: t.id,
        name: t.name,
        position: t.relationship_status,
        company: undefined,
        result: undefined,
        image: t.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
        content: t.content,
        rating: t.rating || 5
      }));

  return (
    <div className="container mx-auto px-4">
      <TestimonialCarousel testimonials={displayTestimonials} />
    </div>
  );
};

export default TestimonialsSection;
