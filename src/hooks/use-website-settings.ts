
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface WebsiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  footerText: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export const defaultSettings: WebsiteSettings = {
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
};

export const useWebsiteSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
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
        setSettings(data.setting_value as WebsiteSettings);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("website_settings")
        .upsert({
          setting_key: "general_settings",
          setting_value: settings
        }, { onConflict: "setting_key" });

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

  return {
    settings,
    setSettings,
    loading,
    saving,
    saveSettings
  };
};
