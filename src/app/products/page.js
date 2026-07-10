import { CatalogClient } from "@/components/products/CatalogClient";

export const metadata = { title: "Products" };

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  return <CatalogClient initialCategory={resolvedParams?.category || "All"} initialType={resolvedParams?.type || "All"} initialQuery={resolvedParams?.query || ""} />;
}
