import express, {
  Response as ExpressResponse,
  NextFunction,
  Request,
} from 'express';
import { ExpensesCategories } from '../models/expensesCategories';
const router = express.Router();

interface Response extends ExpressResponse {
  expensesCategories?: any; // Tutaj poprawić
}

// Get all expenses categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const expensesCategories = await ExpensesCategories.find({});
    res.json(expensesCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem collecting expenses categories' });
  }
});

// Get expense category
router.get('/:id', getExpensesCategory, (req: Request, res: Response) => {
  res.send(res.expensesCategories);
});

// Delete expense category
router.delete(
  '/:id',
  getExpensesCategory,
  async (req: Request, res: Response) => {
    try {
      await res.expensesCategories!.deleteOne();
      res.json({ message: 'Deleted expense category' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    const newCategory = new ExpensesCategories({
      name,
      color,
      image: 'faDollarSign',
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

async function getExpensesCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let expensesCategories;
  try {
    expensesCategories = await ExpensesCategories.findById(req.params.id);
    if (expensesCategories == null) {
      return res.status(404).json({ message: 'Cannot find expense category' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  res.expensesCategories = expensesCategories;
  next();
}

export default router;
