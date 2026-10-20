import { BASE, getList, fixProduct, fixCategory } from "./helpers";

export async function getProducts(category) {
  const url = category ? `${BASE}/products?category=${category}` : `${BASE}/products`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return getList(json).map(fixProduct);
}

export async function getProduct(slug) {
  const products = await getProducts();
  const found = products.find((p) => p.slug === slug || String(p.id) === slug);
  return found || null;
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) return [];
  const json = await res.json();
  return getList(json).map(fixCategory);
}

export async function getCategory(slug) {
  const res = await fetch(`${BASE}/categories/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  const item = json.data || json;
  if (!item || !item.nameBn) return null;
  return fixCategory(item);
}