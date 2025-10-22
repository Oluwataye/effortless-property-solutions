import { useEffect } from 'react';
import { usePublicSeoSettings } from '@/hooks/use-seo-settings';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const SEOHead = ({ 
  title,
  description,
  image,
  url = window.location.href,
  type = 'website',
  keywords
}: SEOHeadProps) => {
  const { settings, loading } = usePublicSeoSettings();

  useEffect(() => {
    if (loading) return;

    // Use provided values or fall back to settings
    const finalTitle = title || settings.siteTitle || 'Amovate Solutions Limited - Professional Property Management';
    const finalDescription = description || settings.metaDescription || 'Leading property management services in Ghana. We provide comprehensive real estate solutions including property development, management, and consulting services.';
    const finalImage = image || settings.ogImage || '/og-image.png';
    const finalKeywords = keywords || settings.metaKeywords || 'property management, real estate, Ghana, property development, consulting';
    
    // Update document title
    document.title = finalTitle;

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
    updateOrCreateMeta('description', finalDescription);
    updateOrCreateMeta('keywords', finalKeywords);
    updateOrCreateMeta('author', 'Amovate Solutions Limited');
    updateOrCreateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0');
    
    // Canonical URL
    if (settings.canonicalUrl || url) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', settings.canonicalUrl || url);
    }

    // Open Graph tags
    const ogTitle = settings.ogTitle || finalTitle;
    const ogDescription = settings.ogDescription || finalDescription;
    
    updateOrCreateMeta('og:title', ogTitle, true);
    updateOrCreateMeta('og:description', ogDescription, true);
    updateOrCreateMeta('og:image', finalImage, true);
    updateOrCreateMeta('og:url', url, true);
    updateOrCreateMeta('og:type', type, true);
    updateOrCreateMeta('og:site_name', settings.siteTitle || 'Amovate Solutions Limited', true);
    updateOrCreateMeta('og:locale', 'en_US', true);

    // Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', ogTitle);
    updateOrCreateMeta('twitter:description', ogDescription);
    updateOrCreateMeta('twitter:image', finalImage);
    
    // Google verification
    if (settings.googleVerification) {
      updateOrCreateMeta('google-site-verification', settings.googleVerification);
    }

    // Structured data for local business
    if (settings.enableStructuredData) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": settings.siteTitle || "Amovate Solutions Limited",
        "description": finalDescription,
        "url": settings.canonicalUrl || url,
        "logo": finalImage,
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
    }

    // Google Analytics
    if (settings.googleAnalyticsId) {
      // Check if GA script already exists
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.googleAnalyticsId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }

  }, [title, description, image, url, type, keywords, settings, loading]);

  return null;
};

export default SEOHead;