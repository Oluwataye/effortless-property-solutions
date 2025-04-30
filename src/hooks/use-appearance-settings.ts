
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AppearanceSettings {
  theme: {
    mode: "light" | "dark" | "system";
    primaryColor: string;
    radius: "none" | "small" | "medium" | "large";
  };
  font: {
    family: string;
    headingFamily: string;
    baseSize: number;
  };
  border: {
    width: number;
    style: string;
    color: string;
  };
  style: {
    buttonStyle: "default" | "outline" | "ghost";
    cardShadow: "none" | "small" | "medium" | "large";
  };
  effects: {
    animations: boolean;
    transitions: boolean;
  };
}

export const defaultAppearanceSettings: AppearanceSettings = {
  theme: {
    mode: "system",
    primaryColor: "#0077FF",
    radius: "medium"
  },
  font: {
    family: "Inter, sans-serif",
    headingFamily: "Inter, sans-serif",
    baseSize: 16
  },
  border: {
    width: 1,
    style: "solid",
    color: "#e2e8f0"
  },
  style: {
    buttonStyle: "default",
    cardShadow: "medium"
  },
  effects: {
    animations: true,
    transitions: true
  }
};

export const useAppearanceSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AppearanceSettings>(defaultAppearanceSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("website_settings")
        .select("*")
        .eq("setting_key", "appearance_settings")
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching appearance settings:", error);
        return;
      }

      if (data && data.setting_value) {
        setSettings({
          ...defaultAppearanceSettings,
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
            setting_key: "appearance_settings",
            setting_value: settings as any
          },
          { onConflict: "setting_key" }
        );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save appearance settings",
          variant: "destructive",
        });
        console.error("Error saving settings:", error);
      } else {
        toast({
          title: "Success",
          description: "Appearance settings saved successfully",
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
