import { test, expect } from "@playwright/test"

test.describe("Portfolio – core user journeys", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("page loads and has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/)
    await expect(page.locator("main")).toBeVisible()
  })

  test("hero section is visible with key content", async ({ page }) => {
    const hero = page.locator("#hero")
    await expect(hero).toBeVisible()
    await expect(page.getByText("Studies in Controlled Environments")).toBeVisible()
    await expect(page.getByText("We design systems that behave")).toBeVisible()
  })

  test("hero CTA links are present and point to correct targets", async ({ page }) => {
    const viewExperimentsLink = page.getByRole("link", { name: /view experiments/i })
    await expect(viewExperimentsLink).toBeVisible()
    await expect(viewExperimentsLink).toHaveAttribute("href", "#work")

    const latestSignalsLink = page.getByRole("link", { name: /latest signals/i })
    await expect(latestSignalsLink).toBeVisible()
    await expect(latestSignalsLink).toHaveAttribute("href", "#signals")
  })

  test("all page sections exist in the DOM", async ({ page }) => {
    for (const id of ["hero", "signals", "work", "principles", "colophon"]) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })

  test("colophon contact email link is correct", async ({ page }) => {
    const emailLink = page.getByRole("link", { name: "Email" })
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute("href", "mailto:hello@signal.studio")
  })

  test("version tag is present", async ({ page }) => {
    await expect(page.getByText(/v\.01/i)).toBeVisible()
  })
})
