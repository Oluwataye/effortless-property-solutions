
import React from "react";
import { ThemeSection } from "./sections/ThemeSection";
import { FontSection } from "./sections/FontSection";
import { BorderSection } from "./sections/BorderSection";
import { StyleSection } from "./sections/StyleSection";
import { EffectsSection } from "./sections/EffectsSection";
import { useAppearanceSettings } from "@/hooks/use-appearance-settings";
import SettingsLayout from "./SettingsLayout";

const AppearanceSettingsComponent = () => {
  const { settings, setSettings, loading, saving, saveSettings } = useAppearanceSettings();

  return (
    <SettingsLayout
      title="Appearance Settings"
      description="Customize how your website looks and feels"
      loading={loading}
      saving={saving}
      saveSettings={saveSettings}
      saveButtonText="Save Appearance Settings"
    >
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
    </SettingsLayout>
  );
};

export default AppearanceSettingsComponent;
