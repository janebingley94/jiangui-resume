import { render, screen } from "@testing-library/react";
import { Skills } from "@/components/sections/Skills";
import { resumeData } from "@/data/resume";

describe("Skills section", () => {
  it("renders the section heading", () => {
    render(<Skills skills={resumeData.skills} />);
    expect(screen.getByText("技术栈")).toBeInTheDocument();
  });

  it("renders all skill category labels", () => {
    render(<Skills skills={resumeData.skills} />);
    resumeData.skills.forEach((cat) => {
      expect(screen.getByText(cat.label)).toBeInTheDocument();
    });
  });

  it("renders individual skill badges", () => {
    render(<Skills skills={resumeData.skills} />);
    // Spot-check a few core skills
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });
});
