import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";
import { resumeData } from "@/data/resume";

describe("About section", () => {
  it("renders the section heading", () => {
    render(<About data={resumeData.meta} metrics={resumeData.metrics} />);
    expect(screen.getByText("关于我")).toBeInTheDocument();
  });

  it("renders all metric cards", () => {
    render(<About data={resumeData.meta} metrics={resumeData.metrics} />);
    resumeData.metrics.forEach((m) => {
      expect(screen.getByText(m.value)).toBeInTheDocument();
      expect(screen.getByText(m.label)).toBeInTheDocument();
    });
  });

  it("renders the professional summary text", () => {
    render(<About data={resumeData.meta} metrics={resumeData.metrics} />);
    expect(screen.getByText(resumeData.meta.summary)).toBeInTheDocument();
  });
});
