"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) {
      console.log(error);
      toast.error(error.message || error.statusText || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="max-w-md mx-auto bg-surface border border-line rounded-2xl p-6 sm:p-8">
      <h1 className="text-2xl font-bold">সাইন আপ</h1>
      <p className="text-sm text-gray-500 mt-1">
        বিনা খরচে অ্যাকাউন্ট খুলে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">নাম</label>
          <input
            type="text"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ইমেইল</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-dark text-white font-semibold rounded-lg py-2.5 hover:bg-brand disabled:opacity-60 cursor-pointer"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 border-t border-line"></div>
        <span className="text-xs text-gray-500">অথবা</span>
        <div className="flex-1 border-t border-line"></div>
      </div>

      <SocialButtons />

      <p className="text-sm text-center text-gray-600 mt-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-brand-dark font-semibold">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}