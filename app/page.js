"use client";
import { useEffect, useState } from "react";
import { getProducts, getCategories } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  const marketCount = products.length > 0 ? products[0].markets.length : 0;

  return (
    <div className="space-y-10">
      <Hero
        productCount={products.length}
        marketCount={marketCount}
        categoryCount={categories.length}
      />

      <ProductSection
        icon="▲"
        iconColor="text-down"
        title="আজ দাম বেড়েছে"
        items={risers}
        loading={loading}
      />

      <ProductSection
        icon="▼"
        iconColor="text-brand"
        title="আজ দাম কমেছে"
        items={fallers}
        loading={loading}
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="মোট ৩৩টি পণ্য দেখানো হচ্ছে"
        items={products}
        loading={loading}
      />
    </div>
  );
}