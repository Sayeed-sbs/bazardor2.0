import "./globals.css";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className={hind.variable}>
        <Suspense fallback={<div className="skeleton h-24 w-full"></div>}>
          <Navbar />
          <Ticker />
        </Suspense>
        <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
          <Suspense fallback={<div className="skeleton h-64 w-full"></div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}