import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("returns HTTP 200", async ({ page }) => {
    const response = await page.request.get("/");
    expect(response.status()).toBe(200);
  });

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Wang Jiangui/i);
  });

  test("renders candidate name in hero", async ({ page }) => {
    await expect(page.getByText("王建贵")).toBeVisible();
  });

  test("renders all main sections", async ({ page }) => {
    for (const id of ["about", "skills", "experience", "projects", "education", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("has JSON-LD Person schema in head", async ({ page }) => {
    const jsonLd = await page.evaluate(() => {
      const el = document.querySelector('script[type="application/ld+json"]');
      return el ? JSON.parse(el.textContent ?? "{}") : null;
    });
    expect(jsonLd).not.toBeNull();
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toContain("Wang Jiangui");
  });

  test("navbar is sticky and visible after scroll", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);
    await expect(page.locator("header")).toBeVisible();
  });
});
