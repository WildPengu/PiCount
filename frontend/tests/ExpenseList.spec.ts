import { expect, test } from '@playwright/test';
import { URL_EXPENSE } from './utils/constants';
import { login } from './utils/login';

test.describe('Expense list tests', () => {
  test('successful adding new expense', async ({ page }) => {
    await login(page);

    await page.waitForTimeout(1500);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(URL_EXPENSE);

    await page.getByTestId('add-expense-btn').click();

    await expect(page.getByTestId('add-expense-h2')).toHaveText(
      'Add New Expense'
    );

    await page.locator('#typeOfExpense').selectOption({ value: 'Transport' });
    await page.locator('#desc').fill('washing and cleaning the car');
    await page.locator('#amount').fill('16');
    await page.getByTestId('add-expense-submit').click();
  });
});
