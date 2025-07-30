import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ 
  title = 'Amovate Solutions Limited - Professional Property Management',
  description = 'Leading property management services in Ghana. We provide comprehensive real estate solutions including property development, management, and consulting services.',
  image = '/og-image.png',
  url = window.location.href,
  type = 'website'
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateOrCreateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('keywords', 'property management, real estate, Ghana, property development, consulting');
    updateOrCreateMeta('author', 'Amovate Solutions Limited');
    updateOrCreateMeta('robots', 'index, follow');

    // Open Graph tags
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:image', image, true);
    updateOrCreateMeta('og:url', url, true);
    updateOrCreateMeta('og:type', type, true);
    updateOrCreateMeta('og:site_name', 'Amovate Solutions Limited', true);

    // Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', image);

    // Structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Amovate Solutions Limited",
      "description": description,
      "url": url,
      "logo": image,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Ghana"
      },
      "serviceArea": {
        "@type": "Country",
        "name": "Ghana"
      },
      "services": [
        "Property Management",
        "Real Estate Development",
        "Property Consulting",
        "Real Estate Investment"
      ]
    };

    // Update or create structured data script
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url, type]);

  return null;
};

export default SEOHead;