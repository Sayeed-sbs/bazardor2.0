import Link from "next/link";
import { bn } from "@/lib/helpers";
import Badge from "./Badge";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-surface border border-line rounded-2xl p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-soft flex items-center justify-center text-2xl">
          {product.emoji}
        </div>
        <div>
          <h3 className="font-bold leading-tight">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold">{bn(product.price)} টাকা</p>
        </div>
        <Badge change={product.change} />
      </div>
    </Link>
  );
}