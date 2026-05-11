import { render, screen, fireEvent } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import { resumeData } from "@/data/resume";

describe("Projects section", () => {
  it("renders the section heading", () => {
    render(<Projects projects={resumeData.projects} />);
    expect(screen.getByText("项目经验")).toBeInTheDocument();
  });

  it("renders all project titles", () => {
    render(<Projects projects={resumeData.projects} />);
    resumeData.projects.forEach((p) => {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
    });
  });

  it("renders project metric highlights", () => {
    render(<Projects projects={resumeData.projects} />);
    // At least one project has a metric badge
    expect(screen.getAllByText(/↓|↑|×|倍/u).length).toBeGreaterThan(0);
  });

  it("opens modal when project card is clicked", () => {
    render(<Projects projects={resumeData.projects} />);
    const firstProject = resumeData.projects[0];
    const card = screen.getAllByRole("button", {
      name: new RegExp(`查看项目详情：${firstProject.title}`),
    })[0];
    fireEvent.click(card);
    // Modal should show the project title
    expect(screen.getAllByText(firstProject.title).length).toBeGreaterThan(1);
    // Modal close button should be visible
    expect(screen.getByRole("button", { name: "关闭" })).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<Projects projects={resumeData.projects} />);
    const firstProject = resumeData.projects[0];
    const card = screen.getAllByRole("button", {
      name: new RegExp(`查看项目详情：${firstProject.title}`),
    })[0];
    fireEvent.click(card);
    const closeBtn = screen.getByRole("button", { name: "关闭" });
    fireEvent.click(closeBtn);
    // Modal close button should no longer be in the DOM
    expect(screen.queryByRole("button", { name: "关闭" })).not.toBeInTheDocument();
  });
});
