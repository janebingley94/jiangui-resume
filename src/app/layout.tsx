import type { Metadata } from "next";
import "./globals.css";
import { resumeData } from "@/data/resume";

export const metadata: Metadata = {
  metadataBase: new URL("https://jiangui.dev"),
  title: {
    default: `${resumeData.meta.nameEn} — ${resumeData.meta.titleEn}`,
    template: `%s | ${resumeData.meta.nameEn}`,
  },
  description: resumeData.meta.summaryEn,
  keywords: [
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Engineer",
    "AI Application Development",
    "RAG",
    "Performance Optimization",
    "王建贵",
    "Wang Jiangui",
  ],
  authors: [{ name: resumeData.meta.nameEn, url: "https://jiangui.dev" }],
  creator: resumeData.meta.nameEn,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: "https://jiangui.dev",
    siteName: `${resumeData.meta.nameEn} Portfolio`,
    title: `${resumeData.meta.nameEn} — Senior Frontend Engineer`,
    description: resumeData.meta.summaryEn,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${resumeData.meta.nameEn} — Senior Frontend Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resumeData.meta.nameEn} — Senior Frontend Engineer`,
    description: resumeData.meta.summaryEn,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resumeData.meta.nameEn,
  alternateName: resumeData.meta.name,
  jobTitle: resumeData.meta.titleEn,
  description: resumeData.meta.summaryEn,
  email: resumeData.contact.email,
  url: "https://jiangui.dev",
  sameAs: [resumeData.contact.github].filter(Boolean),
  knowsAbout: ["React", "Next.js", "TypeScript", "Frontend Engineering", "AI Development", "RAG", "Performance Optimization"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
        >
          跳转到主内容
        </a>
        {children}
      </body>
    </html>
  );
}
