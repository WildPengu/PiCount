import { test, expect } from "@playwright/test";

test.describe("User login to PiCount", () => {
  test("successful login with correct data and logout", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Login" }).click();

    await page.getByPlaceholder("User name").fill("yarna");
    await page.getByPlaceholder("User password").fill("!23456");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    expect(currentUrl).toEqual("http://localhost:5173/expenseList");

    await expect(page.getByTestId("username")).toHaveText("yarna");

    await page.getByRole("link", { name: "Logout" }).click();

    await expect(page.getByTestId("username")).toHaveText("PiCount");
  });

  test("unsuccessful login with incorrect data", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByPlaceholder("User name").fill("agasia");
    await page.getByPlaceholder("User password").fill("12qwerty");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("login-error")).toHaveText(
      "Incorrect username or password."
    );

    const currentUrl = page.url();
    expect(currentUrl).toEqual("http://localhost:5173/login");
  });

  test("unsuccessful login with empty data", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByPlaceholder("User name").fill("");
    await page.getByPlaceholder("User password").fill("");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("login-error")).toHaveText(
      "Username or password are required."
    );

    const currentUrl = page.url();
    expect(currentUrl).toEqual("http://localhost:5173/login");
  });
});
