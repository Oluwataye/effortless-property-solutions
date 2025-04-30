
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AppearanceSettings } from "@/types/settings";

interface BorderSectionProps {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export const BorderSection: React.FC<BorderSectionProps> = ({
  settings,
  onChange
}) => {
  return (
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
        onValueChange={(value) => onChange({ ...settings, borderRadius: value[0] })}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Square</span>
        <span>Rounded</span>
      </div>
    </div>
  );
};
