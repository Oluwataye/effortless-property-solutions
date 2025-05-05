
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WebsiteSettings } from "@/types/settings";

interface BasicInfoSectionProps {
  settings: WebsiteSettings;
  onChange: React.Dispatch<React.SetStateAction<WebsiteSettings>>;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="site-name">Website Name</Label>
        <Input
          id="site-name"
          value={settings.siteName}
          onChange={(e) => onChange(prev => ({ ...prev, siteName: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="site-description">Website Description</Label>
        <Input
          id="site-description"
          value={settings.siteDescription}
          onChange={(e) => onChange(prev => ({ ...prev, siteDescription: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact-email">Contact Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={settings.contactEmail}
          onChange={(e) => onChange(prev => ({ ...prev, contactEmail: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact-phone">Contact Phone</Label>
        <Input
          id="contact-phone"
          value={settings.phoneNumber}
          onChange={(e) => onChange(prev => ({ ...prev, phoneNumber: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={settings.address}
          onChange={(e) => onChange(prev => ({ ...prev, address: e.target.value }))}
        />
      </div>
    </div>
  );
};
