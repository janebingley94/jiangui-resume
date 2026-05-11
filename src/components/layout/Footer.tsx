"use client";

import { Github, Mail, ArrowUp } from "lucide-react";
import type { ContactInfo } from "@/types/resume";

interface FooterProps {
  name: string;
  contact: ContactInfo;
}

export function Footer({ name, contact }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              aria-label="发送邮件"
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Mail size={18} />
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 主页"
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="回到顶部"
            className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
