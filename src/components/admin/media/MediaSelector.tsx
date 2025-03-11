
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";

interface MediaSelectorProps {
  value: string;
  onChange: (url: string) => void;
  fieldName: string;
}

const MediaSelector = ({ value, onChange, fieldName }: MediaSelectorProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(value);

  useEffect(() => {
    // Check for returned selection from media library
    const storedValue = localStorage.getItem(fieldName);
    if (storedValue) {
      setSelectedImage(storedValue);
      onChange(storedValue);
      localStorage.removeItem(fieldName);
    }
  }, [fieldName, onChange]);

  const handleOpenMediaLibrary = () => {
    const currentUrl = window.location.pathname;
    window.location.href = `/admin/media?select=true&field=${fieldName}&returnUrl=${encodeURIComponent(currentUrl)}`;
  };

  const handleClearImage = () => {
    setSelectedImage('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      {selectedImage ? (
        <div className="relative">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-h-48 object-contain border rounded-md" 
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center">
          <Image className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">No image selected</p>
        </div>
      )}
      <Button type="button" onClick={handleOpenMediaLibrary} variant="outline" className="w-full">
        {selectedImage ? 'Change Image' : 'Select Image from Media Library'}
      </Button>
    </div>
  );
};

export default MediaSelector;
