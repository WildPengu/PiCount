import express, { Request, Response } from 'express';
import { Expense, UserExpenses } from '../models/expense';
const mongoose = require('mongoose');

const router = express.Router();

// Get all user expenses
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userExpenses = await UserExpenses.findOne({
      userId: userId,
    });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const expensesArray: Expense[] = Array.from(userExpenses.expenses.values());
    expensesArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    res.json(expensesArray);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'There was a problem fetching data' });
  }
});

router.get('/expensesByDay/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userExpenses = await UserExpenses.findOne({ userId: userId });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const groupedExpenses: Record<string, Expense[]> = groupExpensesByDate(
      userExpenses.expenses
    );

    const sortedGroupedExpenses: Record<string, Expense[]> =
      sortGroupedExpensesByDate(groupedExpenses);

    res.json(sortedGroupedExpenses);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'There was a problem fetching data' });
  }
});

// get expenses by category
router.get(
  '/:userId/expenses/:category',
  async (req: Request, res: Response) => {
    const { category, userId } = req.params;
    const userExpenses = await UserExpenses.findOne({ userId: userId });
    try {
      if (!userExpenses) {
        return res.status(404).json({ message: 'User expenses not found' });
      }

      const filteredExpenses: Record<string, Expense> = {};

      userExpenses.expenses.forEach((expense, key) => {
        if (expense.category === category) {
          filteredExpenses[key] = expense;
        }
      });

      const expensesArray: Expense[] = Array.from(
        userExpenses.expenses.values()
      );
      expensesArray.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      res.json(expensesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'There was a problem fetching data' });
    }
  }
);

router.get('/expensesByDateRange/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { startDate, endDate } = req.query;

  try {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const userExpenses = await UserExpenses.findOne({ userId: userId });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const expensesInDateRange = Array.from(userExpenses.expenses.values())
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

    const groupedExpenses: Record<string, Expense[]> = {};

    expensesInDateRange.forEach((expense) => {
      const dateKey = expense.date.toISOString().split('T')[0];
      if (!groupedExpenses[dateKey]) {
        groupedExpenses[dateKey] = [];
      }
      groupedExpenses[dateKey].push(expense);
    });

    res.json(groupedExpenses);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'There was a problem fetching data' });
  }
});

// Update expense
router.patch('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userExpenses = await UserExpenses.findOne({ userId: userId });

    if (!userExpenses) {
      return res.status(404).json({ message: 'User expenses not found' });
    }

    const newExpense: Expense = {
      id: new mongoose.Types.ObjectId(),
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      desc: req.body.desc,
    };

    userExpenses.expenses.set(newExpense.id, newExpense);
    await userExpenses.save();

    const groupedExpenses: Record<string, Expense[]> = groupExpensesByDate(
      userExpenses.expenses
    );

    const sortedGroupedExpenses: Record<string, Expense[]> =
      sortGroupedExpensesByDate(groupedExpenses);

    res.json(sortedGroupedExpenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

//Delete expense
router.delete(
  '/:userId/expenses/:expenseId',
  async (req: Request, res: Response) => {
    const { userId, expenseId } = req.params;

    try {
      const userExpenses = await UserExpenses.findOne({ userId });

      if (!userExpenses) {
        return res.status(404).json({ message: 'User expenses not found' });
      }

      if (userExpenses.expenses.has(expenseId)) {
        userExpenses.expenses.delete(expenseId);
        await userExpenses.save();

        const groupedExpenses: Record<string, Expense[]> = groupExpensesByDate(
          userExpenses.expenses
        );

        const sortedGroupedExpenses: Record<string, Expense[]> =
          sortGroupedExpensesByDate(groupedExpenses);

        res.json(sortedGroupedExpenses);
      } else {
        return res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

const groupExpensesByDate = (expenses: Map<string, Expense>) => {
  const groupedExpenses: Record<string, Expense[]> = {};

  expenses.forEach((expense: Expense) => {
    const dateKey = expense.date.toISOString().split('T')[0];
    if (!groupedExpenses[dateKey]) {
      groupedExpenses[dateKey] = [];
    }
    groupedExpenses[dateKey].push(expense);
  });

  return groupedExpenses;
};

const sortGroupedExpensesByDate = (
  groupedExpenses: Record<string, Expense[]>
) => {
  const sortedGroupedExpenses: Record<string, Expense[]> = {};
  Object.keys(groupedExpenses)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach((key) => {
      sortedGroupedExpenses[key] = groupedExpenses[key];
    });
  return sortedGroupedExpenses;
};

export default router;