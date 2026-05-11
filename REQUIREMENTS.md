# jiangui-resume — Requirements Review

> **Version:** 1.0
> **Date:** 2026-05-11
> **Author:** AI Development Assistant
> **Source:** Figma Design (`Pxa7n52GqECg5Kpd3xFBtu`) + Resume Content (`前端工程师简历.md`)

---

## 1. Project Overview

**jiangui-resume** is a personal portfolio & resume website for **Wang Jiangui (王建贵)**, a Senior Frontend Engineer with 5+ years of experience specializing in React/Next.js, frontend engineering, performance optimization, and AI application development.

The site serves as a professional landing page for job applications, replacing a static PDF resume with a high-performance, visually engaging, and SEO-optimized web presence.

---

## 2. Business Goals

| # | Goal | Success Metric |
|---|------|----------------|
| G1 | Replace PDF resume with an online interactive version | Site live at custom domain |
| G2 | Showcase technical depth & project impact | All 4 major projects presented with quantifiable outcomes |
| G3 | Maximize search engine discoverability | Google Rich Results pass; LCP < 2.5s |
| G4 | Demonstrate the owner's own tech stack in use | Built with Next.js + TypeScript + Tailwind + Vercel |
| G5 | Bilingual readiness (Chinese content, English-friendly structure) | All sections navigable, copy in Chinese with EN-ready i18n hooks |

---

## 3. Target Users

- **Recruiters & HR teams** — need quick, scannable summary of experience and contact info
- **Technical interviewers** — want to drill into project architecture decisions
- **Potential collaborators** — looking for tech overlap and communication style

---

## 4. Page Sections & Content Requirements

### 4.1 Navigation Bar

- Fixed/sticky header with site name / initials logo
- Anchor links: About · Skills · Experience · Projects · Education · Contact
- Mobile hamburger menu with drawer
- Smooth scroll behavior

### 4.2 Hero Section

- Full-viewport splash with candidate name & title
- Headline: `王建贵` / `Wang Jiangui`
- Sub-headline: `高级前端开发工程师 · AI 应用开发`
- One-liner summary: "5+ 年前端开发经验，专注 React / Next.js 与前端工程化体系建设"
- CTA buttons: `查看项目` (anchor → Projects) + `联系我` (anchor → Contact)
- Animated entrance (Framer Motion fade-in + slide-up)

### 4.3 About / Professional Summary

- Metric highlights grid (4 cards):
  - 5+ Years Experience
  - SEO 自然流量 14× 增长
  - LCP 优化至 1.8s
  - 构建速度提升 80%
- Brief prose paragraph from resume summary

### 4.4 Skills Section

- Grouped skill tags by category:
  - 前端框架与语言 (React, Next.js, Vue, TypeScript…)
  - 前端工程化 (Webpack, Vite, Monorepo, SWC…)
  - AI 应用开发 (RAG, Pinecone, SSE, MCP, OpenAI…)
  - 架构与设计 (IoC, SOLID, 微前端…)
  - 性能优化 (Core Web Vitals, WebAssembly, GPU…)
  - 状态管理 & 样式 (Jotai, Zustand, Tailwind…)
  - 测试 & 基础设施 (Jest, Playwright, Vercel, AWS…)
  - 图形学 (WebGPU, Three.js, AntV…)

### 4.5 Work Experience Section

- Vertical timeline layout
- 4 entries in reverse chronological order:
  1. 深圳京程一灯科技 — AI全栈开发工程师 (2025/12 - 至今)
  2. Gate.com — 高级前端开发工程师 (2023/11 - 2025/12)
  3. 翰竺科技 — 高级前端开发 (2022/04 - 2023/11)
  4. 中电金信 — 前端组长 (2020/07 - 2022/04)
  5. 贵州国信通 — 前端开发工程师 (2018/03 - 2020/06)
- Each entry: Company · Role · Date range · 3–5 bullet achievements
- Key metrics highlighted (bold / accent color)

### 4.6 Projects Section

- 2×2 card grid (responsive: 1 col mobile, 2 col tablet+)
- 4 project cards:
  1. **风电 RAG 知识库平台** — AI / RAG
  2. **Gate 大数据 SEO 专项** — SEO / Next.js
  3. **Michaels 商城** — E-commerce / Design System
  4. **贵阳银行混沌工程** — Engineering Platform
- Each card: Title · Tech badge list · Key outcome metric · "查看详情" modal/expand

### 4.7 Education Section

- Simple single entry: 贵州师范大学 · 本科 · 2015–2019

### 4.8 Contact Section

- Email link: <jiangui.eth@gmail.com>
- GitHub link: <https://github.com/jiangui-eth/jiangui-resume>
- Copy-to-clipboard email button
- Simple contact form (name, email, message) — static with mailto fallback

### 4.9 Footer

- Copyright line
- Anchor back-to-top button

---

## 5. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 15 (App Router)** | SSG/SSR, SEO, matches candidate's own expertise |
| Language | **TypeScript** | Type safety, aligns with resume |
| Styling | **Tailwind CSS v3** | Atomic CSS, matches resume tech stack |
| Animation | **Framer Motion** | Polished scroll-triggered animations |
| Icons | **Lucide React** | Lightweight, tree-shakable |
| Fonts | **Geist (Sans + Mono)** | Modern, Next.js native |
| Testing | **Jest + React Testing Library** (unit/integration) + **Playwright** (E2E) | |
| CI/CD | **GitHub Actions** | Lint → Test → Build → Deploy |
| Hosting | **Vercel** | Zero-config Next.js, preview deployments, analytics |
| Package Manager | **pnpm** | Fast, disk-efficient |

---

## 6. Non-Functional Requirements

### 6.1 Performance

- Lighthouse Performance score ≥ 95 (desktop)
- LCP < 2.5s on mobile 3G
- FID < 100ms; CLS < 0.1
- All images: WebP format with Next.js `<Image />` optimization
- No render-blocking scripts

### 6.2 SEO

- `<title>` and `<meta description>` per page
- Open Graph + Twitter Card meta tags
- JSON-LD `Person` schema injected in `<head>`
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `robots.txt` + `sitemap.xml` auto-generated

### 6.3 Accessibility

- WCAG 2.1 AA compliance
- Keyboard-navigable (focus rings, skip-to-content link)
- `aria-label` on icon-only buttons
- Minimum 4.5:1 color contrast ratio

### 6.4 Responsiveness

- Breakpoints: Mobile (< 640px), Tablet (640–1024px), Desktop (> 1024px)
- Touch-friendly tap targets ≥ 44×44px

### 6.5 Internationalisation

- All text extracted to `/data/resume.ts` data file
- i18n hooks ready for `next-intl` integration (future)

---

## 7. Design System Tokens (from Figma)

```
Colors:
  background:  #0A0A0A  (near-black)
  surface:     #111111  (card background)
  border:      #222222
  primary:     #3B82F6  (blue-500)
  accent:      #8B5CF6  (violet-500)
  text-primary: #F9FAFB
  text-muted:  #9CA3AF

Typography:
  heading-xl:  Geist, 72px, weight 700
  heading-lg:  Geist, 48px, weight 700
  heading-md:  Geist, 32px, weight 600
  body:        Geist, 16px, weight 400
  mono:        Geist Mono, 14px

Spacing scale: 4px base (Tailwind default)
Border radius: 8px (rounded-lg), 12px (rounded-xl)
```

---

## 8. Constraints & Assumptions

- **No backend required** — all content is static data in TypeScript files
- **Contact form** uses `mailto:` or Formspree (no server-side email handling in v1)
- **No CMS** — content updates require code changes (v1 scope)
- **Single-page application** — all sections on `/`, no sub-routes in v1
- Repository: `github.com/jiangui-eth/jiangui-resume` (assumed)
- Vercel project linked to the same GitHub repo for preview + production deployments

---

## 9. Out of Scope (v1)

- Dark/light mode toggle (dark-only in v1)
- Blog / writing section
- CMS integration (Contentful, Sanity)
- Multi-language toggle (i18n prep only)
- Analytics dashboard

---

## 10. Acceptance Criteria (Definition of Done)

- [ ] All 8 page sections render correctly on mobile, tablet, desktop
- [ ] Lighthouse scores: Performance ≥ 90, SEO = 100, Accessibility ≥ 95, Best Practices = 100
- [ ] All Jest unit tests pass (`pnpm test`)
- [ ] All Playwright E2E tests pass (`pnpm test:e2e`)
- [ ] GitHub Actions CI pipeline green on `main`
- [ ] Site deployed to Vercel production URL
- [ ] JSON-LD Person schema validated via Google Rich Results Test
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No ESLint errors (`pnpm lint`)
