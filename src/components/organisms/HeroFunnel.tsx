"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/atoms/Logo";
import { WhatsAppCTA } from "@/components/molecules/WhatsAppCTA";
import { WHATSAPP } from "@/lib/constants";

export function HeroFunnel() {
  const t = useTranslations("hero");
  const words = t("tagline").split(" ");

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-12 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Logo size={140} priority />
      </motion.div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-display max-w-3xl text-3xl font-medium leading-tight sm:text-5xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-muted"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 sm:flex-row">
        <WhatsAppCTA
          number={WHATSAPP.left}
          label={t("ctaLeft")}
          message={t("waMessage")}
          side="left"
        />
        <WhatsAppCTA
          number={WHATSAPP.right}
          label={t("ctaRight")}
          message={t("waMessage")}
          side="right"
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 text-xs tracking-widest uppercase text-muted"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-block"
        >
          ↓ {t("scrollHint")}
        </motion.span>
      </motion.span>
    </section>
  );
}
