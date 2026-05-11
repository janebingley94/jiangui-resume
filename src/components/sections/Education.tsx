"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Education as EducationType } from "@/types/resume";

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  return (
    <section id="education" className="section-padding">
      <div className="container-max">
        <SectionHeader label="Education" title="教育经历" />

        <div className="max-w-2xl mx-auto space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4 hover:border-primary/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{edu.school}</h3>
                <p className="text-text-muted text-sm">{edu.degree}</p>
                <p className="text-text-subtle text-xs font-mono mt-0.5">
                  {edu.startYear} – {edu.endYear}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
