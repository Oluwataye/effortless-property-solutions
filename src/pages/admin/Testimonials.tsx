
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";
import { useTestimonials } from "@/hooks/use-testimonials";
import { Testimonial, TestimonialFormData } from "@/types/testimonial";

const TestimonialsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  
  const {
    testimonials,
    isLoading,
    addTestimonial,
    updateTestimonial,
    updateStatus,
    deleteTestimonial,
  } = useTestimonials();

  const handleSubmit = (formData: TestimonialFormData, isEdit: boolean) => {
    if (isEdit && selectedTestimonial) {
      updateTestimonial.mutate({
        id: selectedTestimonial.id,
        ...formData,
        status: formData.status || selectedTestimonial.status,
      });
      setIsEditDialogOpen(false);
      setSelectedTestimonial(null);
    } else {
      addTestimonial.mutate({
        ...formData,
        status: 'pending',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditDialogOpen(true);
  };

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatus.mutate({ id, status });
  };

  const handleDelete = (id: string) => {
    deleteTestimonial.mutate(id);
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
              <TestimonialForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>

          {/* Edit Testimonial Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
              </DialogHeader>
              {selectedTestimonial && (
                <TestimonialForm 
                  testimonial={selectedTestimonial}
                  onSubmit={handleSubmit}
                  onCancel={() => setIsEditDialogOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <TestimonialList 
              testimonials={testimonials}
              onEdit={handleEdit}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TestimonialsPage;
