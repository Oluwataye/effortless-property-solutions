
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
    <>
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onFormDataChange("title", e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => onFormDataChange("description", e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => onFormDataChange("price", e.target.value)}
          required
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) => onFormDataChange("location", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={(e) => onFormDataChange("bedrooms", e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={(e) => onFormDataChange("bathrooms", e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Area (sq ft)"
          value={formData.area}
          onChange={(e) => onFormDataChange("area", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
    </>
  );
};

export default PropertyDetailsForm;
