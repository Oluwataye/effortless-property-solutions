
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyDetailsFormProps {
  formData: {
    title: string;
    description: string;
    price: string;
    location: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    category: string;
    status: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

const PropertyDetailsForm = ({ formData, onFormDataChange }: PropertyDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Property Title *</label>
        <Input
          placeholder="e.g., Modern 3BR Apartment in Downtown"
          value={formData.title}
          onChange={(e) => onFormDataChange("title", e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Description *</label>
        <Textarea
          placeholder="Describe the property features, amenities, and highlights..."
          value={formData.description}
          onChange={(e) => onFormDataChange("description", e.target.value)}
          required
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Price ($) *</label>
          <Input
            type="number"
            placeholder="250000"
            value={formData.price}
            onChange={(e) => onFormDataChange("price", e.target.value)}
            required
            min="0"
            step="1000"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Location *</label>
          <Input
            placeholder="e.g., 123 Main St, City, State"
            value={formData.location}
            onChange={(e) => onFormDataChange("location", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Bedrooms *</label>
          <Input
            type="number"
            placeholder="3"
            value={formData.bedrooms}
            onChange={(e) => onFormDataChange("bedrooms", e.target.value)}
            required
            min="0"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Bathrooms *</label>
          <Input
            type="number"
            placeholder="2"
            value={formData.bathrooms}
            onChange={(e) => onFormDataChange("bathrooms", e.target.value)}
            required
            min="0"
            step="0.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Area (sq ft) *</label>
          <Input
            type="number"
            placeholder="1500"
            value={formData.area}
            onChange={(e) => onFormDataChange("area", e.target.value)}
            required
            min="0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category *</label>
          <Select
            value={formData.category}
            onValueChange={(value) => onFormDataChange("category", value)}
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
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Status *</label>
          <Select
            value={formData.status}
            onValueChange={(value) => onFormDataChange("status", value)}
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
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
