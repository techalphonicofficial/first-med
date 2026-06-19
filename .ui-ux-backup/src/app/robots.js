export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/"
    },
    sitemap: "https://firstmed.local/sitemap.xml"
  };
}
