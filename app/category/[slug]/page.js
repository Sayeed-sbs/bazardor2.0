"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts, getCategory } from "@/lib/api";
import { bn } from "@/lib/helpers";
import ProductCard from "@/components/ProductCard";
import CardSkeleton from "@/components/CardSkeleton";
import NotFoundBox from "@/components/NotFoundBox";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    setSort("default");
    Promise.all([getProducts(slug), getCategory(slug)])
      .then(([p, c]) => {
        setProducts(p);
        setCategory(c);
      })
      .catch(() => {
        setProducts([]);
        setCategory(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const list = [...products];
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);

  if (!loading && (!category || products.length === 0)) {
    return <NotFoundBox />;
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="skeleton h-24 w-full rounded-2xl"></div>
      ) : (
        <div className="bg-surface border border-line rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-soft flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold">{category.name}</h1>
            <p className="text-sm text-gray-500">
              {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      )}

      <div className="bg-surface border border-line rounded-2xl p-4 flex items-center justify-end gap-3">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            disabled={loading}
            className="appearance-none bg-white border border-line rounded-lg pl-3 pr-8 py-1.5 text-sm cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            ▾
          </span>
        </div>
      </div>

      {!loading && (
        <p className="text-sm text-gray-500">
          মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      )}

      {loading ? (
        <CardSkeleton count={6} />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}