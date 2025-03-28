import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      waitlistUrl="/"
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
          termsPageUrl: "https://storycrafter.app/terms",
          privacyPageUrl: "https://storycrafter.app/privacy",
        },
        variables: {
          colorPrimary: "#c48b3c",
          colorTextOnPrimaryBackground: "#0f1521",
          colorBackground: "#0f1521",
          colorInputBackground: "#131b2a",
          colorInputText: "#ffffff",
          colorTextSecondary: "#a7a7a7",
          fontFamily: "Inter, sans-serif",
          borderRadius: "0.5rem",
        },
        elements: {
          rootBox: "bg-[#0f1521]",
          card: "shadow-lg rounded-lg bg-[#131b2a]/50 border border-[#2a3042] backdrop-blur-sm max-w-[400px] w-full mx-auto",
          header: "gap-2",
          headerTitle: "text-2xl font-bold text-[#e6a54c]",
          headerSubtitle: "text-[#a7a7a7] text-center",
          main: "gap-2",
          form: "gap-2",
          formFieldInput:
            "border border-[#2a3042] rounded-md bg-[#131b2a]/50 text-white focus:border-[#c48b3c] focus:ring-[#c48b3c] w-full",
          formFieldLabel: "text-sm font-medium text-[#a7a7a7]",
          formButtonPrimary:
            "bg-[#c48b3c] hover:bg-[#e6a54c] text-[#0f1521] shadow transition-colors w-full rounded-md py-2",
          footerActionText: "text-[#a7a7a7]",
          footerActionLink: "text-[#e6a54c] hover:text-[#c48b3c]",
          dividerLine: "bg-[#2a3042]",
          dividerText: "text-[#a7a7a7]",
          formFieldInputShowPasswordButton:
            "text-[#a7a7a7] hover:text-[#e6a54c]",
          formFieldInputShowPasswordIcon: "text-[#a7a7a7]",
          formFieldErrorText: "text-red-400",
          formFieldSuccessText: "text-green-400",
          formFieldWarningText: "text-yellow-400",
          formFieldHintText: "text-[#a7a7a7]",
          formFieldInputIcon: "text-[#a7a7a7]",
          socialButtonsBlockButton:
            "border border-[#2a3042] rounded-md bg-[#131b2a]/50 text-white hover:bg-[#1a2436] hover:border-[#c48b3c] w-full",
          socialButtonsBlockButtonText: "font-medium",
          socialButtonsProviderIcon: "text-[#a7a7a7]",
          formFieldInputAction: "text-[#e6a54c] hover:text-[#c48b3c]",
          formFieldInputActionIcon: "text-[#e6a54c]",
          formFieldInputActionText: "text-[#e6a54c]",
          formFieldInputActionButton: "text-[#e6a54c] hover:text-[#c48b3c]",
          formFieldInputActionButtonIcon: "text-[#e6a54c]",
          formFieldInputActionButtonText: "text-[#e6a54c]",
          formFieldInputActionButtonHover: "text-[#c48b3c]",
          formFieldInputActionButtonActive: "text-[#c48b3c]",
          formFieldInputActionButtonFocus: "text-[#c48b3c]",
          formFieldInputActionButtonDisabled: "text-[#a7a7a7]",
          formFieldInputActionButtonLoading: "text-[#a7a7a7]",
          formFieldInputActionButtonSuccess: "text-green-400",
          formFieldInputActionButtonError: "text-red-400",
          formFieldInputActionButtonWarning: "text-yellow-400",
          formFieldInputActionButtonInfo: "text-blue-400",
          formFieldInputActionButtonHelp: "text-purple-400",
          formFieldInputActionButtonHint: "text-[#a7a7a7]",
          formFieldInputActionButtonIconHover: "text-[#c48b3c]",
          formFieldInputActionButtonIconActive: "text-[#c48b3c]",
          formFieldInputActionButtonIconFocus: "text-[#c48b3c]",
          formFieldInputActionButtonIconDisabled: "text-[#a7a7a7]",
          formFieldInputActionButtonIconLoading: "text-[#a7a7a7]",
          formFieldInputActionButtonIconSuccess: "text-green-400",
          formFieldInputActionButtonIconError: "text-red-400",
          formFieldInputActionButtonIconWarning: "text-yellow-400",
          formFieldInputActionButtonIconInfo: "text-blue-400",
          formFieldInputActionButtonIconHelp: "text-purple-400",
          formFieldInputActionButtonIconHint: "text-[#a7a7a7]",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <script
            defer
            src="https://umami.matthias.lol/script.js"
            data-website-id="e976c4a1-a093-42a0-982b-577cde525aa4"
          ></script>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
