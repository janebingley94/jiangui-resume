"use client";

import { motion } from "framer-motion";
import {
  Code2, Settings, Brain, Layers, Gauge, Palette, TestTube, Box,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn, skillColorMap } from "@/lib/utils";
import type { SkillCategory } from "@/types/resume";

const iconMap: Record<string, React.ElementType> = {
  Code2, Settings, Brain, Layers, Gauge, Palette, TestTube, Box,
};

interface SkillBadgeProps {
  name: string;
  color: SkillCategory["color"];
}

function SkillBadge({ name, color }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-block px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-default",
        skillColorMap[color]
      )}
    >
      {name}
    </motion.span>
  );
}

interface SkillGroupProps {
  category: SkillCategory;
  index: number;
}

function SkillGroup({ category, index }: SkillGroupProps) {
  const Icon = iconMap[category.icon] ?? Code2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="glass-card p-5 hover:border-border/60 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("w-7 h-7 rounded-md flex items-center justify-center", `bg-${category.color}-500/10`)}>
          <Icon size={15} className={`text-${category.color}-400`} />
        </div>
        <h3 className="text-sm font-semibold text-text-primary">{category.label}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <SkillBadge key={skill} name={skill} color={category.color} />
        ))}
      </div>
    </motion.div>
  );
}

interface SkillsProps {
  skills: SkillCategory[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="section-padding bg-surface/20">
      <div className="container-max">
        <SectionHeader
          label="Skills"
          title="技术栈"
          subtitle="多年工程实践积累的核心技术能力"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((category, i) => (
            <SkillGroup key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
