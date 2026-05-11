import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero data={resumeData.meta} contact={resumeData.contact} />
        <About data={resumeData.meta} metrics={resumeData.metrics} />
        <Skills skills={resumeData.skills} />
        <Experience experiences={resumeData.experiences} />
        <Projects projects={resumeData.projects} />
        <Education education={resumeData.education} />
        <Contact contact={resumeData.contact} />
      </main>
      <Footer name={resumeData.meta.nameEn} contact={resumeData.contact} />
    </>
  );
}
