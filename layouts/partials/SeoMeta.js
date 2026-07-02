"use client";

import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import { usePathname } from "next/navigation";

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
  content = "",
  frontmatter = {}
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname() || "";

  // Auto-generate canonical URL if not explicitly provided
  const canonicalUrl = canonical || `${base_url}${pathname === "/" ? "" : pathname}`;

  const { date, lastUpdatedDate, author, categories, primaryKeyword, secondaryKeywords } = frontmatter;
  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;

  // 1. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base_url}/#organization`,
    "name": "Innvikta",
    "url": base_url,
    "logo": `${base_url}${config.site.logo}`,
    "image": `${base_url}${meta_image}`,
    "description": description || meta_description,
    "sameAs": [
      "https://www.linkedin.com/company/innvikta",
      "https://twitter.com/innvikta",
      "https://facebook.com/innvikta"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": config.contact_info.phone,
      "contactType": "customer service",
      "email": config.contact_info.email
    }
  };

  // 2. Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base_url}/#localbusiness`,
    "name": "Innvikta",
    "image": `${base_url}${meta_image}`,
    "url": base_url,
    "telephone": config.contact_info.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": config.contact_info.location.split(" Syracuse")[0] || "2118 Thornridge Cir.",
      "addressLocality": "Syracuse",
      "addressRegion": "Connecticut",
      "postalCode": "35624",
      "addressCountry": "US"
    }
  };

  // 3. Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base_url}/#website`,
    "name": "Innvikta",
    "url": base_url
  };

  // 4. Breadcrumb List Schema
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbElements = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": base_url
    }
  ];
  pathSegments.forEach((segment, index) => {
    const route = "/" + pathSegments.slice(0, index + 1).join("/");
    breadcrumbElements.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      "item": `${base_url}${route}`
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbElements
  };

  // 5. Product / SoftwareApplication Schema
  const isSolutionsPage = pathname.startsWith("/solutions");
  const productSchema = isSolutionsPage ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Innvikta ${title || "Security"}`,
    "operatingSystem": "All",
    "applicationCategory": "SecurityApplication",
    "description": description || meta_description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  // 6. BlogPosting Schema (E-E-A-T & Google Search schema optimization)
  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const blogPostingSchema = isBlogPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${base_url}${pathname}#blogposting`,
    "headline": title,
    "description": description || meta_description,
    "image": image ? (image.startsWith("http") ? image : `${base_url}${image}`) : `${base_url}${meta_image}`,
    "datePublished": date || new Date().toISOString(),
    "dateModified": lastUpdatedDate || date || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": author?.name || "Derick C.",
      "image": author?.avatar ? (author.avatar.startsWith("http") ? author.avatar : `${base_url}${author.avatar}`) : `${base_url}/images/author/derick.jpg`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Innvikta",
      "logo": {
        "@type": "ImageObject",
        "url": `${base_url}${config.site.logo}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${base_url}${pathname}`
    },
    "keywords": primaryKeyword ? [primaryKeyword, ...(secondaryKeywords || [])].join(", ") : undefined,
    "articleSection": categories ? categories.join(", ") : "Cybersecurity",
    "wordCount": wordCount,
    "inLanguage": "en-US"
  } : null;

  // 7. FAQPage Schema (AEO Voice/FAQ SEO validation)
  const faqSchema = (() => {
    if (!content) return null;
    const accordionRegex = /<Accordion\s+title="([^"]+)"[^>]*>([\s\S]*?)<\/Accordion>/g;
    const matches = [];
    let match;
    while ((match = accordionRegex.exec(content)) !== null) {
      matches.push({
        question: match[1],
        answer: match[2].trim().replace(/<[^>]*>/g, "")
      });
    }
    if (matches.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": matches.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  })();

  return (
    <>
      {/* title */}
      <title>
        {plainify(meta_title ? meta_title : title ? title : config.site.title)}
      </title>

      {/* canonical url */}
      <link rel="canonical" href={canonicalUrl} />

      {/* noindex robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      )}

      {/* meta-description */}
      <meta
        name="description"
        content={plainify(description ? description : meta_description)}
      />

      {/* author from config.json */}
      <meta name="author" content={author?.name || meta_author} />

      {/* og-title */}
      <meta
        property="og:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* og-description */}
      <meta
        property="og:description"
        content={plainify(description ? description : meta_description)}
      />
      <meta property="og:type" content={isBlogPost ? "article" : "website"} />
      <meta
        property="og:url"
        content={`${base_url}/${pathname.replace("/", "")}`}
      />

      {isBlogPost && (
        <>
          <meta property="article:published_time" content={date || new Date().toISOString()} />
          <meta property="article:modified_time" content={lastUpdatedDate || date || new Date().toISOString()} />
          <meta property="article:author" content={author?.name || "Derick C."} />
          {categories?.map((cat, idx) => (
            <meta key={idx} property="article:section" content={cat} />
          ))}
        </>
      )}

      {/* twitter-title */}
      <meta
        name="twitter:title"
        content={plainify(
          meta_title ? meta_title : title ? title : config.site.title
        )}
      />

      {/* twitter-description */}
      <meta
        name="twitter:description"
        content={plainify(description ? description : meta_description)}
      />

      {/* og-image */}
      <meta
        property="og:image"
        content={image ? (image.startsWith("http") ? image : `${base_url}${image}`) : `${base_url}${meta_image}`}
      />

      {/* twitter-image */}
      <meta
        name="twitter:image"
        content={image ? (image.startsWith("http") ? image : `${base_url}${image}`) : `${base_url}${meta_image}`}
      />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Structured Data Schema Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {pathname !== "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};

export default SeoMeta;
