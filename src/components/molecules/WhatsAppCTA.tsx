"use client";

import { motion } from "framer-motion";
import { waLink } from "@/lib/constants";

type WhatsAppCTAProps = {
  number: string;
  label: string;
  message: string;
  side: "left" | "right";
};

function formatNumber(number: string): string {
  // 573005412940 -> +57 300 541 2940
  return `+${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}`;
}

export function WhatsAppCTA({ number, label, message, side }: WhatsAppCTAProps) {
  return (
    <motion.a
      href={waLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col items-center gap-1 border border-line px-6 py-4 transition-colors hover:border-foreground"
    >
      <span className="font-display text-sm tracking-widest uppercase text-muted transition-colors group-hover:text-foreground">
        {label}
      </span>
      <span className="font-display text-lg tabular-nums">
        {formatNumber(number)}
      </span>
    </motion.a>
  );
}
