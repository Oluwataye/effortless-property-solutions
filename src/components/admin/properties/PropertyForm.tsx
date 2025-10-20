
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
  const { formData, handleFormDataChange, handleImageChange, handleSubmit, isSubmitting } = usePropertyForm({
    onSuccess,
    property,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PropertyDetailsForm
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-4">Property Images</h3>
          <PropertyImageSelectors
            imageUrls={formData.image_urls}
            onImageChange={handleImageChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? "Saving..." : property ? "Update Property" : "Add Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
