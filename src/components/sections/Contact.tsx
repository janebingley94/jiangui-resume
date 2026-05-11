"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Copy, Check, Send } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { copyToClipboard } from "@/lib/utils";
import type { ContactInfo } from "@/types/resume";

interface CopyButtonProps {
  text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail; user can manually copy
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "已复制" : "复制邮箱地址"}
      className="p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
    >
      {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
    </button>
  );
}

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const [form, setForm] = useState<ContactFormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormState> = {};
    if (!form.name.trim()) newErrors.name = "请输入您的姓名";
    if (!form.email.trim()) {
      newErrors.email = "请输入邮箱地址";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    if (!form.message.trim()) newErrors.message = "请输入留言内容";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`来自 ${form.name} 的留言`);
    const body = encodeURIComponent(`姓名：${form.name}\n邮箱：${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  const field = (key: keyof ContactFormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-text-muted mb-1">
          姓名 <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="您的姓名"
          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-subtle text-sm focus:outline-none focus:border-primary/60 transition-colors"
          {...field("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-xs text-red-400 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-text-muted mb-1">
          邮箱 <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-subtle text-sm focus:outline-none focus:border-primary/60 transition-colors"
          {...field("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-400 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-text-muted mb-1">
          留言 <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="您好，我想..."
          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-text-primary placeholder:text-text-subtle text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
          {...field("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-400 mt-1">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors"
      >
        <Send size={15} />
        发送留言
      </button>
    </form>
  );
}

interface ContactProps {
  contact: ContactInfo;
}

export function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="section-padding bg-surface/20">
      <div className="container-max">
        <SectionHeader
          label="Contact"
          title="联系我"
          subtitle="欢迎洽谈合作机会或技术交流"
        />

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — contact links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-text-muted text-sm leading-relaxed">
              如果您有合作机会、职位推荐或技术话题想要探讨，欢迎随时联系。通常在 24 小时内回复。
            </p>

            {contact.email && (
              <div className="glass-card p-4 flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail size={17} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">邮箱</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-text-primary hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <CopyButton text={contact.email} />
              </div>
            )}

            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors block"
              >
                <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center">
                  <Github size={17} className="text-text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-0.5">GitHub</p>
                  <p className="text-sm text-text-primary">jiangui-eth</p>
                </div>
              </a>
            )}
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-5"
          >
            <ContactForm recipientEmail={contact.email ?? ""} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
