export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
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

// Main navigation items
export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
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
          },
          {
            label: "Real Estate Management",
            href: "/services/real-estate-management",
            description: "Professional property management services",
          },
          {
            label: "Property Buying",
            href: "/services/property-buying",
            description: "Expert guidance for property acquisition",
          },
          {
            label: "Property Development",
            href: "/services/property-development",
            description: "End-to-end development solutions",
          },
          {
            label: "Property Selling",
            href: "/services/property-selling",
            description: "Maximize your property value",
          },
        ],
      },
      {
        title: "INDUSTRIES",
        links: [
          {
            label: "Commercial",
            href: "/industries/commercial",
            description: "Office and retail spaces",
          },
          {
            label: "Residential",
            href: "/industries/residential",
            description: "Housing and apartments",
          },
          {
            label: "Industrial",
            href: "/industries/industrial",
            description: "Warehouses and factories",
          },
          {
            label: "Healthcare",
            href: "/industries/healthcare",
            description: "Medical facilities",
          },
        ],
      },
      {
        title: "RESOURCES",
        links: [
          {
            label: "Case Studies",
            href: "/resources/case-studies",
            description: "Success stories",
          },
          {
            label: "Blog",
            href: "/blog",
            description: "Industry insights",
          },
          {
            label: "News",
            href: "/resources/news",
            description: "Latest updates",
          },
          {
            label: "Portfolio",
            href: "/portfolio",
            description: "Our projects",
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
