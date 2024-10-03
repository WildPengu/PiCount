import { expect, test } from '@playwright/test';

test.describe('Sign Up tests', () => {
  const urlHome = 'http://localhost:5173/';

  const newUsername = 'kasia';
  const userPassword = '!23456';
  const wrongPassword = '123456';
  const newUserAge = '24';
  const newUserEmail = 'kasia@gmail.com';

  test('SignUp with empty or incorrect data should display error messages', async ({
    page,
  }) => {
    const usernameError = 'User name should have at least 4 characters*';
    const avatarError = 'Please selecte Avatar*';
    const emailError = 'There is no valid email*';
    const passwordError = 'Password should have at least 6 characters*';
    const confirmPasswordError = 'Password should be the same*';

    await page.goto(`${urlHome}signUp`);
    await page.getByRole('button', { name: 'SignUp' }).click();

    //if website in english

    await expect(page.getByTestId('username-error')).toHaveText(usernameError);
    await expect(page.getByTestId('avatar-error')).toHaveText(avatarError);
    await expect(page.getByTestId('email-error')).toHaveText(emailError);
    await expect(page.getByTestId('password-error')).toHaveText(passwordError);

    //error message if confirm password is not the same

    await page.getByPlaceholder('Password', { exact: true }).fill(userPassword);
    await page.getByPlaceholder('Confirm password').fill(wrongPassword);
    await page.getByRole('button', { name: 'SignUp' }).click();
    await expect(page.getByTestId('confirm-password-error')).toHaveText(
      confirmPasswordError,
    );
  });

  test('Successful SignUp', async ({ page }) => {
    const headerMessage = 'Fill out the fields to create a new user:';
    const welcomeMessage = 'Welcome, new PiCounter!';

    await page.goto(urlHome);
    await page.getByRole('link', { name: 'Create account' }).click();

    //enter data for new user

    await expect(page.getByTestId('welcome-message')).toHaveText(headerMessage);

    await page.getByPlaceholder('User name').fill(newUsername);
    await page.getByPlaceholder('User age').fill(newUserAge);
    await page.getByRole('img', { name: 'Avatar 8' }).click();
    await page.getByPlaceholder('User email').fill(newUserEmail);

    await page.getByPlaceholder('Password', { exact: true }).fill(userPassword);
    await page.getByPlaceholder('Confirm password').fill(userPassword);

    //create new user

    await page.getByRole('button', { name: 'SignUp' }).click();

    await page.waitForTimeout(3000);

    await expect(page.getByTestId('welcome-message')).toHaveText(
      welcomeMessage,
    );

    await page.getByTestId('link-to-login').click();

    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${urlHome}login`);

    //login

    await page.getByPlaceholder('User name').fill(newUsername);
    await page.getByPlaceholder('User password').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('username')).toHaveText(newUsername);
  });
});
