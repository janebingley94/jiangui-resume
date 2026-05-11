import { render, screen, fireEvent } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { resumeData } from "@/data/resume";
import * as utils from "@/lib/utils";

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  scrollToSection: jest.fn(),
}));

describe("Hero section", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the candidate name", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    expect(screen.getByText(resumeData.meta.name)).toBeInTheDocument();
  });

  it("renders the English name", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    expect(screen.getByText(resumeData.meta.nameEn)).toBeInTheDocument();
  });

  it("renders the title / role", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(resumeData.meta.title);
  });

  it("renders the summary paragraph", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    expect(screen.getByText(resumeData.meta.summary)).toBeInTheDocument();
  });

  it("'查看项目' button scrolls to projects section", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    fireEvent.click(screen.getByRole("button", { name: "查看项目" }));
    expect(utils.scrollToSection).toHaveBeenCalledWith("projects");
  });

  it("'联系我' button scrolls to contact section", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    fireEvent.click(screen.getByRole("button", { name: "联系我" }));
    expect(utils.scrollToSection).toHaveBeenCalledWith("contact");
  });

  it("renders GitHub link when github is provided", () => {
    render(<Hero data={resumeData.meta} contact={resumeData.contact} />);
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toHaveAttribute("href", resumeData.contact.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
