
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MediaSelector from "@/components/admin/media/MediaSelector";

const WebsiteSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Real Estate Website",
    contactEmail: "contact@example.com",
    contactPhone: "+1 234 567 8901",
    address: "123 Main St, City, Country",
    footerText: "© 2024 Real Estate Company. All rights reserved.",
    logoUrl: "",
    faviconUrl: "",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("website_settings")
          .select("*")
          .eq("setting_key", "general_settings")
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching website settings:", error);
          return;
        }

        if (data && data.setting_value) {
          setSettings(data.setting_value);
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
            setting_key: "general_settings",
            setting_value: settings
          },
          { onConflict: "setting_key" }
        );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save settings",
          variant: "destructive",
        });
        console.error("Error saving settings:", error);
      } else {
        toast({
          title: "Success",
          description: "Website settings saved successfully",
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
          <CardTitle>General Website Settings</CardTitle>
          <CardDescription>Configure basic information about your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Website Name</Label>
              <Input
                id="site-name"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="footer-text">Footer Text</Label>
            <Input
              id="footer-text"
              value={settings.footerText}
              onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Logo</Label>
              <MediaSelector
                value={settings.logoUrl}
                onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                fieldName="logo-image"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Favicon</Label>
              <MediaSelector
                value={settings.faviconUrl}
                onChange={(url) => setSettings({ ...settings, faviconUrl: url })}
                fieldName="favicon-image"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Social Media Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.socialLinks.facebook}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialLinks: { 
                      ...settings.socialLinks, 
                      facebook: e.target.value 
                    } 
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={settings.socialLinks.twitter}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialLinks: { 
                      ...settings.socialLinks, 
                      twitter: e.target.value 
                    } 
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialLinks: { 
                      ...settings.socialLinks, 
                      instagram: e.target.value 
                    } 
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialLinks: { 
                      ...settings.socialLinks, 
                      linkedin: e.target.value 
                    } 
                  })}
                />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSaveSettings} 
            disabled={saving}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save General Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteSettings;
