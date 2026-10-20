import Link from "next/link";

export default function NotFoundBox() {
  return (
    <div className="bg-surface border border-line rounded-2xl text-center py-16 px-4">
      <p className="text-6xl font-bold text-brand-dark">৪০৪</p>
      <p className="mt-3 text-gray-600">দুঃখিত, আপনি যা খুঁজছেন তা পাওয়া যায়নি।</p>
      <Link
        href="/"
        className="inline-block bg-brand-dark text-white font-semibold rounded-lg px-5 py-2.5 mt-6 hover:bg-brand"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}