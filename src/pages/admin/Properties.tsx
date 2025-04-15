
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PropertyForm from "@/components/admin/properties/PropertyForm";
import PropertyList from "@/components/admin/properties/PropertyList";

const Properties = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const { data: properties, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .match({ id });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      refetch();
      // Also invalidate the featured properties query
      queryClient.invalidateQueries({ queryKey: ["featured-properties"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (property: any) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    refetch();
    // Also invalidate the featured properties query
    queryClient.invalidateQueries({ queryKey: ["featured-properties"] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Properties</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <PropertyForm
                  onSuccess={handleSuccess}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Property Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
            </DialogHeader>
            {selectedProperty && (
              <ScrollArea className="max-h-[70vh] pr-4">
                <PropertyForm
                  property={selectedProperty}
                  onSuccess={handleSuccess}
                  onCancel={() => setIsEditDialogOpen(false)}
                />
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>

        <PropertyList
          properties={properties || []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </AdminLayout>
  );
};

export default Properties;
