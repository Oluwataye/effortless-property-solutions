
import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (file: File, bucket: "property_images" | "blog_images") => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
};

export const uploadMedia = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('media')
    .upload(file.name, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw error;

  return data.path;
};
