
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AppearanceSettings } from "@/hooks/use-appearance-settings";

interface FontSectionProps {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export const FontSection: React.FC<FontSectionProps> = ({
  settings,
  onChange
}) => {
  return (
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
        onValueChange={(value) => onChange({ ...settings, fontSize: value[0] })}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Small</span>
        <span>Large</span>
      </div>
    </div>
  );
};
