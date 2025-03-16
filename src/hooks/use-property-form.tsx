
import { useState, useEffect } from "react";
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
  property?: any;
}

export const usePropertyForm = ({ onSuccess, property }: UsePropertyFormProps) => {
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
  
  // Initialize form with property data if editing
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price?.toString() || "",
        location: property.location || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        area: property.area?.toString() || "",
        category: property.category || "residential",
        status: property.status || "available",
        image_urls: property.image_urls || [],
      });
    }
  }, [property]);

  const handleFormDataChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (index: number, url: string) => {
    const newImageUrls = [...formData.image_urls];
    newImageUrls[index] = url;
    setFormData({ ...formData, image_urls: newImageUrls.filter(Boolean) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        created_by: (await supabase.auth.getUser()).data.user?.id,
      };

      // If property exists, update it; otherwise, insert a new one
      const operation = property
        ? supabase.from("properties").update(propertyData).eq("id", property.id)
        : supabase.from("properties").insert([propertyData]);

      const { error } = await operation;

      if (error) throw error;

      toast({
        title: "Success",
        description: `Property ${property ? "updated" : "added"} successfully`,
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
