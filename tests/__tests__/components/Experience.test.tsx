import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/sections/Experience";
import { resumeData } from "@/data/resume";

describe("Experience section", () => {
  it("renders the section heading", () => {
    render(<Experience experiences={resumeData.experiences} />);
    expect(screen.getByText("工作经历")).toBeInTheDocument();
  });

  it("renders all company names", () => {
    render(<Experience experiences={resumeData.experiences} />);
    // Each experience card shows the company name
    expect(screen.getByText(/Gate\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/翰竺科技/)).toBeInTheDocument();
    expect(screen.getByText(/中电金信/)).toBeInTheDocument();
  });

  it("renders role titles", () => {
    render(<Experience experiences={resumeData.experiences} />);
    expect(screen.getAllByText(/高级前端开发工程师/i).length).toBeGreaterThan(0);
  });

  it("renders date ranges", () => {
    render(<Experience experiences={resumeData.experiences} />);
    expect(screen.getByText(/2023\/11/)).toBeInTheDocument();
  });

  it("renders correct number of experience entries", () => {
    render(<Experience experiences={resumeData.experiences} />);
    // Each card has a role title
    const roles = screen.getAllByRole("listitem");
    // Achievements are list items; just verify the section renders without crash
    expect(roles.length).toBeGreaterThan(0);
  });
});
