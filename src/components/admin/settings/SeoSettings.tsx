
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BasicSeoSection } from "./sections/BasicSeoSection";
import { OpenGraphSection } from "./sections/OpenGraphSection";
import { TechnicalSeoSection } from "./sections/TechnicalSeoSection";
import { useSeoSettings } from "@/hooks/use-seo-settings";

const SeoSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useSeoSettings();

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
          <BasicSeoSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <OpenGraphSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <TechnicalSeoSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <Button 
            className="w-full" 
            onClick={saveSettings} 
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
