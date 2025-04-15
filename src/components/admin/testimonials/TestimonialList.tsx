
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Star, Trash2, CheckCircle, XCircle, Edit 
} from "lucide-react";
import { Testimonial } from "@/types/testimonial";

interface TestimonialListProps {
  testimonials: Testimonial[] | undefined;
  onEdit: (testimonial: Testimonial) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export function TestimonialList({ 
  testimonials, onEdit, onUpdateStatus, onDelete 
}: TestimonialListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testimonials?.map((testimonial) => (
          <TableRow key={testimonial.id}>
            <TableCell>{testimonial.name}</TableCell>
            <TableCell className="max-w-md truncate">
              {testimonial.content}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>{testimonial.status}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEdit(testimonial)}
                >
                  <Edit className="w-4 h-4 text-blue-500" />
                </Button>
                
                {testimonial.status === 'pending' && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onUpdateStatus(testimonial.id, 'approved')}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onUpdateStatus(testimonial.id, 'rejected')}
                    >
                      <XCircle className="w-4 h-4 text-red-500" />
                    </Button>
                  </>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(testimonial.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
