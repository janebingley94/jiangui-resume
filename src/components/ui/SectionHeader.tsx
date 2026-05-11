"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <span className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">{title}</h2>
      {subtitle && (
        <p className="text-text-muted max-w-xl mx-auto text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}
