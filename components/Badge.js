import { bn } from "@/lib/helpers";

export default function Badge({ change }) {
  let content = <span className="text-gray-500">— ০.০%</span>;

  if (change > 0) {
    content = <span className="text-down">▲ {bn(change)}%</span>;
  }
  if (change < 0) {
    content = <span className="text-brand">▼ {bn(Math.abs(change))}%</span>;
  }

  return (
    <span className="bg-soft rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap">
      {content}
    </span>
  );
}