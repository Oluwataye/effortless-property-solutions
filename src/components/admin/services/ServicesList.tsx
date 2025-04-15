
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Service } from "@/hooks/use-services";
import { supabase } from "@/integrations/supabase/client";

interface ServicesListProps {
  services: Service[];
  onEdit: (service: Service) => void;
  isLoading?: boolean;
  onRefetch: () => void;
}

const ServicesList = ({ services, onEdit, isLoading = false, onRefetch }: ServicesListProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      onRefetch(); // Refresh the list after delete
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete service: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`rounded-md border ${isLoading ? 'opacity-70' : ''}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 && !isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No services found. Add your first service to get started.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell>{service.icon || "None"}</TableCell>
                <TableCell>
                  {service.price ? `$${service.price.toFixed(2)}` : "N/A"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(service)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServicesList;
