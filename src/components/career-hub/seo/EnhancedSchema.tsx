import { useMemo } from "react";

interface Organization {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

interface JobPostingSchemaProps {
  title: string;
  description: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string[];
  hiringOrganization: Organization;
  jobLocation?: {
    city: string;
    state: string;
    stateCode: string;
    country: string;
  };
  baseSalary: {
    currency: string;
    minValue: number;
    maxValue: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  skills?: string[];
  qualifications?: string[];
  responsibilities?: string[];
  industry?: string;
  occupationalCategory?: string;
  directApply?: boolean;
}

interface OccupationSchemaProps {
  name: string;
  description: string;
  estimatedSalary: {
    currency: string;
    minValue: number;
    maxValue: number;
    median?: number;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  occupationLocation?: {
    type: "City" | "State" | "Country";
    name: string;
  };
  skills?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  educationRequirements?: string;
  experienceRequirements?: string;
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: Organization;
  mainEntityOfPage: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: number;
  };
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  tool?: string[];
  supply?: string[];
}

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  url?: string;
  telephone?: string;
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

interface AggregateRatingSchemaProps {
  itemReviewed: {
    type: string;
    name: string;
  };
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  ratingCount: number;
  reviewCount?: number;
}

// Default organization data
const defaultOrganization: Organization = {
  name: "Indeed Flex",
  url: "https://indeedflex.com",
  logo: "https://indeedflex.com/logo.png",
  sameAs: [
    "https://www.linkedin.com/company/indeed-flex",
    "https://twitter.com/indeedflex",
    "https://www.facebook.com/indeedflex"
  ]
};

/**
 * JobPosting Schema Component
 */
export const JobPostingSchema = ({
  title,
  description,
  datePosted = new Date().toISOString().split('T')[0],
  validThrough,
  employmentType = ["TEMPORARY", "PART_TIME", "FULL_TIME"],
  hiringOrganization = defaultOrganization,
  jobLocation,
  baseSalary,
  skills = [],
  qualifications = [],
  responsibilities = [],
  industry,
  occupationalCategory,
  directApply = true
}: JobPostingSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": title,
    "description": description,
    "datePosted": datePosted,
    "validThrough": validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    "employmentType": employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": hiringOrganization.name,
      "sameAs": hiringOrganization.url,
      "logo": hiringOrganization.logo
    },
    ...(jobLocation && {
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": jobLocation.city,
          "addressRegion": jobLocation.stateCode,
          "addressCountry": jobLocation.country
        }
      }
    }),
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": baseSalary.currency,
      "value": {
        "@type": "QuantitativeValue",
        "minValue": baseSalary.minValue,
        "maxValue": baseSalary.maxValue,
        "unitText": baseSalary.unitText
      }
    },
    ...(skills.length > 0 && { "skills": skills.join(", ") }),
    ...(qualifications.length > 0 && { "qualifications": qualifications.join(". ") }),
    ...(responsibilities.length > 0 && { "responsibilities": responsibilities.join(". ") }),
    ...(industry && { "industry": industry }),
    ...(occupationalCategory && { "occupationalCategory": occupationalCategory }),
    "directApply": directApply,
    "applicantLocationRequirements": jobLocation ? {
      "@type": "Country",
      "name": jobLocation.country === 'US' ? "United States" : "United Kingdom"
    } : undefined
  }), [title, description, datePosted, validThrough, employmentType, hiringOrganization, jobLocation, baseSalary, skills, qualifications, responsibilities, industry, occupationalCategory, directApply]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Occupation Schema Component
 */
export const OccupationSchema = ({
  name,
  description,
  estimatedSalary,
  occupationLocation,
  skills = [],
  responsibilities = [],
  qualifications = [],
  educationRequirements,
  experienceRequirements
}: OccupationSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Occupation",
    "name": name,
    "description": description,
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "currency": estimatedSalary.currency,
      "percentile25": estimatedSalary.minValue,
      "median": estimatedSalary.median || Math.round((estimatedSalary.minValue + estimatedSalary.maxValue) / 2),
      "percentile75": estimatedSalary.maxValue,
      "unitText": estimatedSalary.unitText
    },
    ...(occupationLocation && {
      "occupationLocation": {
        "@type": occupationLocation.type,
        "name": occupationLocation.name
      }
    }),
    ...(skills.length > 0 && { "skills": skills.join(", ") }),
    ...(responsibilities.length > 0 && { "responsibilities": responsibilities.join(". ") }),
    ...(qualifications.length > 0 && { "qualifications": qualifications.join(". ") }),
    ...(educationRequirements && { "educationRequirements": educationRequirements }),
    ...(experienceRequirements && { "experienceRequirements": experienceRequirements })
  }), [name, description, estimatedSalary, occupationLocation, skills, responsibilities, qualifications, educationRequirements, experienceRequirements]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * FAQ Schema Component
 */
export const FAQSchema = ({ questions }: FAQSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }), [questions]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Article Schema Component
 */
export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher = defaultOrganization,
  mainEntityOfPage,
  wordCount,
  articleSection,
  keywords = []
}: ArticleSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    ...(image && { "image": image }),
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author.name,
      ...(author.url && { "url": author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": publisher.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": mainEntityOfPage
    },
    ...(wordCount && { "wordCount": wordCount }),
    ...(articleSection && { "articleSection": articleSection }),
    ...(keywords.length > 0 && { "keywords": keywords.join(", ") })
  }), [headline, description, image, datePublished, dateModified, author, publisher, mainEntityOfPage, wordCount, articleSection, keywords]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * HowTo Schema Component
 */
export const HowToSchema = ({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  tool = [],
  supply = []
}: HowToSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value
      }
    }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url })
    })),
    ...(tool.length > 0 && {
      "tool": tool.map(t => ({
        "@type": "HowToTool",
        "name": t
      }))
    }),
    ...(supply.length > 0 && {
      "supply": supply.map(s => ({
        "@type": "HowToSupply",
        "name": s
      }))
    })
  }), [name, description, totalTime, estimatedCost, steps, tool, supply]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * LocalBusiness Schema Component
 */
export const LocalBusinessSchema = ({
  name,
  description,
  address,
  geo,
  url,
  telephone,
  openingHours,
  priceRange,
  image,
  aggregateRating
}: LocalBusinessSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      ...(address.streetAddress && { "streetAddress": address.streetAddress }),
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      ...(address.postalCode && { "postalCode": address.postalCode }),
      "addressCountry": address.addressCountry
    },
    ...(geo && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": geo.latitude,
        "longitude": geo.longitude
      }
    }),
    ...(url && { "url": url }),
    ...(telephone && { "telephone": telephone }),
    ...(openingHours && { "openingHoursSpecification": openingHours }),
    ...(priceRange && { "priceRange": priceRange }),
    ...(image && { "image": image }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      }
    })
  }), [name, description, address, geo, url, telephone, openingHours, priceRange, image, aggregateRating]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Breadcrumb Schema Component
 */
export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": item.url })
    }))
  }), [items]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * AggregateRating Schema Component
 */
export const AggregateRatingSchema = ({
  itemReviewed,
  ratingValue,
  bestRating = 5,
  worstRating = 1,
  ratingCount,
  reviewCount
}: AggregateRatingSchemaProps) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": itemReviewed.type,
      "name": itemReviewed.name
    },
    "ratingValue": ratingValue,
    "bestRating": bestRating,
    "worstRating": worstRating,
    "ratingCount": ratingCount,
    ...(reviewCount && { "reviewCount": reviewCount })
  }), [itemReviewed, ratingValue, bestRating, worstRating, ratingCount, reviewCount]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * WebPage Schema Component
 */
export const WebPageSchema = ({
  name,
  description,
  url,
  datePublished,
  dateModified,
  breadcrumb
}: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: Array<{ name: string; url?: string }>;
}) => {
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
    "isPartOf": {
      "@type": "WebSite",
      "name": "Indeed Flex Career Hub",
      "url": "https://indeedflex.com"
    },
    ...(breadcrumb && {
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          ...(item.url && { "item": item.url })
        }))
      }
    })
  }), [name, description, url, datePublished, dateModified, breadcrumb]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default {
  JobPostingSchema,
  OccupationSchema,
  FAQSchema,
  ArticleSchema,
  HowToSchema,
  LocalBusinessSchema,
  BreadcrumbSchema,
  AggregateRatingSchema,
  WebPageSchema
};
