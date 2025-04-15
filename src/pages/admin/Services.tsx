
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ServicesList from "@/components/admin/services/ServicesList";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Service } from "@/hooks/use-services";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Services = () => {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use React Query to fetch services
  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleAddNew = () => {
    setIsAddingService(true);
    setEditingService(null);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsAddingService(true);
  };

  const handleCloseForm = () => {
    setIsAddingService(false);
    setEditingService(null);
  };

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: `Service ${editingService ? "updated" : "created"} successfully`,
    });
    handleCloseForm();
    // Refresh the services list and other related queries
    queryClient.invalidateQueries({ queryKey: ["admin-services"] });
    queryClient.invalidateQueries({ queryKey: ["services"] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Services</h1>
          {!isAddingService && (
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          )}
        </div>

        {isAddingService ? (
          <div className="border rounded-md p-4">
            <ScrollArea className="max-h-[70vh] pr-4">
              <ServiceForm
                service={editingService}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
              />
            </ScrollArea>
          </div>
        ) : (
          <ServicesList 
            services={services || []} 
            onEdit={handleEditService} 
            isLoading={isLoading}
            onRefetch={() => queryClient.invalidateQueries({ queryKey: ["admin-services"] })}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Services;
