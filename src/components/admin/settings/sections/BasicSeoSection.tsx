
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SeoSettings } from "@/hooks/use-seo-settings";

interface BasicSeoSectionProps {
  settings: SeoSettings;
  onChange: (settings: SeoSettings) => void;
}

export const BasicSeoSection: React.FC<BasicSeoSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="site-title">Site Title</Label>
        <Input
          id="site-title"
          value={settings.siteTitle}
          onChange={(e) => onChange({ ...settings, siteTitle: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Appears in browser tabs and search results
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          value={settings.metaDescription}
          onChange={(e) => onChange({ ...settings, metaDescription: e.target.value })}
          className="resize-none h-20"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Brief description of your website that appears in search results (recommended: 150-160 characters)
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="meta-keywords">Meta Keywords</Label>
        <Input
          id="meta-keywords"
          value={settings.metaKeywords}
          onChange={(e) => onChange({ ...settings, metaKeywords: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Comma-separated keywords relevant to your website
        </p>
      </div>
    </div>
  );
};
