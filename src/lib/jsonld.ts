import type { BlogPostWithContent } from "@/lib/blog";
import type { ContentFile } from "@/lib/content";

const SITE = {
  name: "SZZYPack",
  url: "https://www.szzypack.com",
  logo: "https://www.szzypack.com/images/logo.png",
  description:
    "Factory-direct custom flexible packaging manufacturer: stand up pouches, flat bottom bags, roll film. ISO/BRC certified, MOQ from 500 pcs.",
  phone: "+86-755-1234-5678",
  email: "info@szzypack.com",
  address: {
    street: "No. 88, Longgang Industrial Zone",
    city: "Shenzhen",
    state: "Guangdong",
    postalCode: "518000",
    country: "CN",
  },
  sameAs: [
    "https://www.linkedin.com/company/szzypack",
    "https://www.facebook.com/szzypack",
    "https://www.instagram.com/szzypack",
  ],
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: BlogPostWithContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.data.title,
    description: post.data.description,
    author: {
      "@type": "Organization",
      name: post.data.author,
    },
    datePublished: post.data.date,
    dateModified: post.data.date,
    image: post.data.image
      ? `${SITE.url}${post.data.image}`
      : undefined,
    url: `${SITE.url}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };
}

interface ProductData {
  title: string;
  description: string;
  image?: string;
  category?: string;
}

export function productSchema(product: ContentFile<ProductData>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.data.title,
    description: product.data.description,
    image: product.data.image
      ? `${SITE.url}${product.data.image}`
      : undefined,
    category: product.data.category,
    url: `${SITE.url}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE.name,
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE.url}/products/${product.slug}`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
