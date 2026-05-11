import { test, expect } from "@playwright/test";

test.describe("Projects section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#projects");
    await page.waitForTimeout(400);
  });

  test("renders four project cards", async ({ page }) => {
    const cards = page.locator('[aria-label^="查看项目详情"]');
    await expect(cards).toHaveCount(4);
  });

  test("clicking a project card opens the modal", async ({ page }) => {
    const firstCard = page.locator('[aria-label^="查看项目详情"]').first();
    await firstCard.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test("modal contains key sections", async ({ page }) => {
    await page.locator('[aria-label^="查看项目详情"]').first().click();
    const modal = page.locator('[role="dialog"]');
    await expect(modal.getByText("核心成果")).toBeVisible();
    await expect(modal.getByText("技术栈")).toBeVisible();
  });

  test("modal closes when close button is clicked", async ({ page }) => {
    await page.locator('[aria-label^="查看项目详情"]').first().click();
    await page.getByRole("button", { name: "关闭" }).click();
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test("modal closes when backdrop is clicked", async ({ page }) => {
    await page.locator('[aria-label^="查看项目详情"]').first().click();
    // Click the backdrop (the outer fixed overlay)
    await page.mouse.click(10, 10);
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
