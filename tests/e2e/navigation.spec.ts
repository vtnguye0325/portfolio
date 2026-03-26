import { test, expect } from "@playwright/test"

test.describe("Portfolio – navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("side nav is visible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const nav = page.locator("nav")
    await expect(nav).toBeVisible()
  })

  test("side nav contains all five section buttons", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const nav = page.locator("nav")
    const buttons = nav.getByRole("button")
    await expect(buttons).toHaveCount(5)
  })

  test("side nav is hidden on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    // The nav has 'hidden md:flex' — it's in the DOM but not displayed
    const nav = page.locator("nav")
    await expect(nav).toBeHidden()
  })

  test("clicking View Experiments scrolls to work section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.getByRole("link", { name: /view experiments/i }).click()
    // After clicking the anchor, the URL hash should update
    await expect(page).toHaveURL(/#work/)
  })
})
