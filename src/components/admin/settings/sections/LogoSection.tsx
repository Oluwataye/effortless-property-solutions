
import React from "react";
import { Label } from "@/components/ui/label";
import MediaSelector from "@/components/admin/media/MediaSelector";
import { WebsiteSettings } from "@/hooks/use-website-settings";

interface LogoSectionProps {
  settings: WebsiteSettings;
  onChange: (settings: WebsiteSettings) => void;
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
          value={settings.logoUrl}
          onChange={(url) => onChange({ ...settings, logoUrl: url })}
          fieldName="logo-image"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Favicon</Label>
        <MediaSelector
          value={settings.faviconUrl}
          onChange={(url) => onChange({ ...settings, faviconUrl: url })}
          fieldName="favicon-image"
        />
      </div>
    </div>
  );
};
