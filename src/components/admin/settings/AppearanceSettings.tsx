import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AppearanceSettings {
  theme: string;
  colorScheme: string;
  fontSize: number;
  enableAnimations: boolean;
  borderRadius: number;
  cardStyle: string;
  showShadows: boolean;
  menuStyle: string;
}

const defaultSettings: AppearanceSettings = {
  theme: "light",
  colorScheme: "blue",
  fontSize: 16,
  enableAnimations: true,
  borderRadius: 8,
  cardStyle: "flat",
  showShadows: true,
  menuStyle: "sidebar"
};

const AppearanceSettingsComponent = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
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
          setSettings(data.setting_value as AppearanceSettings);
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
            setting_key: "appearance_settings",
            setting_value: settings
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
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize how your website looks and feels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme-select">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => setSettings({ ...settings, theme: value })}
              >
                <SelectTrigger id="theme-select">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color-scheme-select">Color Scheme</Label>
              <Select
                value={settings.colorScheme}
                onValueChange={(value) => setSettings({ ...settings, colorScheme: value })}
              >
                <SelectTrigger id="color-scheme-select">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size-slider">Font Size: {settings.fontSize}px</Label>
            </div>
            <Slider
              id="font-size-slider"
              min={12}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={(value) => setSettings({ ...settings, fontSize: value[0] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="border-radius-slider">Border Radius: {settings.borderRadius}px</Label>
            </div>
            <Slider
              id="border-radius-slider"
              min={0}
              max={20}
              step={1}
              value={[settings.borderRadius]}
              onValueChange={(value) => setSettings({ ...settings, borderRadius: value[0] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Square</span>
              <span>Rounded</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="card-style-select">Card Style</Label>
              <Select
                value={settings.cardStyle}
                onValueChange={(value) => setSettings({ ...settings, cardStyle: value })}
              >
                <SelectTrigger id="card-style-select">
                  <SelectValue placeholder="Select card style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="raised">Raised</SelectItem>
                  <SelectItem value="bordered">Bordered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="menu-style-select">Menu Style</Label>
              <Select
                value={settings.menuStyle}
                onValueChange={(value) => setSettings({ ...settings, menuStyle: value })}
              >
                <SelectTrigger id="menu-style-select">
                  <SelectValue placeholder="Select menu style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="topbar">Top Bar</SelectItem>
                  <SelectItem value="hamburger">Hamburger</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="animations-switch" className="text-base">Enable Animations</Label>
                <p className="text-sm text-muted-foreground">Use motion effects throughout the site</p>
              </div>
              <Switch
                id="animations-switch"
                checked={settings.enableAnimations}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAnimations: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shadows-switch" className="text-base">Show Shadows</Label>
                <p className="text-sm text-muted-foreground">Add depth to UI elements</p>
              </div>
              <Switch
                id="shadows-switch"
                checked={settings.showShadows}
                onCheckedChange={(checked) => setSettings({ ...settings, showShadows: checked })}
              />
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSaveSettings} 
            disabled={saving}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Appearance Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettingsComponent;
