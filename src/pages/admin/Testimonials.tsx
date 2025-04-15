
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
import { Star, Trash2, CheckCircle, XCircle, Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
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
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
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

  // Update testimonial mutation
  const updateTestimonialMutation = useMutation({
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
      setIsEditDialogOpen(false);
      setSelectedTestimonial(null);
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
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
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
      queryClient.invalidateQueries({ queryKey: ['approved-testimonials'] });
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, isEdit: boolean = false) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const testimonialData = {
      name: formData.get('name') as string,
      content: formData.get('content') as string,
      rating: Number(formData.get('rating')),
      status: formData.get('status') as string || 'pending',
      photo_url: formData.get('photo_url') as string || undefined,
    };
    
    if (isEdit && selectedTestimonial) {
      updateTestimonialMutation.mutate({
        id: selectedTestimonial.id,
        ...testimonialData
      });
    } else {
      addTestimonialMutation.mutate(testimonialData);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditDialogOpen(true);
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
              <ScrollArea className="max-h-[70vh] pr-4">
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
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
                      defaultValue="5"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="photo_url" className="text-sm font-medium">
                      Photo URL (optional)
                    </label>
                    <Input
                      id="photo_url"
                      name="photo_url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Testimonial
                  </Button>
                </form>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Edit Testimonial Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                {selectedTestimonial && (
                  <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                    <div>
                      <label htmlFor="edit-name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input 
                        id="edit-name" 
                        name="name" 
                        defaultValue={selectedTestimonial.name}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-content" className="text-sm font-medium">
                        Content
                      </label>
                      <Textarea 
                        id="edit-content" 
                        name="content" 
                        defaultValue={selectedTestimonial.content}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-rating" className="text-sm font-medium">
                        Rating (1-5)
                      </label>
                      <Input
                        id="edit-rating"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        defaultValue={selectedTestimonial.rating}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-photo_url" className="text-sm font-medium">
                        Photo URL (optional)
                      </label>
                      <Input
                        id="edit-photo_url"
                        name="photo_url"
                        type="url"
                        defaultValue={selectedTestimonial.photo_url}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-status" className="text-sm font-medium">
                        Status
                      </label>
                      <Input
                        id="edit-status"
                        name="status"
                        defaultValue={selectedTestimonial.status}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Update Testimonial
                    </Button>
                  </form>
                )}
              </ScrollArea>
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
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        
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
