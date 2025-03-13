
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WebsiteSettings } from "@/hooks/use-website-settings";

interface FooterSectionProps {
  settings: WebsiteSettings;
  onChange: (settings: WebsiteSettings) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  settings,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="footer-text">Footer Text</Label>
      <Input
        id="footer-text"
        value={settings.footerText}
        onChange={(e) => onChange({ ...settings, footerText: e.target.value })}
      />
    </div>
  );
};
