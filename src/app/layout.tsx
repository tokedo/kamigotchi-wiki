import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — Kamigotchi Wiki",
    default: "Kamigotchi Wiki — Community Game Guide",
  },
  description:
    "Complete guide to Kamigotchi, the on-chain MMORPG on Yominet. Mechanics, formulas, item database, quest graph, and world map.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${pixelifySans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex">
        <Sidebar />
        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
            {children}
          </div>
        </main>
        <GoogleAnalytics gaId="G-Z3VDQCTL9K" />
      </body>
    </html>
  );
}
