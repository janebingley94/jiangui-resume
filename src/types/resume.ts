// ─── Resume Domain Types ──────────────────────────────────────────────────────

export interface ContactInfo {
  email: string;
  phone?: string;
  wechat?: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  skills: string[];
  color: "blue" | "violet" | "green" | "orange" | "rose" | "teal" | "amber" | "cyan";
}

export interface WorkExperience {
  id: string;
  company: string;
  companyEn?: string;
  role: string;
  roleEn?: string;
  location: string;
  startDate: string;
  endDate: string | "至今";
  isCurrentRole: boolean;
  achievements: string[];
  tags?: string[];
}

export interface ProjectTechStack {
  name: string;
  category: "frontend" | "backend" | "ai" | "infra" | "tooling";
}

export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  description: string;
  techStack: ProjectTechStack[];
  achievements: string[];
  keyDecisions: { title: string; detail: string }[];
  dateRange: string;
  metrics?: string;
  gradient: string;
}

export interface Education {
  school: string;
  schoolEn?: string;
  degree: string;
  degreeEn?: string;
  startYear: string;
  endYear: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  icon: string;
}

export interface ResumeData {
  meta: {
    name: string;
    nameEn: string;
    title: string;
    titleEn: string;
    summary: string;
    summaryEn: string;
  };
  contact: ContactInfo;
  metrics: MetricHighlight[];
  skills: SkillCategory[];
  experiences: WorkExperience[];
  projects: Project[];
  education: Education[];
}
