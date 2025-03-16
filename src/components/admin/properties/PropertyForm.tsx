
import React from "react";
import { Button } from "@/components/ui/button";
import { usePropertyForm } from "@/hooks/use-property-form";
import PropertyDetailsForm from "./PropertyDetailsForm";
import PropertyImageSelectors from "./PropertyImageSelectors";

interface PropertyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  property?: any; // The property to edit (if editing)
}

const PropertyForm = ({ onSuccess, onCancel, property }: PropertyFormProps) => {
  const { formData, handleFormDataChange, handleImageChange, handleSubmit } = usePropertyForm({
    onSuccess,
    property,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PropertyDetailsForm
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      
      <PropertyImageSelectors
        imageUrls={formData.image_urls}
        onImageChange={handleImageChange}
      />
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{property ? "Update" : "Add"} Property</Button>
      </div>
    </form>
  );
};

export default PropertyForm;
