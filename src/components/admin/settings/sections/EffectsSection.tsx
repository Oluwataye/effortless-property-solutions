
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AppearanceSettings } from "@/hooks/use-appearance-settings";

interface EffectsSectionProps {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export const EffectsSection: React.FC<EffectsSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="animations-switch" className="text-base">Enable Animations</Label>
          <p className="text-sm text-muted-foreground">Use motion effects throughout the site</p>
        </div>
        <Switch
          id="animations-switch"
          checked={settings.enableAnimations}
          onCheckedChange={(checked) => onChange({ ...settings, enableAnimations: checked })}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="shadows-switch" className="text-base">Show Shadows</Label>
          <p className="text-sm text-muted-foreground">Add depth to UI elements</p>
        </div>
        <Switch
          id="shadows-switch"
          checked={settings.showShadows}
          onCheckedChange={(checked) => onChange({ ...settings, showShadows: checked })}
        />
      </div>
    </div>
  );
};
