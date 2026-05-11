"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn, techCategoryColorMap } from "@/lib/utils";
import type { Project } from "@/types/resume";

/* ─── Project Card ─────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card overflow-hidden cursor-pointer group"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`查看项目详情：${project.title}`}
    >
      {/* Gradient header strip */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", project.gradient.replace("/20", ""))} />

      <div className="p-5">
        {/* Category badge */}
        <span className="inline-block px-2 py-0.5 rounded text-xs font-mono text-text-muted border border-border mb-3">
          {project.category}
        </span>

        <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Key metric */}
        {project.metrics && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
            <span className="text-xs text-primary font-mono">📈 {project.metrics}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech.name}
              className={cn(
                "px-2 py-0.5 rounded text-xs font-medium",
                techCategoryColorMap[tech.category]
              )}
            >
              {tech.name}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-0.5 rounded text-xs text-text-subtle">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        <button className="flex items-center gap-1 text-xs text-primary hover:underline group-hover:gap-2 transition-all">
          查看详情 <ChevronRight size={13} />
        </button>
      </div>
    </motion.article>
  );
}

/* ─── Project Modal ────────────────────────────────────────────────── */

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Header */}
        <div className={cn("h-2 w-full rounded-t-2xl bg-gradient-to-r", project.gradient.replace("/20", ""))} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-text-muted border border-border px-2 py-0.5 rounded mb-2 inline-block">
                {project.category}
              </span>
              <h2 className="text-xl font-bold text-text-primary">{project.title}</h2>
              <p className="text-xs text-text-muted mt-1">{project.dateRange}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="关闭"
              className="p-1.5 rounded-md hover:bg-border/40 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-text-muted text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Achievements */}
          <div className="mb-5">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">核心成果</h3>
            <ul className="space-y-1.5">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-muted">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  <span className="text-text-primary font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Decisions */}
          {project.keyDecisions.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">核心技术决策</h3>
              <div className="space-y-3">
                {project.keyDecisions.map((kd, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-sm font-medium text-primary mb-1">{kd.title}</p>
                    <p className="text-xs text-text-muted leading-relaxed">{kd.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full tech stack */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">技术栈</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={cn("px-2.5 py-1 rounded-md text-xs font-medium", techCategoryColorMap[tech.category])}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-surface/20">
      <div className="container-max">
        <SectionHeader
          label="Projects"
          title="项目经验"
          subtitle="代表性工程项目与可量化的业务成果"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
