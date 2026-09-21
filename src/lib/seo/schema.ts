import { COMPANY_LEGAL } from "@/lib/companyLegal";
import { MARKETING_PLANS } from "@/lib/pricingPlans";
import {
  CANONICAL_ORIGIN,
  COMPANY_PHONE_TEL,
  ORGANIZATION_ID,
  US_POSTAL_ADDRESS,
  WEBSITE_ID,
  absoluteUrl,
  canonicalUrl,
} from "@/lib/seo/site";

type JsonLd = Record<string, unknown>;

export function organizationSchema(origin = CANONICAL_ORIGIN): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Nexora",
    legalName: COMPANY_LEGAL.legalName,
    url: `${origin}/`,
    description:
      "Nexora builds hosted websites for local businesses. Customers preview a staged live site, then subscribe.",
    logo: {
      "@type": "ImageObject",
      url: `${origin}/nexora-logo.png`,
    },
    email: COMPANY_LEGAL.contactEmail,
    telephone: COMPANY_PHONE_TEL,
    address: US_POSTAL_ADDRESS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: COMPANY_LEGAL.contactEmail,
      telephone: COMPANY_PHONE_TEL,
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema(origin = CANONICAL_ORIGIN): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Nexora",
    url: `${origin}/`,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export function webPageSchema(opts: {
  path: string;
  title: string;
  description: string;
  origin?: string;
}): JsonLd {
  const origin = opts.origin ?? CANONICAL_ORIGIN;
  const url = canonicalUrl(opts.path, origin);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  origin = CANONICAL_ORIGIN,
): JsonLd | null {
  if (items.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path, origin),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  includeOffers?: boolean;
  origin?: string;
}): JsonLd {
  const origin = opts.origin ?? CANONICAL_ORIGIN;
  const schema: JsonLd = {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: canonicalUrl(opts.path, origin),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "US",
    serviceType: opts.name,
  };
  if (opts.includeOffers) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Nexora website subscriptions",
      itemListElement: MARKETING_PLANS.map(plan => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.tagline,
        url: canonicalUrl(`/start?plan=${plan.id}`, origin),
        price: plan.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: plan.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      })),
    };
  }
  return schema;
}

export function faqPageSchema(
  items: Array<{ question: string; answer: string }>,
  opts?: { path?: string; origin?: string },
): JsonLd | null {
  if (items.length === 0) return null;
  const origin = opts?.origin ?? CANONICAL_ORIGIN;
  const schema: JsonLd = {
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  if (opts?.path) {
    const url = canonicalUrl(opts.path, origin);
    schema["@id"] = `${url}#faq`;
    schema.url = url;
    schema.isPartOf = { "@id": WEBSITE_ID };
  }
  return schema;
}

export function blogPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  image: string;
  origin?: string;
}): JsonLd {
  const origin = opts.origin ?? CANONICAL_ORIGIN;
  const url = canonicalUrl(opts.path, origin);
  return {
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    mainEntityOfPage: url,
    image: absoluteUrl(opts.image, origin),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export function graph(nodes: Array<JsonLd | null | undefined>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is JsonLd => Boolean(node)),
  };
}
