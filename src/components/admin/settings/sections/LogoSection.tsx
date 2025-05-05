
import React from "react";
import { Label } from "@/components/ui/label";
import MediaSelector from "@/components/admin/media/MediaSelector";
import { WebsiteSettings } from "@/types/settings";

interface LogoSectionProps {
  settings: WebsiteSettings;
  onChange: React.Dispatch<React.SetStateAction<WebsiteSettings>>;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Logo</Label>
        <MediaSelector
          value={settings.logo}
          onChange={(url) => onChange(prev => ({ ...prev, logo: url }))}
          fieldName="logo-image"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Favicon</Label>
        <MediaSelector
          value={settings.favicon}
          onChange={(url) => onChange(prev => ({ ...prev, favicon: url }))}
          fieldName="favicon-image"
        />
      </div>
    </div>
  );
};
