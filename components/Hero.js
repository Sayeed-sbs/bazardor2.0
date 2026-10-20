"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { bn } from "@/lib/helpers";

export default function Hero({ productCount, marketCount, categoryCount }) {
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(today);
  }, []);

  const stats = [
    { label: "পণ্য", number: productCount, text: "টি নিত্যদিনের পণ্য" },
    { label: "বাজার", number: marketCount, text: "টি বাজার অন্তর্ভুক্ত" },
    { label: "বিভাগ", number: categoryCount, text: "টি বিভাগের তথ্য" },
  ];

  return (
    <section className="bg-surface border border-line rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <span className="inline-block bg-brand-dark text-white text-xs font-semibold rounded-full px-3 py-1 min-h-6">
          {date}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-600 mt-3">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="inline-block bg-brand-dark text-white font-semibold rounded-lg px-5 py-2.5 mt-5 shadow-md hover:bg-brand"
        >
          সব পণ্য দেখুন
        </a>
        {!session && (
          <p className="text-sm text-gray-500 mt-3">
            বিনা খরচে{" "}
            <Link href="/signup" className="text-brand-dark font-semibold">
              সাইন আপ
            </Link>{" "}
            করে সব বিস্তারিত দাম দেখুন।
          </p>
        )}
      </div>

      {session ? (
        <div className="bg-soft border border-line rounded-2xl p-5 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-3xl font-bold">{bn(s.number)}</p>
              <p className="text-xs text-gray-500">{s.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <img src="/bazar-hero.png" alt="বাজার" className="w-full max-w-xs" />
        </div>
      )}
    </section>
  );
}