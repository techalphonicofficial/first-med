export default function sitemap() {
  const routes = ["", "/products", "/search", "/cart", "/checkout", "/prescription", "/about", "/contact", "/faq"];
  return routes.map((route) => ({
    url: `https://firstmed.local${route}`,
    lastModified: new Date()
  }));
}
