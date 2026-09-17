import { Helmet } from "react-helmet-async";
import { NEXORA_OG_IMAGE_PATH, getNexoraOgImageUrl } from "@/lib/brandAssets";
import {
  INDEX_ROBOTS,
  SITE_NAME,
  canonicalUrl,
  publicSiteOrigin,
} from "@/lib/seo/site";

export type SeoBreadcrumb = {
  name: string;
  path: string;
};

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  robots?: string;
  ogType?: "website" | "article";
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function asJsonLdPayload(jsonLd: PageSeoProps["jsonLd"]): string | null {
  if (!jsonLd) return null;
  return JSON.stringify(jsonLd);
}

const PageSeo = ({
  title,
  description,
  path,
  robots = INDEX_ROBOTS,
  ogType = "website",
  image,
  imageAlt,
  publishedTime,
  jsonLd,
}: PageSeoProps) => {
  const origin = publicSiteOrigin();
  const url = canonicalUrl(path, origin);
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${origin}${image.startsWith("/") ? image : `/${image}`}`
    : getNexoraOgImageUrl();
  const ld = asJsonLdPayload(jsonLd);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt ?? title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt ?? title} />

      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {ld ? <script type="application/ld+json">{ld}</script> : null}
    </Helmet>
  );
};

export default PageSeo;

export { NEXORA_OG_IMAGE_PATH };
