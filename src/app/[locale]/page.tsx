import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TopBar } from "@/components/organisms/TopBar";
import { HeroFunnel } from "@/components/organisms/HeroFunnel";
import {
  HardwareDecomposition,
  DecompositionFinale,
} from "@/components/organisms/HardwareDecomposition";
import { TechMarquee } from "@/components/molecules/TechMarquee";
import { TeamSection } from "@/components/organisms/TeamSection";
import { ContactSection } from "@/components/organisms/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <main>
      <TopBar />
      <HeroFunnel />
      <HardwareDecomposition />
      <DecompositionFinale />
      <TechMarquee />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
