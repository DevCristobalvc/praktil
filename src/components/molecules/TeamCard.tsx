"use client";

import { motion } from "framer-motion";

type TeamCardProps = {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  linkedinLabel: string;
  initials: string;
  photo?: string;
  delay?: number;
};

export function TeamCard({
  name,
  role,
  bio,
  linkedin,
  linkedinLabel,
  initials,
  photo,
  delay = 0,
}: TeamCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex max-w-sm flex-col items-center gap-4 text-center"
    >
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-foreground/80 transition-transform duration-300 hover:scale-105">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover grayscale"
          />
        ) : (
          <span className="font-display text-4xl font-medium text-muted">
            {initials}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl font-medium sm:text-2xl">{name}</h3>
        <p className="text-sm tracking-wide text-muted uppercase">{role}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{bio}</p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-line px-5 py-2 text-xs tracking-widest uppercase transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
      >
        {linkedinLabel}
      </a>
    </motion.article>
  );
}
