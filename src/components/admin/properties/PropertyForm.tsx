
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import MediaSelector from "@/components/admin/media/MediaSelector";

interface PropertyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PropertyForm = ({ onSuccess, onCancel }: PropertyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    category: "residential",
    status: "available",
    image_urls: [] as string[],
  });
  const [currentImageField, setCurrentImageField] = useState("property_image_1");

  const addImageUrl = (url: string) => {
    const index = parseInt(currentImageField.split('_').pop() || "1") - 1;
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

  const handleImageFieldChange = (index: number) => {
    setCurrentImageField(`property_image_${index}`);
  };

  const renderImageSelectors = () => {
    const selectors = [];
    // Always render the current number of images plus one more (up to 5)
    const totalSelectors = Math.min(formData.image_urls.length + 1, 5);
    
    for (let i = 0; i < totalSelectors; i++) {
      selectors.push(
        <div key={i} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Property Image {i + 1}
          </label>
          <MediaSelector
            value={formData.image_urls[i] || ''}
            onChange={(url) => {
              handleImageFieldChange(i + 1);
              addImageUrl(url);
            }}
            fieldName={`property_image_${i + 1}`}
          />
        </div>
      );
    }
    
    return selectors;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />
      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          required
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={(e) =>
            setFormData({ ...formData, bedrooms: e.target.value })
          }
          required
        />
        <Input
          type="number"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={(e) =>
            setFormData({ ...formData, bathrooms: e.target.value })
          }
          required
        />
        <Input
          type="number"
          placeholder="Area (sq ft)"
          value={formData.area}
          onChange={(e) =>
            setFormData({ ...formData, area: e.target.value })
          }
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={formData.status}
          onValueChange={(value) =>
            setFormData({ ...formData, status: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {renderImageSelectors()}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Property</Button>
      </div>
    </form>
  );
};

export default PropertyForm;
