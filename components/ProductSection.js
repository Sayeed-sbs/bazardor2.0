import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";

export default function ProductSection({ id, icon, iconColor, title, subtitle, items, loading }) {
  if (!loading && items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {icon && <span className={iconColor}>{icon}</span>}
          {title}
        </h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {loading ? (
        <CardSkeleton count={6} />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}