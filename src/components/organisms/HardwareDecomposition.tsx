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
 * A detailed PCB rendered in SVG sits sticky in the viewport. As the user
 * scrolls, each component desolders and flies off — leaving its footprint
 * exposed on the board — and reveals one of Praktil's service domains.
 */

type Exit = { x: number; y: number; rotate: number };

const SERVICES = [
  "ai",
  "web3",
  "networks",
  "iot",
  "printing",
  "antennas",
  "security",
  "cloud",
] as const;

const EXITS: Record<(typeof SERVICES)[number], Exit> = {
  ai: { x: -480, y: -140, rotate: -18 },
  web3: { x: 480, y: -60, rotate: 14 },
  networks: { x: -480, y: 120, rotate: -12 },
  iot: { x: 480, y: 140, rotate: 16 },
  printing: { x: -440, y: -220, rotate: -24 },
  antennas: { x: 460, y: -240, rotate: 26 },
  security: { x: -500, y: 20, rotate: -14 },
  cloud: { x: 480, y: -160, rotate: 12 },
};

const INTRO_END = 0.08;
const FINAL_START = 0.9;
const WINDOW = (FINAL_START - INTRO_END) / SERVICES.length;

function partRange(i: number): [number, number] {
  return [INTRO_END + i * WINDOW, INTRO_END + (i + 1) * WINDOW];
}

function FlyingPart({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const [start, end] = partRange(index);
  const exit = EXITS[SERVICES[index]];
  const x = useTransform(progress, [start, end], [0, exit.x]);
  const y = useTransform(progress, [start, end], [0, exit.y]);
  const rotate = useTransform(progress, [start, end], [0, exit.rotate]);
  const scale = useTransform(progress, [start, end], [1, 1.15]);
  const opacity = useTransform(progress, [start, end - WINDOW * 0.15], [1, 0]);

  return (
    <motion.g
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.g>
  );
}

/* ---------- static board artwork ---------- */

function CopperTraces() {
  return (
    <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.22">
      {/* SoC → GPIO header */}
      <path d="M150,170 V50" />
      <path d="M170,170 V50" />
      <path d="M190,170 V50" />
      {/* SoC → camera connector */}
      <path d="M120,205 H60 V200 H44" />
      <path d="M120,220 H52 V215 H44" />
      {/* SoC → antenna */}
      <path d="M220,190 H288 V96" />
      {/* PWR → SoC */}
      <path d="M98,92 V140 H140 V170" />
      {/* SoC → RAM */}
      <path d="M150,270 V300" />
      <path d="M170,270 V300" />
      <path d="M190,270 V300" />
      {/* RAM → ETH */}
      <path d="M105,336 V358 H75 V368" />
      {/* RAM → USB */}
      <path d="M235,336 V352 H263 V368" />
    </g>
  );
}

function Vias() {
  const points: [number, number][] = [
    [60, 200], [52, 215], [288, 96], [98, 140], [75, 358], [263, 352],
    [140, 140], [230, 140], [70, 250], [270, 250], [110, 120], [250, 320],
  ];
  return (
    <g fill="currentColor" opacity="0.3">
      {points.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" opacity="0.5" />
          <circle cx={cx} cy={cy} r="1.2" />
        </g>
      ))}
    </g>
  );
}

function Silkscreen() {
  const labels: { x: number; y: number; text: string; anchor?: "start" | "end" }[] = [
    { x: 112, y: 166, text: "U1" },
    { x: 84, y: 296, text: "U2" },
    { x: 38, y: 364, text: "J1" },
    { x: 300, y: 364, text: "J2", anchor: "end" },
    { x: 44, y: 26, text: "J3" },
    { x: 264, y: 62, text: "E1" },
    { x: 24, y: 144, text: "J4" },
    { x: 40, y: 62, text: "U3" },
  ];
  return (
    <g
      fill="currentColor"
      opacity="0.45"
      fontSize="7"
      fontFamily="var(--font-space-grotesk)"
    >
      {labels.map((l) => (
        <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor ?? "start"}>
          {l.text}
        </text>
      ))}
      <text x="170" y="448" textAnchor="middle" fontSize="8" letterSpacing="2">
        PRAKTIL · REV 2.6
      </text>
    </g>
  );
}

function Footprints() {
  // Exposed solder footprints, revealed when parts fly off
  return (
    <g
      stroke="currentColor"
      strokeWidth="0.75"
      strokeDasharray="3 3"
      fill="none"
      opacity="0.3"
    >
      <rect x="120" y="170" width="100" height="100" />
      <rect x="90" y="300" width="160" height="36" />
      <rect x="40" y="368" width="70" height="58" />
      <rect x="230" y="368" width="66" height="58" />
      <rect x="48" y="28" width="244" height="22" />
      <rect x="268" y="66" width="46" height="30" />
      <rect x="26" y="150" width="18" height="110" />
      <rect x="42" y="66" width="94" height="46" />
    </g>
  );
}

function BoardBase() {
  return (
    <g>
      <rect
        x="10"
        y="10"
        width="320"
        height="440"
        rx="14"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="18"
        y="18"
        width="304"
        height="424"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 4"
        opacity="0.2"
      />
      {/* mounting holes */}
      {(
        [
          [30, 30],
          [310, 30],
          [30, 430],
          [310, 430],
        ] as const
      ).map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} stroke="currentColor" fill="none">
          <circle cx={cx} cy={cy} r="7" strokeWidth="1.5" opacity="0.6" />
          <circle cx={cx} cy={cy} r="3.5" strokeWidth="1" opacity="0.9" />
        </g>
      ))}
    </g>
  );
}

/* ---------- components (the flying parts) ---------- */

function SoC() {
  const pins = Array.from({ length: 12 });
  return (
    <g>
      {/* side pins */}
      <g fill="currentColor" opacity="0.7">
        {pins.map((_, i) => (
          <rect key={`t${i}`} x={126 + i * 7.5} y={165} width="4" height="6" />
        ))}
        {pins.map((_, i) => (
          <rect key={`b${i}`} x={126 + i * 7.5} y={269} width="4" height="6" />
        ))}
        {pins.map((_, i) => (
          <rect key={`l${i}`} x={115} y={176 + i * 7.5} width="6" height="4" />
        ))}
        {pins.map((_, i) => (
          <rect key={`r${i}`} x={219} y={176 + i * 7.5} width="6" height="4" />
        ))}
      </g>
      <rect
        x="121"
        y="171"
        width="98"
        height="98"
        rx="4"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* die */}
      <rect
        x="150"
        y="200"
        width="40"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.5"
      />
      <circle cx="132" cy="182" r="2.5" fill="currentColor" opacity="0.6" />
      <text
        x="170"
        y="256"
        textAnchor="middle"
        fontSize="9"
        letterSpacing="1.5"
        fill="currentColor"
        fontFamily="var(--font-space-grotesk)"
      >
        PRAKTIL SoC
      </text>
    </g>
  );
}

function Ram() {
  const pins = Array.from({ length: 18 });
  return (
    <g>
      <g fill="currentColor" opacity="0.7">
        {pins.map((_, i) => (
          <rect key={`t${i}`} x={95 + i * 8.5} y={296} width="3.5" height="5" />
        ))}
        {pins.map((_, i) => (
          <rect key={`b${i}`} x={95 + i * 8.5} y={335} width="3.5" height="5" />
        ))}
      </g>
      <rect
        x="91"
        y="301"
        width="158"
        height="34"
        rx="3"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="170"
        y="322"
        textAnchor="middle"
        fontSize="8"
        letterSpacing="1.5"
        fill="currentColor"
        fontFamily="var(--font-space-grotesk)"
      >
        LPDDR5 · 64 GB
      </text>
    </g>
  );
}

function EthernetPort() {
  return (
    <g>
      <rect
        x="41"
        y="369"
        width="68"
        height="56"
        rx="3"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* shield hatching */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.35">
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={45 + i * 9}
            y1="371"
            x2={41 + i * 9}
            y2="381"
          />
        ))}
      </g>
      {/* port cavity */}
      <rect
        x="52"
        y="386"
        width="46"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect
        x="66"
        y="408"
        width="18"
        height="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* LEDs */}
      <circle cx="48" cy="380" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="102" cy="380" r="2" fill="currentColor" opacity="0.5" />
    </g>
  );
}

function UsbStack() {
  return (
    <g>
      {[0, 30].map((dy) => (
        <g key={dy}>
          <rect
            x="231"
            y={369 + dy}
            width="64"
            height="26"
            rx="2"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="239"
            y={376 + dy}
            width="48"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="243"
            y1={382 + dy}
            x2="283"
            y2={382 + dy}
            stroke="currentColor"
            strokeWidth="2.5"
            opacity="0.5"
          />
        </g>
      ))}
    </g>
  );
}

function GpioHeader() {
  const cols = Array.from({ length: 20 });
  return (
    <g>
      <rect
        x="49"
        y="29"
        width="242"
        height="20"
        rx="2"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <g fill="currentColor">
        {cols.map((_, i) => (
          <rect key={`a${i}`} x={54 + i * 11.7} y={32.5} width="4" height="4" />
        ))}
        {cols.map((_, i) => (
          <rect key={`b${i}`} x={54 + i * 11.7} y={41.5} width="4" height="4" />
        ))}
      </g>
    </g>
  );
}

function CeramicAntenna() {
  return (
    <g>
      <rect
        x="269"
        y="67"
        width="44"
        height="28"
        rx="2"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* meander line */}
      <path
        d="M273,88 V72 H281 V88 H289 V72 H297 V88 H305 V72"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.75"
      />
    </g>
  );
}

function CameraConnector() {
  return (
    <g>
      <rect
        x="27"
        y="151"
        width="16"
        height="108"
        rx="2"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* latch */}
      <rect
        x="30"
        y="156"
        width="10"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* ribbon contacts */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1="31"
            y1={176 + i * 9}
            x2="39"
            y2={176 + i * 9}
          />
        ))}
      </g>
    </g>
  );
}

function PowerBlock() {
  return (
    <g>
      {/* regulator */}
      <rect
        x="44"
        y="70"
        width="32"
        height="22"
        rx="2"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="48" y1="76" x2="72" y2="76" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      {/* inductor */}
      <circle
        cx="100"
        cy="86"
        r="14"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="86" r="7" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      {/* capacitors */}
      <circle cx="126" cy="74" r="6" fill="var(--background)" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="126" cy="98" r="6" fill="var(--background)" stroke="currentColor" strokeWidth="1.25" />
      <line x1="123" y1="74" x2="129" y2="74" stroke="currentColor" strokeWidth="0.75" />
      <line x1="123" y1="98" x2="129" y2="98" stroke="currentColor" strokeWidth="0.75" />
    </g>
  );
}

const PART_RENDERERS = [
  SoC,
  Ram,
  EthernetPort,
  UsbStack,
  GpioHeader,
  CeramicAntenna,
  CameraConnector,
  PowerBlock,
];

/* ---------- service label ---------- */

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
  // Hard on/off: the label must never sit half-faded when scrolling stops
  // mid-window, so the visibility ramp is a near-instant step (3% of the
  // window) with no vertical drift.
  const opacity = useTransform(
    progress,
    [start, start + WINDOW * 0.03, end - WINDOW * 0.03, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ opacity }}
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

/* ---------- main ---------- */

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
  const boardRotateX = useTransform(
    scrollYProgress,
    [0, INTRO_END * 2],
    [16, 0],
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
        <div className="bg-dotgrid absolute inset-0" aria-hidden />

        {/* Intro line */}
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute top-[10%] z-10 max-w-xl text-center font-display text-lg text-muted sm:text-xl"
        >
          {t("intro")}
        </motion.p>

        {/* The board */}
        <div style={{ perspective: 1400 }} className="relative z-10">
          <motion.div
            style={{ opacity: boardOpacity, rotateX: boardRotateX }}
            className="relative"
          >
            <svg
              viewBox="0 0 340 460"
              className="h-auto w-[280px] text-foreground sm:w-[330px]"
              aria-hidden
            >
              <BoardBase />
              <CopperTraces />
              <Vias />
              <Footprints />
              <Silkscreen />
              {PART_RENDERERS.map((Renderer, i) => (
                <FlyingPart
                  key={SERVICES[i]}
                  progress={scrollYProgress}
                  index={i}
                >
                  <Renderer />
                </FlyingPart>
              ))}
            </svg>
            {/* board shadow */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[100%] bg-foreground/10 blur-xl"
            />
          </motion.div>
        </div>

        {/* CAD-style caption */}
        <motion.span
          style={{ opacity: boardOpacity }}
          className="z-10 mt-6 text-[0.6rem] tracking-[0.35em] text-muted uppercase"
        >
          PRK-001 · SCALE 1:1 · LAB
        </motion.span>

        {/* Service labels */}
        <div className="relative z-10 h-36 w-full max-w-2xl">
          {SERVICES.map((service, i) => (
            <ServiceLabel
              key={service}
              progress={scrollYProgress}
              index={i}
              total={SERVICES.length}
              name={t(`services.${service}.name`)}
              desc={t(`services.${service}.desc`)}
            />
          ))}
        </div>

        {/* Final message */}
        <motion.div
          style={{ opacity: finalOpacity, scale: finalScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center"
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
