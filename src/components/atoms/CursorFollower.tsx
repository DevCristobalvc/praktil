"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden [@media(pointer:fine)]:block"
    >
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -mt-4 -ml-4 h-8 w-8 rounded-full border border-foreground/30"
      />
      <motion.div
        style={{ x, y }}
        className="absolute -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-foreground"
      />
    </div>
  );
}
