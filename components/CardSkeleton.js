export default function CardSkeleton({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((_, i) => (
        <div key={i} className="skeleton h-[138px] w-full rounded-2xl"></div>
      ))}
    </div>
  );
}