
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AppearanceSettings {
  theme: string;
  colorScheme: string;
  fontSize: number;
  enableAnimations: boolean;
  borderRadius: number;
  cardStyle: string;
  showShadows: boolean;
  menuStyle: string;
}

export const defaultSettings: AppearanceSettings = {
  theme: "light",
  colorScheme: "blue",
  fontSize: 16,
  enableAnimations: true,
  borderRadius: 8,
  cardStyle: "flat",
  showShadows: true,
  menuStyle: "sidebar"
};

export const useAppearanceSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);

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
        setSettings(data.setting_value as unknown as AppearanceSettings);
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
