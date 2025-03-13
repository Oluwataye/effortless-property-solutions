
import React from "react";
import { BasicSeoSection } from "./sections/BasicSeoSection";
import { OpenGraphSection } from "./sections/OpenGraphSection";
import { TechnicalSeoSection } from "./sections/TechnicalSeoSection";
import { useSeoSettings } from "@/hooks/use-seo-settings";
import SettingsLayout from "./SettingsLayout";

const SeoSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useSeoSettings();

  return (
    <SettingsLayout
      title="SEO Settings"
      description="Optimize your website for search engines"
      loading={loading}
      saving={saving}
      saveSettings={saveSettings}
      saveButtonText="Save SEO Settings"
    >
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
    </SettingsLayout>
  );
};

export default SeoSettingsComponent;
