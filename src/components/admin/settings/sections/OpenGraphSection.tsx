
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSelector from "@/components/admin/media/MediaSelector";
import { SeoSettings } from "@/hooks/use-seo-settings";

interface OpenGraphSectionProps {
  settings: SeoSettings;
  onChange: (settings: SeoSettings) => void;
}

export const OpenGraphSection: React.FC<OpenGraphSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Open Graph Settings</h3>
      <div className="space-y-2">
        <Label htmlFor="og-title">OG Title</Label>
        <Input
          id="og-title"
          value={settings.ogTitle}
          onChange={(e) => onChange({ ...settings, ogTitle: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="og-description">OG Description</Label>
        <Textarea
          id="og-description"
          value={settings.ogDescription}
          onChange={(e) => onChange({ ...settings, ogDescription: e.target.value })}
          className="resize-none h-20"
        />
      </div>
      
      <div className="space-y-2">
        <Label>OG Image</Label>
        <MediaSelector
          value={settings.ogImage}
          onChange={(url) => onChange({ ...settings, ogImage: url })}
          fieldName="og-image"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Image that appears when your website is shared on social media (recommended: 1200x630px)
        </p>
      </div>
    </div>
  );
};
