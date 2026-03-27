import { test, expect } from "@playwright/test"

test.describe("Portfolio – accessibility basics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("page has a main landmark", async ({ page }) => {
    await expect(page.getByRole("main")).toBeVisible()
  })

  test("page has a navigation landmark", async ({ page }) => {
    await expect(page.getByRole("navigation")).toBeAttached()
  })

  test("decorative grid background has aria-hidden", async ({ page }) => {
    const gridBg = page.locator('[aria-hidden="true"]').first()
    await expect(gridBg).toBeAttached()
  })

  test("colophon section has heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /credits/i })).toBeAttached()
  })

  test("hero section links are keyboard-focusable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    // Tab to first interactive element in hero
    await page.keyboard.press("Tab")
    const focused = page.locator(":focus")
    await expect(focused).toBeVisible()
  })
})
