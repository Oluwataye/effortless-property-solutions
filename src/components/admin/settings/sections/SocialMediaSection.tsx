
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WebsiteSettings } from "@/types/settings";

interface SocialMediaSectionProps {
  settings: WebsiteSettings;
  onChange: React.Dispatch<React.SetStateAction<WebsiteSettings>>;
}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  settings,
  onChange
}) => {
  const updateSocialLink = (platform: keyof WebsiteSettings['socialLinks'], value: string) => {
    onChange(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  return (
    <div className="space-y-2">
      <Label>Social Media Links</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            value={settings.socialLinks.facebook}
            onChange={(e) => updateSocialLink('facebook', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            value={settings.socialLinks.twitter}
            onChange={(e) => updateSocialLink('twitter', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={settings.socialLinks.instagram}
            onChange={(e) => updateSocialLink('instagram', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={settings.socialLinks.linkedin}
            onChange={(e) => updateSocialLink('linkedin', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube</Label>
          <Input
            id="youtube"
            value={settings.socialLinks.youtube}
            onChange={(e) => updateSocialLink('youtube', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
