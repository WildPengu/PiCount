import { test, expect } from "@playwright/test";

test.describe("Language switcher tests", () => {
  test("languages switcher in settings", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.getByRole("link", { name: "Login" }).click();

    await page.getByPlaceholder("User name").fill("yarna");
    await page.getByPlaceholder("User password").fill("!23456");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("username")).toHaveText("yarna");

    await page.getByRole("link", { name: "Settings" }).click();

    await page.getByRole("combobox").selectOption("en");
    await expect(page.getByTestId("choose-lang")).toHaveText(
      "Choose Your Language"
    );

    await page.getByRole("combobox").selectOption("pl");
    await expect(page.getByTestId("choose-lang")).toHaveText(
      "Wybierz Swój Język"
    );

    await page.getByRole("combobox").selectOption("ua");
    await expect(page.getByTestId("choose-lang")).toHaveText(
      "Вибери мову застосунку"
    );

    await page.getByRole("link", { name: "Вийти" }).click();
    await expect(page.getByTestId("username")).toHaveText("PiCount");
  });

  test("languages switcher in start page", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.getByRole("combobox").selectOption("pl");
    await expect(page.getByTestId("article1")).toHaveText(
      "Hej! Czy zdarza ci się mieć trudności z śledzeniem swoich wydatków?"
    );

    await page.getByRole("combobox").selectOption("ua");
    await expect(page.getByTestId("article1")).toHaveText(
      "Вітаю! Чи вважаєш, що вести облік своїх витрат важко?"
    );

    await page.getByRole("combobox").selectOption("en");
    await expect(page.getByTestId("article1")).toHaveText(
      "Hey there! Do you ever find yourself struggling to keep track of your expenses?"
    );
  });
});
