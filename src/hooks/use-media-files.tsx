
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  created_at: string;
}

export const useMediaFiles = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from('media').list();
      
      if (error) throw error;

      const filesWithUrls = await Promise.all(
        data.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: publicUrl,
            size: file.metadata.size,
            created_at: file.created_at,
          };
        })
      );

      setFiles(filesWithUrls);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return { files, isLoading, refetch: fetchFiles };
};
