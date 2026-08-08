import { useEffect } from 'react';

export const usePageMeta = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | Methynix Connect` : 'Methynix Connect';

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description || 'Discover events and connect with people around you using geolocation technology.');
    }

    // Update keywords
    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywords);
      }
    }

    // Update canonical
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title || 'Methynix Connect');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || 'Discover events and connect with people around you.');

  }, [title, description, keywords, canonical]);
};

export default usePageMeta;
