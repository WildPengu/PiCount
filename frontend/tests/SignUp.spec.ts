import { expect, test } from '@playwright/test';
import { URL_HOME } from './utils/constants';
import { login } from './utils/login';

test.describe('Sign Up tests', () => {
  const userPassword = '!23456';
  const wrongPassword = '123456';
  const newUserAge = '24';
  const newUsername = `user_${Date.now()}`;
  const newUserEmail = `user_${Date.now()}@gmail.com`;

  test('SignUp with empty or incorrect data should display error messages', async ({
    page,
  }) => {
    const usernameError = 'User name should have at least 4 characters*';
    const avatarError = 'Please selecte Avatar*';
    const emailError = 'There is no valid email*';
    const passwordError = 'Password should have at least 6 characters*';
    const confirmPasswordError = 'Password should be the same*';

    await page.goto(`${URL_HOME}signUp`);
    await page.getByTestId('sign-up-submit').click();

    //if website in english

    await expect(page.getByTestId('username-error')).toHaveText(usernameError);
    await expect(page.getByTestId('avatar-error')).toHaveText(avatarError);
    await expect(page.getByTestId('email-error')).toHaveText(emailError);
    await expect(page.getByTestId('password-error')).toHaveText(passwordError);

    //error message if confirm password is not the same

    await page.getByTestId('sign-up-password').fill(userPassword);
    await page.getByTestId('sign-up-password-confirm').fill(wrongPassword);
    await page.getByTestId('sign-up-submit').click();
    await expect(page.getByTestId('confirm-password-error')).toHaveText(
      confirmPasswordError,
    );
  });

  test('Successful SignUp', async ({ page }) => {
    const headerMessage = 'Fill out the fields to create a new user:';
    const welcomeMessage = 'Welcome, new PiCounter!';

    await page.goto(URL_HOME);
    await page.getByRole('link', { name: 'Create account' }).click();

    //enter data for new user

    await expect(page.getByTestId('welcome-message')).toHaveText(headerMessage);

    await page.getByTestId('sign-up-username').fill(newUsername);
    await page.getByTestId('sign-up-age').fill(newUserAge);
    await page.getByRole('img', { name: 'Avatar 8' }).click();
    await page.getByTestId('sign-up-email').fill(newUserEmail);

    await page.getByTestId('sign-up-password').fill(userPassword);
    await page.getByTestId('sign-up-password-confirm').fill(userPassword);

    //create new user

    await page.getByTestId('sign-up-submit').click();

    await page.waitForTimeout(3000);

    await expect(page.getByTestId('welcome-message')).toHaveText(
      welcomeMessage,
    );

    await page.getByTestId('link-to-login').click();

    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${URL_HOME}login`);

    //login

    await login(page, newUsername, userPassword);

    await expect(page.getByTestId('username')).toHaveText(newUsername);
  });
});
