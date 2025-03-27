import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryCrafter - AI-Powered Narrative Creation",
  description:
    "Create immersive stories, games, and content with AI assistance",
  keywords: [
    "storytelling",
    "AI writing",
    "narrative design",
    "game development",
    "content creation",
  ],
  authors: [{ name: "StoryCrafter Team" }],
  openGraph: {
    title: "StoryCrafter - AI-Powered Narrative Creation",
    description:
      "Create immersive stories, games, and content with AI assistance",
    url: "https://storycrafter.app",
    siteName: "StoryCrafter",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script
        defer
        src="https://umami.matthias.lol/script.js"
        data-website-id="e976c4a1-a093-42a0-982b-577cde525aa4"
      ></script>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
