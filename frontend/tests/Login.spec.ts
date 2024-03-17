import { test, expect } from "@playwright/test";

test("login form test with correct data and logout", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Login" }).click();

  await page.getByPlaceholder("User name").click();
  await page.getByPlaceholder("User name").fill("yarna");
  await page.getByPlaceholder("User password").click();
  await page.getByPlaceholder("User password").fill("!23456");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(3000);

  const currentUrl = page.url();
  expect(currentUrl).toEqual("http://localhost:5173/expenseList");

  await page.getByRole("heading", { name: "yarna" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
  await page.getByRole("heading", { name: "PiCount", exact: true }).click();
});

test("login form test with incorrect data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("User name").click();
  await page.getByPlaceholder("User name").fill("agasia");
  await page.getByPlaceholder("User password").click();
  await page.getByPlaceholder("User password").fill("12qwerty");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("heading", { name: "Incorrect username or" }).click();

  await page.waitForTimeout(3000);

  const currentUrl = page.url();
  expect(currentUrl).toEqual("http://localhost:5173/login");
});
