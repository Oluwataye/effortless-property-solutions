
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
      <div className="bg-card rounded-2xl shadow-xl p-10 md:p-12 text-center border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div className="mb-6">
          <div className="text-6xl text-secondary mb-4">"</div>
        </div>
        <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-light italic">
          {testimonial.content}
        </p>
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
          <Avatar className="w-16 h-16 overflow-hidden border-2 border-secondary">
            <AvatarImage 
              src={testimonial.image} 
              alt={testimonial.name}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="text-lg bg-secondary/10 text-secondary">{getInitials(testimonial.name)}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.position || "Client"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
