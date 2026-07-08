"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * A stylized circuit board sits sticky in the viewport. As the user scrolls,
 * each component detaches and flies off — and each departing part reveals
 * one of Praktil's service domains. Hardware disassembly as narrative.
 */

type PartConfig = {
  service: string;
  exit: { x: number; y: number; rotate: number };
  /** Position inside the board, in percentages */
  style: React.CSSProperties;
  variant: "chip" | "port" | "pins" | "antenna";
  label?: string;
};

const PARTS: PartConfig[] = [
  {
    service: "ai",
    exit: { x: -420, y: -120, rotate: -18 },
    style: { top: "36%", left: "33%", width: "34%", height: "22%" },
    variant: "chip",
    label: "PRAKTIL SoC",
  },
  {
    service: "web3",
    exit: { x: 420, y: -60, rotate: 14 },
    style: { top: "62%", left: "22%", width: "56%", height: "9%" },
    variant: "chip",
    label: "RAM 64GB",
  },
  {
    service: "networks",
    exit: { x: -420, y: 100, rotate: -10 },
    style: { top: "82%", left: "8%", width: "22%", height: "12%" },
    variant: "port",
    label: "ETH",
  },
  {
    service: "iot",
    exit: { x: 420, y: 120, rotate: 16 },
    style: { top: "82%", left: "70%", width: "22%", height: "12%" },
    variant: "port",
    label: "USB",
  },
  {
    service: "printing",
    exit: { x: -380, y: -180, rotate: -22 },
    style: { top: "6%", left: "12%", width: "76%", height: "6%" },
    variant: "pins",
  },
  {
    service: "antennas",
    exit: { x: 400, y: -200, rotate: 24 },
    style: { top: "16%", left: "76%", width: "14%", height: "10%" },
    variant: "antenna",
  },
  {
    service: "security",
    exit: { x: -420, y: 40, rotate: -14 },
    style: { top: "30%", left: "8%", width: "9%", height: "30%" },
    variant: "chip",
    label: "CAM",
  },
  {
    service: "cloud",
    exit: { x: 420, y: -140, rotate: 12 },
    style: { top: "16%", left: "30%", width: "26%", height: "12%" },
    variant: "chip",
    label: "PWR",
  },
];

const INTRO_END = 0.08;
const FINAL_START = 0.9;
const WINDOW = (FINAL_START - INTRO_END) / PARTS.length;

function partRange(i: number): [number, number] {
  return [INTRO_END + i * WINDOW, INTRO_END + (i + 1) * WINDOW];
}

function PartBody({ variant, label }: { variant: PartConfig["variant"]; label?: string }) {
  if (variant === "pins") {
    return (
      <div className="flex h-full w-full items-center justify-between border border-foreground/60 bg-background px-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
        ))}
      </div>
    );
  }
  if (variant === "antenna") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-end">
        <span className="h-3 w-3 rounded-full border border-foreground/70" />
        <span className="h-full w-px bg-foreground/70" />
      </div>
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center border bg-background ${
        variant === "port"
          ? "border-2 border-foreground/70"
          : "border-foreground/60"
      }`}
    >
      {label && (
        <span className="font-display text-[0.5rem] tracking-widest text-muted sm:text-[0.6rem]">
          {label}
        </span>
      )}
    </div>
  );
}

function Part({
  progress,
  config,
  index,
}: {
  progress: MotionValue<number>;
  config: PartConfig;
  index: number;
}) {
  const [start, end] = partRange(index);
  const x = useTransform(progress, [start, end], [0, config.exit.x]);
  const y = useTransform(progress, [start, end], [0, config.exit.y]);
  const rotate = useTransform(progress, [start, end], [0, config.exit.rotate]);
  const opacity = useTransform(progress, [start, end - WINDOW * 0.15], [1, 0]);

  return (
    <motion.div
      style={{ ...config.style, x, y, rotate, opacity }}
      className="absolute"
    >
      <PartBody variant={config.variant} label={config.label} />
    </motion.div>
  );
}

function ServiceLabel({
  progress,
  index,
  name,
  desc,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  name: string;
  desc: string;
  total: number;
}) {
  const [start, end] = partRange(index);
  const opacity = useTransform(
    progress,
    [start, start + WINDOW * 0.25, end - WINDOW * 0.15, end],
    [0, 1, 1, 0],
  );
  const yText = useTransform(progress, [start, start + WINDOW * 0.25], [16, 0]);

  return (
    <motion.div
      style={{ opacity, y: yText }}
      className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 text-center"
    >
      <span className="text-xs tracking-widest text-muted tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <h3 className="font-display text-3xl font-medium sm:text-5xl">{name}</h3>
      <p className="text-sm text-muted sm:text-base">{desc}</p>
    </motion.div>
  );
}

export function HardwareDecomposition() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("decomposition");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, INTRO_END - 0.01, INTRO_END],
    [0, 1, 1, 0],
  );
  const boardOpacity = useTransform(
    scrollYProgress,
    [FINAL_START - 0.02, FINAL_START],
    [1, 0],
  );
  const finalOpacity = useTransform(
    scrollYProgress,
    [FINAL_START, FINAL_START + 0.05],
    [0, 1],
  );
  const finalScale = useTransform(
    scrollYProgress,
    [FINAL_START, FINAL_START + 0.05],
    [0.9, 1],
  );

  return (
    <section ref={ref} className="relative h-[700vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-6">
        {/* Intro line */}
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute top-[12%] max-w-xl text-center font-display text-lg text-muted sm:text-xl"
        >
          {t("intro")}
        </motion.p>

        {/* The board */}
        <motion.div
          style={{ opacity: boardOpacity }}
          className="relative aspect-[3/4] w-[280px] sm:w-[340px]"
        >
          <div className="absolute inset-0 rounded-lg border-2 border-foreground/80">
            {/* mounting holes */}
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
              (pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-2.5 w-2.5 rounded-full border border-foreground/50`}
                />
              ),
            )}
          </div>
          {PARTS.map((part, i) => (
            <Part
              key={part.service}
              progress={scrollYProgress}
              config={part}
              index={i}
            />
          ))}
        </motion.div>

        {/* Service labels */}
        <div className="relative h-36 w-full max-w-2xl">
          {PARTS.map((part, i) => (
            <ServiceLabel
              key={part.service}
              progress={scrollYProgress}
              index={i}
              total={PARTS.length}
              name={t(`services.${part.service}.name`)}
              desc={t(`services.${part.service}.desc`)}
            />
          ))}
        </div>

        {/* Final message */}
        <motion.div
          style={{ opacity: finalOpacity, scale: finalScale }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
        >
          <h2 className="font-display text-3xl font-medium sm:text-5xl">
            {t("final1")}
          </h2>
          <h2 className="font-display text-3xl font-medium text-muted sm:text-5xl">
            {t("final2")}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
