import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for non-secure contexts
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return new Promise((resolve, reject) => {
    if (document.execCommand("copy")) {
      resolve();
    } else {
      reject(new Error("Copy failed"));
    }
    document.body.removeChild(textArea);
  });
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 64; // height of sticky nav
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export const skillColorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20",
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20",
  rose: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20",
};

export const techCategoryColorMap: Record<string, string> = {
  frontend: "bg-blue-500/10 text-blue-400",
  backend: "bg-green-500/10 text-green-400",
  ai: "bg-violet-500/10 text-violet-400",
  infra: "bg-orange-500/10 text-orange-400",
  tooling: "bg-gray-500/10 text-gray-400",
};
