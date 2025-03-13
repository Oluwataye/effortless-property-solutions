
import React from "react";
import { useWebsiteSettings } from "@/hooks/use-website-settings";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { FooterSection } from "./sections/FooterSection";
import { LogoSection } from "./sections/LogoSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";
import SettingsLayout from "./SettingsLayout";

const WebsiteSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useWebsiteSettings();

  return (
    <SettingsLayout
      title="General Website Settings"
      description="Configure basic information about your website"
      loading={loading}
      saving={saving}
      saveSettings={saveSettings}
      saveButtonText="Save General Settings"
    >
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
    </SettingsLayout>
  );
};

export default WebsiteSettingsComponent;
