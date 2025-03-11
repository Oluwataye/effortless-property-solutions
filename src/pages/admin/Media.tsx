
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import FileUploader from "@/components/admin/media/FileUploader";
import MediaList from "@/components/admin/media/MediaList";
import { useMediaFiles } from "@/hooks/use-media-files";
import { Loader2 } from "lucide-react";

const MediaPage = () => {
  const { files, isLoading, refetch } = useMediaFiles();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Media</h1>
        </div>

        <FileUploader onUploadComplete={refetch} />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <MediaList files={files} onDelete={refetch} />
        )}
      </div>
    </AdminLayout>
  );
};

export default MediaPage;
