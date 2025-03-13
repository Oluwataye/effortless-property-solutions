import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import MediaSelector from "@/components/admin/media/MediaSelector";

interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  enableSitemap: boolean;
  enableRobotsTxt: boolean;
  enableStructuredData: boolean;
  canonicalUrl: string;
  googleAnalyticsId: string;
  googleVerification: string;
}

const defaultSettings: SeoSettings = {
  siteTitle: "Real Estate Website | Find Your Dream Home",
  metaDescription: "Browse our selection of premium properties and find your dream home today. Professional real estate services.",
  metaKeywords: "real estate, property, homes for sale, luxury homes, apartments",
  ogTitle: "Real Estate Website",
  ogDescription: "Find your dream home with our real estate services",
  ogImage: "",
  enableSitemap: true,
  enableRobotsTxt: true,
  enableStructuredData: true,
  canonicalUrl: "https://example.com",
  googleAnalyticsId: "",
  googleVerification: ""
};

const SeoSettingsComponent = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SeoSettings>(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("website_settings")
          .select("*")
          .eq("setting_key", "seo_settings")
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching SEO settings:", error);
          return;
        }

        if (data && data.setting_value) {
          setSettings(data.setting_value as SeoSettings);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("website_settings")
        .upsert(
          {
            setting_key: "seo_settings",
            setting_value: settings
          },
          { onConflict: "setting_key" }
        );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save SEO settings",
          variant: "destructive",
        });
        console.error("Error saving settings:", error);
      } else {
        toast({
          title: "Success",
          description: "SEO settings saved successfully",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Optimize your website for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-title">Site Title</Label>
            <Input
              id="site-title"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
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
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
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
              onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated keywords relevant to your website
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Open Graph Settings</h3>
            <div className="space-y-2">
              <Label htmlFor="og-title">OG Title</Label>
              <Input
                id="og-title"
                value={settings.ogTitle}
                onChange={(e) => setSettings({ ...settings, ogTitle: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="og-description">OG Description</Label>
              <Textarea
                id="og-description"
                value={settings.ogDescription}
                onChange={(e) => setSettings({ ...settings, ogDescription: e.target.value })}
                className="resize-none h-20"
              />
            </div>
            
            <div className="space-y-2">
              <Label>OG Image</Label>
              <MediaSelector
                value={settings.ogImage}
                onChange={(url) => setSettings({ ...settings, ogImage: url })}
                fieldName="og-image"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Image that appears when your website is shared on social media (recommended: 1200x630px)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="canonical-url">Canonical URL</Label>
            <Input
              id="canonical-url"
              value={settings.canonicalUrl}
              onChange={(e) => setSettings({ ...settings, canonicalUrl: e.target.value })}
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
                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="google-verification">Google Verification</Label>
              <Input
                id="google-verification"
                value={settings.googleVerification}
                onChange={(e) => setSettings({ ...settings, googleVerification: e.target.value })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, enableSitemap: checked })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, enableRobotsTxt: checked })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, enableStructuredData: checked })}
              />
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSaveSettings} 
            disabled={saving}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save SEO Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoSettingsComponent;
