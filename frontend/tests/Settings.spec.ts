import { expect, test } from '@playwright/test';
import { APP_NAME, URL_HOME, USER_NAME } from './utils/constants';
import { login } from './utils/login';

test.describe('Language switcher tests', () => {
  const en = 'en';
  const ua = 'ua';
  const pl = 'pl';

  test('languages switcher in settings', async ({ page }) => {
    const textInEn = 'Choose Your Language';
    const textInPl = 'Wybierz Swój Język';
    const textInUa = 'Вибери мову застосунку';

    await login(page);

    await expect(page.getByTestId('username')).toHaveText(USER_NAME);

    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByRole('combobox').selectOption(en);
    await expect(page.getByTestId('choose-lang')).toHaveText(textInEn);

    await page.getByRole('combobox').selectOption(pl);
    await expect(page.getByTestId('choose-lang')).toHaveText(textInPl);

    await page.getByRole('combobox').selectOption(ua);
    await expect(page.getByTestId('choose-lang')).toHaveText(textInUa);

    await page.getByRole('link', { name: 'Вийти' }).click();

    await expect(page.getByTestId('username')).toHaveText(APP_NAME);
  });

  test('languages switcher in start page', async ({ page }) => {
    const text2InPl =
      'Hej! Czy zdarza ci się mieć trudności z śledzeniem swoich wydatków?';
    const text2InUa = 'Вітаю! Чи вважаєш, що вести облік своїх витрат важко?';
    const text2InEn =
      'Hey there! Do you ever find yourself struggling to keep track of your expenses?';

    await page.goto(URL_HOME);

    await page.getByRole('combobox').selectOption(pl);
    await expect(page.getByTestId('article1')).toHaveText(text2InPl);

    await page.getByRole('combobox').selectOption(ua);
    await expect(page.getByTestId('article1')).toHaveText(text2InUa);

    await page.getByRole('combobox').selectOption(en);
    await expect(page.getByTestId('article1')).toHaveText(text2InEn);
  });
});
