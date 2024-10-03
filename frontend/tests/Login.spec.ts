import { expect, test } from '@playwright/test';
import { APP_NAME, URL_HOME, USER_NAME } from './utils/constants';
import { login } from './utils/login';

test.describe('User login to PiCount', () => {
  test('successful login with correct data and logout', async ({ page }) => {
    await page.goto(URL_HOME);
    await page.getByRole('link', { name: 'Login' }).click();

    await login(page);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${URL_HOME}expenseList`);

    await expect(page.getByTestId('username')).toHaveText(USER_NAME);

    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.getByTestId('username')).toHaveText(APP_NAME);
  });

  test('unsuccessful login with incorrect data', async ({ page }) => {
    const errorMessage = 'Incorrect username or password.';

    await page.goto(`${URL_HOME}login`);

    await page.getByPlaceholder('User name').fill('agasia');
    await page.getByPlaceholder('User password').fill('12qwerty');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('login-error')).toHaveText(errorMessage);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${URL_HOME}login`);
  });

  test('unsuccessful login with empty data', async ({ page }) => {
    const errorMessage = 'Username or password are required.';

    await page.goto(`${URL_HOME}login`);

    await page.getByPlaceholder('User name').fill('');
    await page.getByPlaceholder('User password').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByTestId('login-error')).toHaveText(errorMessage);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(`${URL_HOME}login`);
  });
});
