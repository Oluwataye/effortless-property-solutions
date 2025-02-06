import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ServicesList from "@/components/admin/services/ServicesList";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Services = () => {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const handleAddNew = () => {
    setIsAddingService(true);
    setEditingService(null);
  };

  const handleEditService = (service: any) => {
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
          <ServiceForm
            service={editingService}
            onClose={handleCloseForm}
          />
        ) : (
          <ServicesList onEdit={handleEditService} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Services;