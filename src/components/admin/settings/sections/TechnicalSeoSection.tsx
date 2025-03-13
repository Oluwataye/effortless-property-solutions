
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SeoSettings } from "@/hooks/use-seo-settings";

interface TechnicalSeoSectionProps {
  settings: SeoSettings;
  onChange: (settings: SeoSettings) => void;
}

export const TechnicalSeoSection: React.FC<TechnicalSeoSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="canonical-url">Canonical URL</Label>
        <Input
          id="canonical-url"
          value={settings.canonicalUrl}
          onChange={(e) => onChange({ ...settings, canonicalUrl: e.target.value })}
        />
        <p className="text-xs text-muted-foreground mt-1">
          The preferred URL for your website (including https://)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="google-analytics">Google Analytics ID</Label>
          <Input
            id="google-analytics"
            value={settings.googleAnalyticsId}
            onChange={(e) => onChange({ ...settings, googleAnalyticsId: e.target.value })}
            placeholder="G-XXXXXXXXXX"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="google-verification">Google Verification</Label>
          <Input
            id="google-verification"
            value={settings.googleVerification}
            onChange={(e) => onChange({ ...settings, googleVerification: e.target.value })}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sitemap-switch" className="text-base">Generate Sitemap</Label>
            <p className="text-sm text-muted-foreground">Create an XML sitemap for search engines</p>
          </div>
          <Switch
            id="sitemap-switch"
            checked={settings.enableSitemap}
            onCheckedChange={(checked) => onChange({ ...settings, enableSitemap: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="robots-switch" className="text-base">Enable robots.txt</Label>
            <p className="text-sm text-muted-foreground">Generate a robots.txt file</p>
          </div>
          <Switch
            id="robots-switch"
            checked={settings.enableRobotsTxt}
            onCheckedChange={(checked) => onChange({ ...settings, enableRobotsTxt: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="structured-data-switch" className="text-base">Enable Structured Data</Label>
            <p className="text-sm text-muted-foreground">Add JSON-LD structured data to enhance search results</p>
          </div>
          <Switch
            id="structured-data-switch"
            checked={settings.enableStructuredData}
            onCheckedChange={(checked) => onChange({ ...settings, enableStructuredData: checked })}
          />
        </div>
      </div>
    </div>
  );
};
