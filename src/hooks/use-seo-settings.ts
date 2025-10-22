
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SeoSettings {
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

export const defaultSeoSettings: SeoSettings = {
  siteTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  enableSitemap: true,
  enableRobotsTxt: true,
  enableStructuredData: false,
  canonicalUrl: "",
  googleAnalyticsId: "",
  googleVerification: ""
};

export const useSeoSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SeoSettings>(defaultSeoSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
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
        setSettings({
          ...defaultSeoSettings,
          ...(data.setting_value as any)
        });
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
        .upsert(
          {
            setting_key: "seo_settings",
            setting_value: settings as any
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

  return {
    settings,
    setSettings,
    loading,
    saving,
    saveSettings,
    fetchSettings
  };
};

// Hook for public pages to fetch SEO settings
export const usePublicSeoSettings = () => {
  const [settings, setSettings] = useState<SeoSettings>(defaultSeoSettings);
  const [loading, setLoading] = useState(true);

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
          setSettings({
            ...defaultSeoSettings,
            ...(data.setting_value as any)
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};

