
export interface AppearanceSettings {
  // Visual styling
  borderRadius: number;
  fontSize: number;
  cardStyle: "flat" | "raised" | "bordered";
  menuStyle: "sidebar" | "topbar" | "hamburger";
  
  // Themes
  theme: string;
  colorScheme: string;
  
  // Effects
  enableAnimations: boolean;
  showShadows: boolean;
}

export interface ThemeSettings {
  mode: "light" | "dark" | "system";
  primaryColor: string;
  radius: "none" | "small" | "medium" | "large";
}

export interface WebsiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  footerText: string;
  logo: string;
  favicon: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

