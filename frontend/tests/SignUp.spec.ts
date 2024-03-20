import { expect, test } from "@playwright/test";

test.describe("Sign Up tests", () => {
  test("SignUp with empty or empty data should display error messages", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/signUp");

    await page.getByRole("button", { name: "SignUp" }).click();

    //if website in english

    await expect(page.getByTestId("username-error")).toHaveText(
      "User name should have at least 4 characters*"
    );
    await expect(page.getByTestId("avatar-error")).toHaveText(
      "Please selecte Avatar*"
    );
    await expect(page.getByTestId("email-error")).toHaveText(
      "There is no valid email*"
    );
    await expect(page.getByTestId("password-error")).toHaveText(
      "Password should have at least 6 characters*"
    );

    //error message if confirm password is not the same

    await page.getByPlaceholder("Password", { exact: true }).fill("!23456");

    await page.getByPlaceholder("Confirm password").fill("123456");
    await page.getByRole("button", { name: "SignUp" }).click();
    await expect(page.getByTestId("confirm-password-error")).toHaveText(
      "Password should be the same*"
    );
  });

  test("Successful SignUp", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Create account" }).click();

    //enter data for new user

    await expect(page.getByTestId("welcome-message")).toHaveText(
      "Fill out the fields to create a new user:"
    );

    await page.getByPlaceholder("User name").fill("kasia");
    await page.getByPlaceholder("User age").fill("24");
    await page.getByRole("img", { name: "Avatar 8" }).click();
    await page.getByPlaceholder("User email").fill("kasia@gmail.com");
    await page.getByPlaceholder("Password", { exact: true }).fill("!23456");
    await page.getByPlaceholder("Confirm password").fill("!23456");

    //create new user

    await page.getByRole("button", { name: "SignUp" }).click();

    await page.waitForTimeout(3000);

    await expect(page.getByTestId("welcome-message")).toHaveText(
      "Welcome, new PiCounter!"
    );

    await page.getByTestId("link-to-login").click();

    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    expect(currentUrl).toEqual("http://localhost:5173/login");

    //login

    await page.getByPlaceholder("User name").fill("kasia");
    await page.getByPlaceholder("User password").fill("!23456");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("username")).toHaveText("kasia");
  });
});
