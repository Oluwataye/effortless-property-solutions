
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ServicesList from "@/components/admin/services/ServicesList";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Service } from "@/hooks/use-services";
import { ScrollArea } from "@/components/ui/scroll-area";

const Services = () => {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

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
              />
            </ScrollArea>
          </div>
        ) : (
          <ServicesList onEdit={handleEditService} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Services;
