import { Helmet } from "react-helmet-async";

interface SEOMetaTagsProps {
  // Required
  title: string;
  description: string;
  canonical: string;
  
  // Open Graph
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  ogImageAlt?: string;
  
  // Article specific
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  
  // Twitter
  twitterCard?: "summary" | "summary_large_image" | "app";
  twitterSite?: string;
  twitterCreator?: string;
  
  // Additional
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string[];
  
  // Geo
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: { lat: number; lng: number };
  
  // Language
  lang?: string;
  alternateLanguages?: Array<{ lang: string; href: string }>;
  
  // Reading
  readingTime?: number;
  wordCount?: number;
}

const SEOMetaTags = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "https://indeedflex.com/og-image.png",
  ogImageAlt,
  publishedTime,
  modifiedTime,
  author = "Indeed Flex",
  section,
  tags = [],
  twitterCard = "summary_large_image",
  twitterSite = "@indeedflex",
  twitterCreator,
  noindex = false,
  nofollow = false,
  keywords = [],
  geoRegion,
  geoPlacename,
  geoPosition,
  lang = "en",
  alternateLanguages = [],
  readingTime,
  wordCount
}: SEOMetaTagsProps) => {
  const fullTitle = title.includes("Indeed Flex") ? title : `${title} | Indeed Flex`;
  const siteName = "Indeed Flex Career Hub";
  
  // Build robots directive
  const robotsDirective = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
    "max-snippet:-1",
    "max-image-preview:large",
    "max-video-preview:-1"
  ].join(", ");

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <meta name="bingbot" content={robotsDirective} />
      
      {/* Keywords (still used by some search engines) */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      
      {/* Author & Publisher */}
      <meta name="author" content={author} />
      <meta name="publisher" content="Indeed Flex" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} Indeed Flex`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific OG tags */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {ogType === "article" && tags.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
      
      {/* Geo Tags */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
      {geoPosition && (
        <meta name="geo.position" content={`${geoPosition.lat};${geoPosition.lng}`} />
      )}
      {geoPosition && (
        <meta name="ICBM" content={`${geoPosition.lat}, ${geoPosition.lng}`} />
      )}
      
      {/* Language Alternates */}
      {alternateLanguages.map((alt, i) => (
        <link key={i} rel="alternate" hrefLang={alt.lang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      
      {/* Reading Metadata */}
      {readingTime && (
        <meta name="twitter:label1" content="Reading time" />
      )}
      {readingTime && (
        <meta name="twitter:data1" content={`${readingTime} min read`} />
      )}
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Indeed Flex" />
      
      {/* DNS Prefetch & Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEOMetaTags;

/**
 * Helper function to calculate reading time
 */
export const calculateReadingTime = (text: string, wordsPerMinute = 200): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Helper function to count words
 */
export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).length;
};

/**
 * Helper function to generate keywords from content
 */
export const generateKeywords = (
  primary: string[],
  location?: string,
  role?: string,
  industry?: string
): string[] => {
  const keywords = [...primary];
  
  if (location) {
    keywords.push(
      `jobs in ${location}`,
      `${location} jobs`,
      `work in ${location}`,
      `flexible work ${location}`
    );
  }
  
  if (role) {
    keywords.push(
      `${role} jobs`,
      `${role} salary`,
      `become a ${role}`,
      `${role} career`
    );
  }
  
  if (industry) {
    keywords.push(
      `${industry} jobs`,
      `${industry} careers`,
      `work in ${industry}`
    );
  }
  
  return [...new Set(keywords)]; // Remove duplicates
};
