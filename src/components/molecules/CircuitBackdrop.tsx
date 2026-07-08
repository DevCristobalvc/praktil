"use client";

import { motion } from "framer-motion";

/**
 * Circuit traces that draw themselves from the screen edges toward the
 * center, like a schematic powering up behind the hero content.
 */

const TRACES = [
  "M0,120 H180 V240 H310",
  "M0,420 H140 V330 H300",
  "M1440,180 H1220 V300 H1080",
  "M1440,460 H1280 V360 H1120",
  "M120,0 V160 H260",
  "M1320,0 V200 H1180",
  "M200,800 V620 H340",
  "M1240,800 V640 H1100",
];

const VIAS: [number, number][] = [
  [180, 240], [140, 330], [1220, 300], [1280, 360],
  [120, 160], [1320, 200], [200, 620], [1240, 640],
];

export function CircuitBackdrop() {
  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-foreground"
      aria-hidden
    >
      {TRACES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.14"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 1.4, ease: "easeInOut" }}
        />
      ))}
      {VIAS.map(([cx, cy], i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
        >
          <circle cx={cx} cy={cy} r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle cx={cx} cy={cy} r="1.5" fill="currentColor" opacity="0.25" />
        </motion.g>
      ))}
    </svg>
  );
}
