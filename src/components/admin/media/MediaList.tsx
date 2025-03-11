
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Download, Eye, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
}

interface MediaListProps {
  files: MediaFile[];
  onDelete: () => void;
  selectionMode?: boolean;
  onSelect?: (url: string) => void;
}

const MediaList = ({ files, onDelete, selectionMode = false, onSelect }: MediaListProps) => {
  const { toast } = useToast();

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      onDelete();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file) => (
        <Card 
          key={file.name} 
          className={`overflow-hidden ${selectionMode ? 'cursor-pointer hover:ring-2 hover:ring-primary/50' : ''}`}
          onClick={selectionMode ? () => onSelect?.(file.url) : undefined}
        >
          <div className="relative">
            {file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <div className="relative aspect-video">
                <img
                  src={file.url}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center aspect-video bg-gray-100">
                <Eye className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {selectionMode && (
              <div className="absolute top-2 right-2">
                <Button
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8 bg-white shadow-md border-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(file.url);
                  }}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium truncate" title={file.name}>{file.name}</h3>
            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            {!selectionMode && (
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(file.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MediaList;
