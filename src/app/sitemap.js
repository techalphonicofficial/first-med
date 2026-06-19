export default function sitemap() {
  const routes = [
    "",
    "/products",
    "/search",
    "/prescription",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/privacy-policy",
    "/refund-policy",
    "/terms-and-conditions"
  ];
  return routes.map((route) => ({
    url: `https://firstmed.local${route}`,
    lastModified: new Date()
  }));
}
