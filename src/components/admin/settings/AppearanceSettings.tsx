
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ThemeSection } from "./sections/ThemeSection";
import { FontSection } from "./sections/FontSection";
import { BorderSection } from "./sections/BorderSection";
import { StyleSection } from "./sections/StyleSection";
import { EffectsSection } from "./sections/EffectsSection";
import { useAppearanceSettings } from "@/hooks/use-appearance-settings";

const AppearanceSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useAppearanceSettings();

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
          <ThemeSection 
            settings={settings} 
            onChange={setSettings} 
          />

          <FontSection 
            settings={settings} 
            onChange={setSettings} 
          />

          <BorderSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <StyleSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <EffectsSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <Button 
            className="w-full" 
            onClick={saveSettings} 
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
