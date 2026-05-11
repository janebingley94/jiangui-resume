import { test, expect, devices } from "@playwright/test";

// Override to force mobile viewport for all tests here
test.use({ ...devices["Pixel 7"] });

test.describe("Mobile layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hamburger menu button is visible on mobile", async ({ page }) => {
    await expect(page.getByRole("button", { name: /打开菜单|关闭菜单/i })).toBeVisible();
  });

  test("desktop nav links are hidden on mobile", async ({ page }) => {
    // The <ul> with desktop links should not be visible
    const desktopNav = page.locator("header nav ul").first();
    await expect(desktopNav).toBeHidden();
  });

  test("hamburger opens and closes the mobile drawer", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "打开菜单" });
    await toggle.click();
    // Drawer should be visible with nav links
    await expect(page.getByRole("button", { name: "关闭菜单" })).toBeVisible();
    await expect(page.getByRole("button", { name: "关于" })).toBeVisible();
    // Close it
    await page.getByRole("button", { name: "关闭菜单" }).click();
    await expect(page.getByRole("button", { name: "打开菜单" })).toBeVisible();
  });

  test("clicking a nav link in the drawer closes the drawer", async ({ page }) => {
    await page.getByRole("button", { name: "打开菜单" }).click();
    await page.getByRole("button", { name: "关于" }).click();
    await page.waitForTimeout(400);
    // Drawer should be closed, hamburger icon visible
    await expect(page.getByRole("button", { name: "打开菜单" })).toBeVisible();
  });

  test("project cards stack in single column on mobile", async ({ page }) => {
    const cards = page.locator('[aria-label^="查看项目详情"]');
    const count = await cards.count();
    expect(count).toBe(4);
    // Verify they are vertically stacked (no side-by-side)
    const boxes = await Promise.all(Array.from({ length: count }, (_, i) => cards.nth(i).boundingBox()));
    const lefts = boxes.map((b) => b!.x);
    // All cards should start at the same (or very similar) x position on mobile
    const uniqueLefts = [...new Set(lefts.map((l) => Math.round(l / 10) * 10))];
    expect(uniqueLefts.length).toBe(1);
  });
});
