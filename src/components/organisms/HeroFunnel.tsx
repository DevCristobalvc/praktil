"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/atoms/Logo";
import { CornerMarks } from "@/components/atoms/CornerMarks";
import { CircuitBackdrop } from "@/components/molecules/CircuitBackdrop";
import { WhatsAppCTA } from "@/components/molecules/WhatsAppCTA";
import { WHATSAPP } from "@/lib/constants";

function AnimatedLine({ text, baseDelay }: { text: string; baseDelay: number }) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + i * 0.12, duration: 0.4 }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroFunnel() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-12 overflow-hidden px-6">
      <div className="bg-dotgrid absolute inset-0" aria-hidden />
      <CircuitBackdrop />
      <CornerMarks />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* rotating dashed orbit */}
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute -inset-4 rounded-full border border-dashed border-foreground/25"
        />
        <Logo size={140} priority className="relative" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-display max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
          <AnimatedLine text={t("tagline1")} baseDelay={0.5} />
          <AnimatedLine text={t("tagline2")} baseDelay={0.9} />
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-muted"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-between gap-4 sm:flex-row">
        <WhatsAppCTA
          number={WHATSAPP.left}
          label={t("ctaLeft")}
          message={t("waMessage")}
          side="left"
          delay={1.6}
        />
        <WhatsAppCTA
          number={WHATSAPP.right}
          label={t("ctaRight")}
          message={t("waMessage")}
          side="right"
          delay={1.6}
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 z-10 text-xs tracking-widest uppercase text-muted"
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
