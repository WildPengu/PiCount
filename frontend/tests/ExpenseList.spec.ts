import { test, expect } from '@playwright/test';

//all tests in english app version

test.describe('Expense list tests', () => {
  const urlExpense = 'http://localhost:5173/expenseList';

  test('successful adding new expense', async ({ page }) => {
    await page.goto(urlExpense);

    await page.getByTestId('add-expense-btn').click();

    await expect(page.getByTestId('add-expense-h2')).toHaveText(
      'Add New Expense',
    );

    await page.getByLabel('Select category').selectOption('Transport');
    await page.getByPlaceholder('Write sth...').fill('washing and clean car');
    await page.getByPlaceholder('Amount').fill('16');
    await page.getByRole('button', { name: 'Add expense' }).click();
    await page.getByRole('heading', { name: 'TODAY' }).click();
    await page.getByText('Transport').first().click();
    await page.getByText('fuel').click();
    await page.getByText('- 200 ZŁ').first().click();
  });
});
