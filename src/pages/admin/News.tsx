import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsList from "@/components/admin/news/NewsList";
import NewsForm from "@/components/admin/news/NewsForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const NewsPage = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    setSelectedNewsId(id);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedNewsId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">News Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add News Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedNewsId ? "Edit News Article" : "Add News Article"}
                </DialogTitle>
              </DialogHeader>
              <NewsForm
                newsId={selectedNewsId || undefined}
                onSuccess={handleSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>

        <NewsList onEdit={handleEdit} />
      </div>
    </AdminLayout>
  );
};

export default NewsPage;