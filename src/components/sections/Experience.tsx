"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { WorkExperience } from "@/types/resume";

interface ExperienceCardProps {
  exp: WorkExperience;
  index: number;
}

function ExperienceCard({ exp, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-primary",
          exp.isCurrentRole ? "bg-primary animate-pulse" : "bg-background"
        )}
      />

      <div className="glass-card p-5 hover:border-primary/20 transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">{exp.role}</h3>
            <p className="text-primary font-medium text-sm">{exp.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <CalendarDays size={12} />
              {exp.startDate} – {exp.endDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Achievements */}
        <ul className="space-y-1.5">
          {exp.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-muted leading-relaxed">
              <span className="text-primary mt-0.5 shrink-0">›</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: achievement.replace(
                    /(\d+[\d,.×xX%+↓↑倍]+(?:\s*[/月年s])?[\w]*)/g,
                    '<strong class="text-text-primary font-medium">$1</strong>'
                  ),
                }}
              />
            </li>
          ))}
        </ul>

        {/* Tags */}
        {exp.tags && exp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs bg-surface border border-border text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ExperienceProps {
  experiences: WorkExperience[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <SectionHeader
          label="Experience"
          title="工作经历"
          subtitle="5 年跨行业前端工程经验"
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-[6px] top-2 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent"
          />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
