import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  status: string;
  photo_url?: string;
}

const TestimonialsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
  const addTestimonialMutation = useMutation({
    mutationFn: async (newTestimonial: Omit<Testimonial, 'id'>) => {
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
      setIsAddDialogOpen(false);
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

  // Update status mutation
  const updateStatusMutation = useMutation({
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
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    },
  });

  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addTestimonialMutation.mutate({
      name: formData.get('name') as string,
      content: formData.get('content') as string,
      rating: Number(formData.get('rating')),
      status: 'pending',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea id="content" name="content" required />
                </div>
                <div>
                  <label htmlFor="rating" className="text-sm font-medium">
                    Rating (1-5)
                  </label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Testimonial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
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
                        {testimonial.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: testimonial.id,
                                  status: 'approved',
                                })
                              }
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: testimonial.id,
                                  status: 'rejected',
                                })
                              }
                            >
                              <XCircle className="w-4 h-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            deleteTestimonialMutation.mutate(testimonial.id)
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TestimonialsPage;