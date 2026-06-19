export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/products/", "/search/", "/about/", "/contact/", "/faq/", "/blog/", "/privacy-policy/", "/refund-policy/", "/terms-and-conditions/"],
      disallow: ["/account/", "/checkout/", "/vendor/", "/delivery/"]
    },
    sitemap: "https://firstmed.local/sitemap.xml"
  };
}
