import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function V1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <HeroSection />
      {children}
    </>
  );
}
