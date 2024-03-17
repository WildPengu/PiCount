import { test } from "@playwright/test";

test("SignUp with empty or empty data should display error messages", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/signUp");

  await page.getByRole("button", { name: "SignUp" }).click();

  await page.getByText("User name should have at").click();
  await page.getByText("Please selecte Avatar*").click();
  await page.getByText("There is no valid email*").click();
  await page.getByText("Password should have at least").click();

  //error message if confirm password is not the same

  await page.getByPlaceholder("Password", { exact: true }).click();
  await page.getByPlaceholder("Password", { exact: true }).fill("!23456");
  await page.getByPlaceholder("Confirm password").click();
  await page.getByPlaceholder("Confirm password").fill("123456");
  await page.getByRole("button", { name: "SignUp" }).click();
  await page.getByText("Password should be the same*").click();
});

test("Successful SignUp", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Create account" }).click();

  //enter data for new user

  await page
    .getByRole("heading", { name: "Fill out the fields to create" })
    .click();
  await page.getByPlaceholder("User name").click();
  await page.getByPlaceholder("User name").fill("kasia");
  await page.getByPlaceholder("User age").click();
  await page.getByPlaceholder("User age").fill("24");
  await page.getByRole("img", { name: "Avatar 8" }).click();
  await page.getByPlaceholder("User email").click();
  await page.getByPlaceholder("User email").fill("kasia@gmail.com");
  await page.getByPlaceholder("Password", { exact: true }).click();
  await page.getByPlaceholder("Password", { exact: true }).fill("!23456");
  await page.getByPlaceholder("Confirm password").click();
  await page.getByPlaceholder("Confirm password").fill("!23456");

  //create new user

  await page.getByRole("button", { name: "SignUp" }).click();

  await page.waitForTimeout(3000);

  await page.getByRole("heading", { name: "Welcome, new PiCounter!" }).click();
  await page.getByRole("link", { name: "Go to login" }).click();

  //login

  await page.getByPlaceholder("User name").click();
  await page.getByPlaceholder("User name").fill("kasia");
  await page.getByPlaceholder("User password").click();
  await page.getByPlaceholder("User password").fill("!23456");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("heading", { name: "kasia" }).click();
});
