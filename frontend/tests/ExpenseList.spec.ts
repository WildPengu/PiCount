import { expect, test } from '@playwright/test';

//all tests in english app version

test.describe('Expense list tests', () => {
  const urlHome = 'http://localhost:5173/';
  const urlExpense = 'http://localhost:5173/expenseList';
  const userName = 'yarna';
  const userPassword = '!23456';
  test('successful adding new expense', async ({ page }) => {
    await page.goto(urlHome);
    await page.getByTestId('login-link').click();
    await page.getByTestId('login-username').fill(userName);
    await page.getByTestId('login-password').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.waitForTimeout(1500);

    const currentUrl = page.url();
    expect(currentUrl).toEqual(urlExpense);

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
