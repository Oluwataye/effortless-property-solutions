
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Footer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="footer-text">Footer Text</Label>
          <Textarea
            id="footer-text"
            value={settings.footerText}
            onChange={(e) => onChange({ ...settings, footerText: e.target.value })}
            placeholder="© 2024 Your Company. All rights reserved."
            rows={3}
          />
          <p className="text-sm text-muted-foreground">
            Copyright notice and additional information shown in the website footer
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
