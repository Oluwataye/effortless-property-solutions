import { LucideIcon } from "lucide-react";

export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface NavigationColumn {
  title: string;
  links: NavigationLink[];
}

export interface NavigationItem {
  label: string;
  href?: string;
  hasMegaMenu?: boolean;
  columns?: NavigationColumn[];
}

import {
  Building2,
  Home,
  ShoppingCart,
  Hammer,
  TrendingUp,
  Building,
  HomeIcon,
  Factory,
  Hospital,
  FileText,
  Newspaper,
  BookOpen,
  Briefcase,
  Lightbulb,
  Users,
  Heart,
  History,
  MapPin,
} from "lucide-react";

// Main navigation items
export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    hasMegaMenu: true,
    columns: [
      {
        title: "CAREERS",
        links: [
          {
            label: "Work With Us",
            href: "/careers",
            description: "Join our team",
            icon: Briefcase,
          },
        ],
      },
      {
        title: "ABOUT US",
        links: [
          {
            label: "Sustainability",
            href: "/about/sustainability",
            description: "Our commitment to the environment",
            icon: Lightbulb,
          },
          {
            label: "Global Leadership",
            href: "/about/leadership",
            description: "Meet our leadership team",
            icon: Users,
          },
          {
            label: "Inclusive Impact",
            href: "/about/impact",
            description: "Diversity and inclusion",
            icon: Heart,
          },
          {
            label: "Our History",
            href: "/about/history",
            description: "Our journey and milestones",
            icon: History,
          },
        ],
      },
      {
        title: "OFFICE LOCATIONS",
        links: [
          {
            label: "Find Us",
            href: "/locations",
            description: "Our global offices",
            icon: MapPin,
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    hasMegaMenu: true,
    columns: [
      {
        title: "SERVICES",
        links: [
          {
            label: "Facility Management",
            href: "/services/facility-management",
            description: "Comprehensive facility management solutions",
            icon: Building2,
          },
          {
            label: "Real Estate Management",
            href: "/services/real-estate-management",
            description: "Professional property management services",
            icon: Home,
          },
          {
            label: "Property Buying",
            href: "/services/property-buying",
            description: "Expert guidance for property acquisition",
            icon: ShoppingCart,
          },
          {
            label: "Property Development",
            href: "/services/property-development",
            description: "End-to-end development solutions",
            icon: Hammer,
          },
          {
            label: "Property Selling",
            href: "/services/property-selling",
            description: "Maximize your property value",
            icon: TrendingUp,
          },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    hasMegaMenu: true,
    columns: [
      {
        title: "INDUSTRIES",
        links: [
          {
            label: "Commercial",
            href: "/industries/commercial",
            description: "Office and retail spaces",
            icon: Building,
          },
          {
            label: "Residential",
            href: "/industries/residential",
            description: "Housing and apartments",
            icon: HomeIcon,
          },
          {
            label: "Industrial",
            href: "/industries/industrial",
            description: "Warehouses and factories",
            icon: Factory,
          },
          {
            label: "Healthcare",
            href: "/industries/healthcare",
            description: "Medical facilities",
            icon: Hospital,
          },
        ],
      },
      {
        title: "RESOURCES",
        links: [
          {
            label: "Case Studies",
            href: "/resources",
            description: "Success stories",
            icon: FileText,
          },
        ],
      },
    ],
  },
  {
    label: "Projects",
    href: "/portfolio",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
