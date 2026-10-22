"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function login(provider) {
    const { error } = await authClient.signIn.social({
      provider: provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => login("google")}
        className="bg-white border border-line rounded-lg py-2.5 text-sm font-semibold hover:bg-soft cursor-pointer"
      >
        Google
      </button>
      <button
        type="button"
        onClick={() => login("github")}
        className="bg-white border border-line rounded-lg py-2.5 text-sm font-semibold hover:bg-soft cursor-pointer"
      >
        GitHub
      </button>
    </div>
  );
}