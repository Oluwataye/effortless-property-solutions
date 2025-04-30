
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppearanceSettings } from "@/types/settings";

interface StyleSectionProps {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export const StyleSection: React.FC<StyleSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="card-style-select">Card Style</Label>
        <Select
          value={settings.cardStyle}
          onValueChange={(value: "flat" | "raised" | "bordered") => onChange({ ...settings, cardStyle: value })}
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
          onValueChange={(value: "sidebar" | "topbar" | "hamburger") => onChange({ ...settings, menuStyle: value })}
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
  );
};
