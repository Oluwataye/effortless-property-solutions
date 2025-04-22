
export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  status: string;
  photo_url?: string;
  relationship_status: string;
}

export interface TestimonialFormData {
  name: string;
  content: string;
  rating: number;
  photo_url?: string;
  status?: string;
  relationship_status: string;
}
