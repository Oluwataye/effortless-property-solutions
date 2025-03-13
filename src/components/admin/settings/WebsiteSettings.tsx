
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/use-website-settings";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { FooterSection } from "./sections/FooterSection";
import { LogoSection } from "./sections/LogoSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";

const WebsiteSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useWebsiteSettings();

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
          <BasicInfoSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <FooterSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <LogoSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <SocialMediaSection 
            settings={settings} 
            onChange={setSettings} 
          />
          
          <Button 
            className="w-full" 
            onClick={saveSettings} 
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

export default WebsiteSettingsComponent;
