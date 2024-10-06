import { URL_HOME } from './constants';

export async function login(page, username, password) {
  await page.goto(URL_HOME);
  await page.getByTestId('login-link').click();
  await page.getByTestId('login-username').fill(username);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-button').click();

  await page.waitForTimeout(1500);
}
