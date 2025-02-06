import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProjectList from "@/components/admin/projects/ProjectList";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProjectsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();

  const handleEdit = (id: string) => {
    setSelectedProjectId(id);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedProjectId(undefined);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add Project</Button>
        </div>

        <ProjectList onEdit={handleEdit} />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedProjectId ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              projectId={selectedProjectId}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;