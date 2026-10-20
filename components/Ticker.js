"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { bn } from "@/lib/helpers";

function TickerBadge({ change }) {
  if (change > 0) {
    return <span className="text-down font-semibold">▲ {bn(change)}%</span>;
  }
  if (change < 0) {
    return <span className="text-brand font-semibold">▼ {bn(Math.abs(change))}%</span>;
  }
  return <span className="text-gray-500 font-semibold">— ০.০%</span>;
}

export default function Ticker() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="skeleton h-11 w-full rounded-none"></div>;
  }

  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="bg-white border-b border-line overflow-hidden">
      <div className="ticker-track py-2.5 text-sm">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 border-r border-line whitespace-nowrap"
          >
            <span>{p.emoji}</span>
            <span className="font-semibold">{p.name}</span>
            <span className="text-gray-600">
              {bn(p.price)} টাকা/{p.unitShort}
            </span>
            <TickerBadge change={p.change} />
          </div>
        ))}
      </div>
    </div>
  );
}