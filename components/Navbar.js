"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
    const today = new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(today);
  }, []);

    async function handleLogout() {
    setOpen(false);
    await authClient.signOut();
    toast.success("সাইন আউট সম্পন্ন হয়েছে");
    router.push("/");
  }

  return (
    <header className="relative z-30 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-brand-dark flex items-center justify-center shadow">
            <img src="/logo-icon.png" alt="logo" className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-base sm:text-lg leading-tight">বাজার দর</p>
            <p className="text-[11px] sm:text-xs text-gray-500">{date}</p>
          </div>
        </Link>

        {isPending ? (
          <div className="skeleton h-10 w-32"></div>
        ) : session ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="profile"
                  className="w-9 h-9 rounded-lg object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-brand-dark text-white flex items-center justify-center font-semibold">
                  {session.user.name.charAt(0)}
                </div>
              )}
              <span className="hidden sm:inline text-sm font-medium">
                {session.user.name.split(" ")[0]}
              </span>
              <span className="text-xs text-gray-500">▾</span>
            </button>

            {open && (
              <div>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)}
                ></div>
                <div className="absolute right-0 top-12 z-20 w-64 bg-white border border-line rounded-xl shadow-lg p-2">
                  <div className="px-3 py-2">
                    <p className="font-bold">{session.user.name}</p>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                  </div>
                  <div className="border-t border-line my-1"></div>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm hover:bg-soft"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-down hover:bg-soft cursor-pointer"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <Link href="/signin" className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="bg-brand-dark text-white text-xs sm:text-sm font-semibold rounded-lg px-3 sm:px-4 py-2 shadow-md hover:bg-brand whitespace-nowrap"
                >
                    সাইন আপ
                </Link>
            </div>
        )}
      </div>

      <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
        {categories.length === 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-20 shrink-0"></div>
          ))}
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
              pathname === `/category/${c.slug}`
                ? "bg-brand-dark text-white"
                : "text-ink hover:bg-soft"
            }`}
          >
            <span>{c.icon}</span>
            {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}