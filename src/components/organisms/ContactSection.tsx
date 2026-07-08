"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/atoms/Logo";
import { WhatsAppCTA } from "@/components/molecules/WhatsAppCTA";
import { WHATSAPP } from "@/lib/constants";

export function ContactSection() {
  const t = useTranslations("contact");
  const tHero = useTranslations("hero");

  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-12 border-t border-line px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h2 className="font-display text-4xl font-medium sm:text-6xl">
          {t("title")}
        </h2>
        <p className="text-base text-muted sm:text-lg">{t("subtitle")}</p>
      </motion.div>

      <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 sm:flex-row">
        <WhatsAppCTA
          number={WHATSAPP.left}
          label={tHero("ctaLeft")}
          message={tHero("waMessage")}
          side="left"
        />
        <WhatsAppCTA
          number={WHATSAPP.right}
          label={tHero("ctaRight")}
          message={tHero("waMessage")}
          side="right"
          delay={0.15}
        />
      </div>

      <footer className="mt-12 flex flex-col items-center gap-4">
        <Logo size={48} />
        <p className="text-xs tracking-widest uppercase text-muted">
          {t("footer")}
        </p>
      </footer>
    </section>
  );
}
