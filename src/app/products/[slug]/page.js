import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { products } from "@/data/catalog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return { title: product?.name || "Product", description: product?.description };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} similar={products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 7)} />;
}
