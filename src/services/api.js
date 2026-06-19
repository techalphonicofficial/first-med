import axios from "axios";
import { products, vendors, orders } from "@/data/catalog";

export const api = axios.create({ baseURL: "/api/mock" });

export async function fetchProducts({ query = "", category = "All", sort = "Popular" } = {}) {
  let items = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
  if (sort === "Price Low To High") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "Price High To Low") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "Highest Rated") items = [...items].sort((a, b) => b.rating - a.rating);
  return Promise.resolve(items);
}

export async function fetchProduct(slug) {
  return Promise.resolve(products.find((product) => product.slug === slug) || products[0]);
}

export async function fetchVendors() {
  return Promise.resolve(vendors);
}

export async function fetchOrders() {
  return Promise.resolve(orders);
}
