
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppearanceSettings } from "@/hooks/use-appearance-settings";

interface ThemeSectionProps {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="theme-select">Theme</Label>
        <Select
          value={settings.theme}
          onValueChange={(value) => onChange({ ...settings, theme: value })}
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
          onValueChange={(value) => onChange({ ...settings, colorScheme: value })}
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
  );
};
