export const siteConfig = {
  name: "SZZYPack",
  tagline: "Your Trusted Flexible Packaging Partner",
  description:
    "Factory-direct custom flexible packaging manufacturer. ISO/BRC certified, MOQ 500, free samples in 3 days.",
  url: "https://www.szzypack.com",
  email: "info@szzypack.com",
  phone: "+86-755-1234-5678",
  whatsapp: "+8613800000000",

  social: {
    linkedin: "https://linkedin.com/company/szzypack",
    youtube: "https://youtube.com/@szzypack",
  },

  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Case Studies", href: "/cases" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },

  footer: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "Stand Up Pouches", href: "/products/stand-up-pouches" },
          { label: "Flat Bottom Bags", href: "/products/flat-bottom-bags" },
          { label: "Roll Film", href: "/products/roll-film" },
          { label: "Side Gusset Bags", href: "/products/side-gusset-bags" },
          { label: "Spout Pouches", href: "/products/spout-pouches" },
          { label: "All Products", href: "/products" },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Coffee", href: "/industries/coffee" },
          { label: "Pet Food", href: "/industries/pet-food" },
          { label: "Food & Snacks", href: "/industries/food-snacks" },
          { label: "Supplements", href: "/industries/supplements" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Factory Tour", href: "/about#factory" },
          { label: "Certifications", href: "/about#certifications" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "How It Works", href: "/how-it-works" },
          { label: "FAQ", href: "/faq" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
