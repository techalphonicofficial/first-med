import { CatalogClient } from "@/components/products/CatalogClient";

export const metadata = { title: "Products" };

export default function ProductsPage({ searchParams }) {
  return <CatalogClient initialCategory={searchParams?.category || "All"} initialType={searchParams?.type || "All"} initialQuery={searchParams?.query || ""} />;
}
