"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp, Zap, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ResumeData, MetricHighlight } from "@/types/resume";

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  TrendingUp,
  Zap,
  Rocket,
};

interface MetricCardProps {
  metric: MetricHighlight;
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const Icon = iconMap[metric.icon] ?? Zap;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-6 flex flex-col items-center text-center hover:border-primary/30 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
        <Icon size={20} className="text-primary" />
      </div>
      <span className="text-3xl font-bold gradient-text mb-1">{metric.value}</span>
      <span className="text-text-muted text-sm">{metric.label}</span>
    </motion.div>
  );
}

interface AboutProps {
  data: ResumeData["meta"];
  metrics: MetricHighlight[];
}

export function About({ data, metrics }: AboutProps) {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <SectionHeader label="About" title="关于我" />

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        {/* Summary prose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto glass-card p-8"
        >
          <p className="text-text-muted leading-relaxed text-base sm:text-lg">{data.summary}</p>
        </motion.div>
      </div>
    </section>
  );
}
