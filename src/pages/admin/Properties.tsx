
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Home, DollarSign, TrendingUp, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PropertyForm from "@/components/admin/properties/PropertyForm";
import PropertyList from "@/components/admin/properties/PropertyList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Properties = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const { data: properties, refetch, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Calculate statistics
  const stats = {
    total: properties?.length || 0,
    available: properties?.filter(p => p.status === 'available').length || 0,
    sold: properties?.filter(p => p.status === 'sold').length || 0,
    totalValue: properties?.reduce((sum, p) => sum + (p.price || 0), 0) || 0,
  };

  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyToDelete);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      queryClient.invalidateQueries({ queryKey: ["featured-properties"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  const handleEdit = (property: any) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedProperty(null);
    
    // Refresh all related queries
    queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    queryClient.invalidateQueries({ queryKey: ["featured-properties"] });
    queryClient.invalidateQueries({ queryKey: ["properties"] });
    
    refetch();
    
    toast({
      title: "Success",
      description: `Property ${selectedProperty ? "updated" : "added"} successfully`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Property Management</h1>
            <p className="text-muted-foreground mt-1">Manage your property listings and inventory</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-md">
                <Plus className="mr-2 h-5 w-5" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Property</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[75vh] pr-4">
                <PropertyForm
                  onSuccess={handleSuccess}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">All listings</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{stats.available}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for sale</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sold Properties</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.sold}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully sold</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                ${(stats.totalValue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-1">Portfolio value</p>
            </CardContent>
          </Card>
        </div>

        {/* Edit Property Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Property</DialogTitle>
            </DialogHeader>
            {selectedProperty && (
              <ScrollArea className="max-h-[75vh] pr-4">
                <PropertyForm
                  property={selectedProperty}
                  onSuccess={handleSuccess}
                  onCancel={() => {
                    setIsEditDialogOpen(false);
                    setSelectedProperty(null);
                  }}
                />
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this property. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPropertyToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Property List */}
        <PropertyList
          properties={properties || []}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default Properties;
