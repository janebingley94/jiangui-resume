import { test, expect } from "@playwright/test";

const NAV_SECTIONS = [
  { label: "关于", id: "about" },
  { label: "技能", id: "skills" },
  { label: "经历", id: "experience" },
  { label: "项目", id: "projects" },
  { label: "教育", id: "education" },
  { label: "联系", id: "contact" },
];

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("nav bar is visible on load", async ({ page }) => {
    await expect(page.locator("header nav")).toBeVisible();
  });

  for (const { label, id } of NAV_SECTIONS) {
    test(`clicking '${label}' scrolls to #${id}`, async ({ page }) => {
      await page.getByRole("button", { name: label }).click();
      // Wait for smooth-scroll
      await page.waitForTimeout(600);
      const section = page.locator(`#${id}`);
      await expect(section).toBeInViewport({ ratio: 0.1 });
    });
  }

  test("hero CTA '查看项目' scrolls to #projects", async ({ page }) => {
    await page.getByRole("button", { name: "查看项目" }).click();
    await page.waitForTimeout(600);
    await expect(page.locator("#projects")).toBeInViewport({ ratio: 0.1 });
  });

  test("hero CTA '联系我' scrolls to #contact", async ({ page }) => {
    await page.getByRole("button", { name: "联系我" }).click();
    await page.waitForTimeout(600);
    await expect(page.locator("#contact")).toBeInViewport({ ratio: 0.1 });
  });
});
