
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
    company?: string;
    result?: string;
  };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="bg-card rounded-2xl shadow-xl p-8 md:p-10 border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
        {/* Rating Stars */}
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-secondary fill-secondary' : 'text-muted fill-muted'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <div className="mb-4">
          <div className="text-5xl text-secondary mb-2 leading-none">"</div>
        </div>
        
        <p className="text-base md:text-lg text-foreground mb-6 leading-relaxed italic flex-grow">
          {testimonial.content}
        </p>

        {/* Result Badge */}
        {testimonial.result && (
          <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
            {testimonial.result}
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-6 border-t border-border">
          <Avatar className="w-14 h-14 overflow-hidden border-2 border-secondary">
            <AvatarImage 
              src={testimonial.image} 
              alt={testimonial.name}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="text-base bg-secondary/10 text-secondary">{getInitials(testimonial.name)}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h4 className="font-bold text-base text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.position || "Client"}</p>
            {testimonial.company && (
              <p className="text-xs text-muted-foreground font-semibold">{testimonial.company}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
