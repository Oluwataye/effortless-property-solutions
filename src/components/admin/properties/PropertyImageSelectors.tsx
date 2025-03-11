
import React from "react";
import MediaSelector from "@/components/admin/media/MediaSelector";

interface PropertyImageSelectorsProps {
  imageUrls: string[];
  onImageChange: (index: number, url: string) => void;
}

const PropertyImageSelectors = ({ imageUrls, onImageChange }: PropertyImageSelectorsProps) => {
  const handleImageFieldChange = (index: number, url: string) => {
    onImageChange(index, url);
  };

  const renderImageSelectors = () => {
    const selectors = [];
    // Always render the current number of images plus one more (up to 5)
    const totalSelectors = Math.min(imageUrls.length + 1, 5);
    
    for (let i = 0; i < totalSelectors; i++) {
      selectors.push(
        <div key={i} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Property Image {i + 1}
          </label>
          <MediaSelector
            value={imageUrls[i] || ''}
            onChange={(url) => handleImageFieldChange(i, url)}
            fieldName={`property_image_${i + 1}`}
          />
        </div>
      );
    }
    
    return selectors;
  };

  return <div className="space-y-4">{renderImageSelectors()}</div>;
};

export default PropertyImageSelectors;
