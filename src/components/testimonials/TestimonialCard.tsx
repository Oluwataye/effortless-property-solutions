
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Testimonial } from "@/types/testimonial";
import { getInitials } from "@/utils/string-utils";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    position?: string;
    image?: string;
    content: string;
    rating: number;
  };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage 
            src={testimonial.image} 
            alt={testimonial.name}
            className="object-cover"
          />
          <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
        </Avatar>
        <p className="text-lg text-gray-600 mb-6 italic">
          "{testimonial.content}"
        </p>
        <h4 className="font-semibold text-primary">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.position || "Client"}</p>
      </div>
    </div>
  );
}
