
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  category: string;
  status: string;
  image_urls: string[];
}

interface UsePropertyFormProps {
  onSuccess: () => void;
}

export const usePropertyForm = ({ onSuccess }: UsePropertyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    category: "residential",
    status: "available",
    image_urls: [],
  });
  const [currentImageField, setCurrentImageField] = useState("property_image_1");

  const handleFormDataChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (index: number, url: string) => {
    setCurrentImageField(`property_image_${index + 1}`);
    const newImageUrls = [...formData.image_urls];
    newImageUrls[index] = url;
    setFormData({ ...formData, image_urls: newImageUrls.filter(Boolean) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("properties").insert([
        {
          ...formData,
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          area: parseFloat(formData.area),
          created_by: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property added successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    handleFormDataChange,
    handleImageChange,
    handleSubmit,
  };
};
