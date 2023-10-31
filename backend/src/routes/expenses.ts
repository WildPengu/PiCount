import express, { Request, Response } from 'express';
import { Expense, UserExpenses } from '../models/expense';
const mongoose = require('mongoose');

const router = express.Router();

// Get all user expenses
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userExpenses: any | null = await UserExpenses.findOne({
      userId: userId,
    });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const expensesArray: { date: string }[] = Array.from(
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

      const filteredExpenses: { [key: string]: Expense } = {};

      userExpenses.expenses.forEach((expense, key) => {
        if (expense.category === category) {
          filteredExpenses[key] = expense;
        }
      });

      res.json(filteredExpenses);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'There was a problem fetching data' });
    }
  }
);

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

    res.json(userExpenses);
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

        res.json({ message: 'Deleted expense' });
      } else {
        return res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;