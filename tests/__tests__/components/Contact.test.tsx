import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "@/components/sections/Contact";
import { resumeData } from "@/data/resume";

describe("Contact section", () => {
  it("renders the section heading", () => {
    render(<Contact contact={resumeData.contact} />);
    expect(screen.getByText("联系我")).toBeInTheDocument();
  });

  it("renders the email address", () => {
    render(<Contact contact={resumeData.contact} />);
    expect(screen.getByText(resumeData.contact.email!)).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<Contact contact={resumeData.contact} />);
    expect(screen.getByLabelText(/姓名/)).toBeInTheDocument();
    expect(screen.getByLabelText(/邮箱/)).toBeInTheDocument();
    expect(screen.getByLabelText(/留言/)).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<Contact contact={resumeData.contact} />);
    const submitBtn = screen.getByRole("button", { name: /发送留言/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText("请输入您的姓名")).toBeInTheDocument();
      expect(screen.getByText("请输入邮箱地址")).toBeInTheDocument();
      expect(screen.getByText("请输入留言内容")).toBeInTheDocument();
    });
  });

  it("shows email format error for invalid email", async () => {
    render(<Contact contact={resumeData.contact} />);
    await userEvent.type(screen.getByLabelText(/姓名/), "Test User");
    await userEvent.type(screen.getByLabelText(/邮箱/), "not-an-email");
    await userEvent.type(screen.getByLabelText(/留言/), "Hello");
    fireEvent.click(screen.getByRole("button", { name: /发送留言/i }));
    await waitFor(() => {
      expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument();
    });
  });

  it("copy button calls clipboard API", async () => {
    render(<Contact contact={resumeData.contact} />);
    const copyBtn = screen.getByRole("button", { name: /复制邮箱地址/i });
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(resumeData.contact.email);
    });
  });
});
