
import { usePublicTestimonials } from "@/hooks/use-public-testimonials";
import { TestimonialCarousel } from "./testimonials/TestimonialCarousel";

const defaultTestimonials = [
  {
    id: "1",
    name: "John Smith",
    position: "CEO, Smith Properties",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    content: "Amovate has transformed our property management experience. Their innovative solutions and dedication to service excellence are unmatched.",
    rating: 5
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Director, Johnson Real Estate",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content: "Working with Amovate has been a game-changer for our business. Their expertise and professionalism are truly outstanding.",
    rating: 5
  },
  {
    id: "3",
    name: "Michael Brown",
    position: "Property Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    content: "The level of service and attention to detail provided by Amovate is exceptional. They consistently exceed our expectations.",
    rating: 5
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
        position: t.relationship_status, // Use the relationship status here
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
