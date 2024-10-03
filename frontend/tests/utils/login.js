import { URL_HOME, USER_NAME, USER_PASSWORD } from './constants';

export async function login(page) {
  await page.goto(URL_HOME);
  await page.getByTestId('login-link').click();
  await page.getByTestId('login-username').fill(USER_NAME);
  await page.getByTestId('login-password').fill(USER_PASSWORD);
  await page.getByTestId('login-button').click();

  await page.waitForTimeout(1500);

  const currentUrl = page.url();
  return currentUrl;
}
