import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ServiceFormProps {
  service?: any;
  onClose: () => void;
}

const ServiceForm = ({ service, onClose }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    icon: service?.icon || "",
    price: service?.price || "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    const { error } = service?.id
      ? await supabase
          .from("services")
          .update(data)
          .eq("id", service.id)
      : await supabase.from("services").insert([data]);

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Service ${service?.id ? "updated" : "created"} successfully`,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {service?.id ? "Edit Service" : "Add New Service"}
        </h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="icon">Icon (Lucide icon name)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) =>
              setFormData({ ...formData, icon: e.target.value })
            }
            placeholder="e.g., Home, Settings, User"
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Enter price (optional)"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : service?.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;