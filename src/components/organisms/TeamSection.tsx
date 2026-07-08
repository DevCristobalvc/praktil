"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TeamCard } from "@/components/molecules/TeamCard";
import { LINKS } from "@/lib/constants";

export function TeamSection() {
  const t = useTranslations("team");

  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-16 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h2 className="font-display text-3xl font-medium sm:text-5xl">
          {t("title")}
        </h2>
        <p className="text-sm tracking-[0.3em] uppercase text-muted">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="flex flex-col items-start gap-16 sm:flex-row sm:gap-24">
        <TeamCard
          name={t("cristobal.name")}
          role={t("cristobal.role")}
          bio={t("cristobal.bio")}
          linkedin={LINKS.linkedinCristobal}
          linkedinLabel={t("linkedin")}
          initials="CV"
        />
        <TeamCard
          name={t("juan.name")}
          role={t("juan.role")}
          bio={t("juan.bio")}
          linkedin={LINKS.linkedinJuan}
          linkedinLabel={t("linkedin")}
          initials="JD"
          delay={0.15}
        />
      </div>
    </section>
  );
}
