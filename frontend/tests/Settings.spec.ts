import { test, expect } from "@playwright/test";

test.describe("Language switcher", () => {
  test("languages switcher in settings", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("User name").click();
    await page.getByPlaceholder("User name").fill("yarna");
    await page.getByPlaceholder("User password").click();
    await page.getByPlaceholder("User password").fill("!23456");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("link", { name: "Settings" }).click();
    await page.getByRole("heading", { name: "Choose Your Language" }).click();
    await page.getByRole("combobox").selectOption("pl");
    await page.getByRole("heading", { name: "Wybierz Swój Język" }).click();
    await page.getByRole("combobox").selectOption("ua");
    await page.getByRole("heading", { name: "Вибери мову застосунку" }).click();
    await page.getByRole("combobox").selectOption("en");
    await page.getByRole("link", { name: "Logout" }).click();
  });

  test("languages switcher in start page", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("combobox").selectOption("pl");
    await page.getByText("Hej! Czy zdarza ci się mieć").click();
    await page.getByRole("combobox").selectOption("ua");
    await page
      .getByText("Вітаю! Чи вважаєш, що вести облік своїх витрат важко?")
      .click();
    await page.getByRole("combobox").selectOption("en");
    await page.getByText("Hey there! Do you ever find").click();
  });
});
