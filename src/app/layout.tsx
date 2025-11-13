import type { Metadata } from "next";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanuj Karthikeyan",
  description: "Personal site built from modular Lego-like blocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${jetbrainsMono.variable} antialiased`}>
        <BackgroundEffects />
        <Header />
        <HeroSection />
        {children}
      </body>
    </html>
  );
}
