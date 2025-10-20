
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description is too long"),
  price: z.string().min(1, "Price is required"),
  location: z.string().min(3, "Location must be at least 3 characters").max(200, "Location is too long"),
  bedrooms: z.string().min(1, "Bedrooms is required"),
  bathrooms: z.string().min(1, "Bathrooms is required"),
  area: z.string().min(1, "Area is required"),
  category: z.enum(["residential", "commercial", "industrial"]),
  status: z.enum(["available", "sold", "rented"]),
});

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    
    // Validate form data
    try {
      propertySchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // Validate numeric values
      const priceNum = parseFloat(formData.price);
      const bedroomsNum = parseInt(formData.bedrooms);
      const bathroomsNum = parseInt(formData.bathrooms);
      const areaNum = parseFloat(formData.area);

      if (priceNum <= 0) {
        throw new Error("Price must be greater than 0");
      }
      if (bedroomsNum < 0) {
        throw new Error("Bedrooms cannot be negative");
      }
      if (bathroomsNum < 0) {
        throw new Error("Bathrooms cannot be negative");
      }
      if (areaNum <= 0) {
        throw new Error("Area must be greater than 0");
      }

      const propertyData = {
        ...formData,
        price: priceNum,
        bedrooms: bedroomsNum,
        bathrooms: bathroomsNum,
        area: areaNum,
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
      console.error("Property form error:", error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${property ? "update" : "add"} property`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleFormDataChange,
    handleImageChange,
    handleSubmit,
    isSubmitting,
  };
};
