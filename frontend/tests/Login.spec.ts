import { test, expect } from "@playwright/test";

test("login form test with correct data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="username"]', "yarna");
  await page.fill('input[name="password"]', "!23456");

  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);

  const currentUrl = page.url();
  expect(currentUrl).toEqual("http://localhost:5173/expenseList");
});

test("login form test with incorrect data", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[name="username"]', "bulbazavr");
  await page.fill('input[name="password"]', "!23456");

  await page.click('button[type="submit"]');

  const errorMessageSelector = "form h2";
  await page.waitForSelector(errorMessageSelector);

  const errorMessage = await page.textContent(errorMessageSelector);
  expect(errorMessage).toContain("Incorrect username or password.");

  await page.waitForTimeout(3000);

  const currentUrl = page.url();
  expect(currentUrl).toEqual("http://localhost:5173/login");
});
