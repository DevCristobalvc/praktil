"use client";

import { motion } from "framer-motion";

const TECH = [
  "NEXT.JS", "SOLIDITY", "ETHEREUM", "KUBERNETES", "DOCKER", "AWS",
  "TERRAFORM", "LORA", "MQTT", "RS-485", "ZIGBEE", "PLA · PETG",
  "CNC", "RTSP", "ONVIF", "WIREGUARD", "POSTGRESQL", "RUST",
  "PYTHON", "LLMs", "RAG", "FIBER OPTICS",
];

export function TechMarquee() {
  const items = [...TECH, ...TECH];
  return (
    <div className="overflow-hidden border-y border-line py-5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="font-display flex items-center text-sm tracking-[0.25em] text-muted"
          >
            {tech}
            <span className="mx-6 inline-block h-1 w-1 rounded-full bg-foreground/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
