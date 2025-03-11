
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import FileUploader from "@/components/admin/media/FileUploader";
import MediaList from "@/components/admin/media/MediaList";
import { useMediaFiles } from "@/hooks/use-media-files";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

const MediaPage = () => {
  const { files, isLoading, refetch } = useMediaFiles();
  const [searchParams] = useSearchParams();
  const selectionMode = searchParams.get("select") === "true";
  const fieldName = searchParams.get("field") || "";
  const returnUrl = searchParams.get("returnUrl") || "";

  const handleFileSelect = (url: string) => {
    if (!selectionMode) return;
    
    // Store the selected URL in localStorage
    localStorage.setItem(fieldName, url);
    
    // Navigate back to the return URL
    if (returnUrl) {
      window.location.href = returnUrl;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Media</h1>
          {selectionMode && (
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Selection Mode</span>
              <Button variant="outline" onClick={() => window.history.back()}>
                Cancel Selection
              </Button>
            </div>
          )}
        </div>

        {!selectionMode && <FileUploader onUploadComplete={refetch} />}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <MediaList 
            files={files} 
            onDelete={refetch} 
            selectionMode={selectionMode}
            onSelect={handleFileSelect}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default MediaPage;
