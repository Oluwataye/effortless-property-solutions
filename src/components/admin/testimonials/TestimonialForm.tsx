
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Testimonial, TestimonialFormData } from "@/types/testimonial";
import MediaSelector from "@/components/admin/media/MediaSelector";

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSubmit: (data: TestimonialFormData, isEdit: boolean) => void;
  onCancel?: () => void;
}

export function TestimonialForm({ testimonial, onSubmit, onCancel }: TestimonialFormProps) {
  const isEditMode = !!testimonial;
  const [photoUrl, setPhotoUrl] = useState(testimonial?.photo_url || '');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const testimonialData: TestimonialFormData = {
      name: formData.get('name') as string,
      content: formData.get('content') as string,
      rating: Number(formData.get('rating')),
      photo_url: photoUrl,
    };

    if (isEditMode) {
      testimonialData.status = formData.get('status') as string || 'pending';
    }
    
    onSubmit(testimonialData, isEditMode);
  };

  return (
    <ScrollArea className="max-h-[70vh] pr-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`${isEditMode ? 'edit-' : ''}name`} className="text-sm font-medium">
            Name
          </label>
          <Input 
            id={`${isEditMode ? 'edit-' : ''}name`} 
            name="name" 
            defaultValue={testimonial?.name}
            required 
          />
        </div>
        <div>
          <label htmlFor={`${isEditMode ? 'edit-' : ''}content`} className="text-sm font-medium">
            Content
          </label>
          <Textarea 
            id={`${isEditMode ? 'edit-' : ''}content`} 
            name="content" 
            defaultValue={testimonial?.content}
            required 
          />
        </div>
        <div>
          <label htmlFor={`${isEditMode ? 'edit-' : ''}rating`} className="text-sm font-medium">
            Rating (1-5)
          </label>
          <Input
            id={`${isEditMode ? 'edit-' : ''}rating`}
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue={testimonial?.rating || 5}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">
            Profile Photo
          </label>
          <MediaSelector
            value={photoUrl}
            onChange={setPhotoUrl}
            fieldName={`testimonial-photo-${isEditMode ? testimonial.id : 'new'}`}
          />
        </div>
        {isEditMode && (
          <div>
            <label htmlFor="edit-status" className="text-sm font-medium">
              Status
            </label>
            <Input
              id="edit-status"
              name="status"
              defaultValue={testimonial?.status}
            />
          </div>
        )}
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className={onCancel ? '' : 'w-full'}>
            {isEditMode ? 'Update' : 'Add'} Testimonial
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
}
