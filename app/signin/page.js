"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
  }

  return (
    <div className="max-w-md mx-auto bg-surface border border-line rounded-2xl p-6 sm:p-8">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="text-sm text-gray-500 mt-1">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 border-t border-line"></div>
        <span className="text-xs text-gray-500">অথবা</span>
        <div className="flex-1 border-t border-line"></div>
      </div>

      <SocialButtons />

      <p className="text-sm text-center text-gray-600 mt-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-brand-dark font-semibold">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}