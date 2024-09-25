import { test, expect } from "@playwright/test";

test.describe("User login to PiCount", () => {
  const urlHome = "http://localhost:5173/";
  const userName = "yarna";
  const userPassword = "!23456";
  const piCountName = "PiCount";

  test("successful login with correct data and logout", async ({ page }) => {
    await page.goto(urlHome);
    await page.getByRole("link", { name: "Login" }).click();

    await page.getByPlaceholder("User name").fill(userName);
    await page.getByPlaceholder("User password").fill(userPassword);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${urlHome}expenseList`);

    await expect(page.getByTestId("username")).toHaveText(userName);

    await page.getByRole("link", { name: "Logout" }).click();

    await expect(page.getByTestId("username")).toHaveText(piCountName);
  });

  test("unsuccessful login with incorrect data", async ({ page }) => {
    const errorMessage = "Incorrect username or password.";

    await page.goto(`${urlHome}login`);

    await page.getByPlaceholder("User name").fill("agasia");
    await page.getByPlaceholder("User password").fill("12qwerty");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("login-error")).toHaveText(errorMessage);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${urlHome}login`);
  });

  test("unsuccessful login with empty data", async ({ page }) => {
    const errorMessage = "Username or password are required.";

    await page.goto(`${urlHome}login`);

    await page.getByPlaceholder("User name").fill("");
    await page.getByPlaceholder("User password").fill("");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("login-error")).toHaveText(errorMessage);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${urlHome}login`);
  });
});
