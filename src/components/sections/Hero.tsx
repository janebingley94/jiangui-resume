"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Github } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import type { ResumeData, ContactInfo } from "@/types/resume";

interface HeroProps {
  data: ResumeData["meta"];
  contact: ContactInfo;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero({ data, contact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
      />

      <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="gradient-text">{data.name}</span>
        </motion.h1>

        {/* English name */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-mono text-text-muted text-base sm:text-lg mb-6"
        >
          {data.nameEn}
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text-primary mb-4"
        >
          {data.title}
        </motion.h2>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="max-w-2xl mx-auto text-text-muted text-base sm:text-lg leading-relaxed mb-10"
        >
          {data.summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-colors w-full sm:w-auto"
          >
            查看项目
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-text-primary font-medium transition-colors w-full sm:w-auto"
          >
            联系我
          </button>
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-border hover:bg-surface text-text-muted font-medium transition-colors w-full sm:w-auto justify-center"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollToSection("about")}
        aria-label="向下滚动"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-subtle hover:text-text-muted transition-colors"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
