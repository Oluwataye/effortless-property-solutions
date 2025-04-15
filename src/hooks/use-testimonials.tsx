
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial, TestimonialFormData } from "@/types/testimonial";
import { useToast } from "@/hooks/use-toast";

export function useTestimonials() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch testimonials
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  // Add testimonial mutation
  const addTestimonial = useMutation({
    mutationFn: async (newTestimonial: TestimonialFormData) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([newTestimonial])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add testimonial",
        variant: "destructive",
      });
    },
  });

  // Update testimonial mutation
  const updateTestimonial = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      const { id, ...updateData } = testimonial;
      const { data, error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    },
  });

  // Update status mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    },
  });

  // Delete testimonial mutation
  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    },
  });

  return {
    testimonials,
    isLoading,
    addTestimonial,
    updateTestimonial,
    updateStatus,
    deleteTestimonial,
  };
}
