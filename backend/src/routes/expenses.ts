import express, { Request, Response } from 'express';
import { Expense, UserExpenses } from '../models/expense';
import { ExpensesCategories } from '../models/expensesCategories';
const mongoose = require('mongoose');

const router = express.Router();

interface Category {
  category: string;
  value: number;
  color?: string;
  image?: string;
}

interface Diagrams {
  totalAmount: number;
  categories: Category[];
}

// Get all user expenses
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  let { page, limit } = req.query;

  const pageNumber = page ? parseInt(page as string, 10) : undefined;
  const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

  try {
    const userExpenses = await UserExpenses.findOne({ userId: userId });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const expensesArray: Expense[] = Array.from(userExpenses.expenses.values());
    expensesArray.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    let paginatedExpenses = expensesArray;

    if (pageNumber && limitNumber) {
      const startIndex = (pageNumber - 1) * limitNumber;
      const endIndex = pageNumber * limitNumber;
      paginatedExpenses = expensesArray.slice(startIndex, endIndex);
    }

    res.json(paginatedExpenses);
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

router.get('/expensesByDate/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { startDate, endDate } = req.query;

  try {
    const start = startDate ? new Date(startDate as string) : new Date(0);
    const end = endDate ? new Date(endDate as string) : new Date();

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

router.get('/expensesByCategory/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { startDate, endDate, category } = req.query;

  try {
    const start = startDate ? new Date(startDate as string) : new Date(0);
    const end = endDate ? new Date(endDate as string) : new Date();

    const userExpenses = await UserExpenses.findOne({ userId: userId });

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const groupedExpenses: Record<string, Expense[]> = {};

    userExpenses.expenses.forEach((expense: Expense) => {
      const categoryKey = expense.category;
      if (expense.date >= start && expense.date <= end) {
        if (!groupedExpenses[categoryKey]) {
          groupedExpenses[categoryKey] = [];
        }
        groupedExpenses[categoryKey].push(expense);
      }
    });

    if (category === 'All' || !category) {
      res.json(groupedExpenses);
    } else {
      const response = {
        [category as string]: groupedExpenses[category as string] || [],
      };
      res.json(response);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'There was a problem fetching data' });
  }
});

router.get('/diagrams/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { startDate, endDate } = req.query;
  const diagrams: Diagrams = {
    totalAmount: 0,
    categories: [],
  };

  try {
    const start = startDate ? new Date(startDate as string) : new Date(0);
    const end = endDate ? new Date(endDate as string) : new Date();

    const userExpenses = await UserExpenses.findOne({ userId: userId });
    const expensesCategories = await ExpensesCategories.find({});

    if (!userExpenses) {
      return res.status(404).json({ message: 'Data not found' });
    }

    const groupedExpenses: Record<string, number> = {};

    userExpenses.expenses.forEach((expense: Expense) => {
      if (expense.date >= start && expense.date <= end) {
        const categoryKey = expense.category;

        if (!groupedExpenses[categoryKey]) {
          groupedExpenses[categoryKey] = 0;
        }

        groupedExpenses[categoryKey] += expense.amount;
      }
    });

    const resultArray = Object.entries(groupedExpenses).map(
      ([category, value]) => {
        const categoryDetails = expensesCategories.find(
          (cat) => cat.name === category
        );
        diagrams.totalAmount += value;
        if (categoryDetails) {
          return {
            category,
            value,
            color: categoryDetails.color,
            image: categoryDetails.image,
          };
        }

        return {
          category,
          value,
        };
      }
    );

    diagrams.categories = resultArray;

    res.json(diagrams);
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
      sortedGroupedExpenses[key] = groupedExpenses[key].reverse();
    });
  return sortedGroupedExpenses;
};

export default router;