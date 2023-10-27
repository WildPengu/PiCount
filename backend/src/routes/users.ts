import express, {
  Response as ExpressResponse,
  NextFunction,
  Request,
} from 'express';
import { UserExpenses } from '../models/expense';
import User from '../models/user';
const router = express.Router();

interface Response extends ExpressResponse {
  user?: any; // Tutaj poprawić
}

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    let users = await User.find({});

    const usersObject = users.reduce((acc: any, user) => {
      // poprawic any
      acc[user._id.toString()] = user;
      return acc;
    }, {});

    res.json(usersObject);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Wystąpił błąd podczas pobierania użytkowników' });
  }
});

// Get user
router.get('/:id', getUser, (req: Request, res: Response) => {
  res.send(res.user!.name);
});

// Add user
router.post('/', async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    password: req.body.password,
    email: req.body.email,
  });

  const expenses = new UserExpenses({
    userId: user._id.toString(),
    expenses: {},
  });

  try {
    const newUser = await user.save();
    const newExpenses = await expenses.save();

    res.status(201).json({
      newUser,
      newExpenses,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.patch('/:id', getUser, async (req: Request, res: Response) => {
  if (req.body.name !== null) {
    res.user!.name = req.body.name;
  }
  try {
    const updatedUser = await res.user!.save();
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', getUser, async (req: Request, res: Response) => {
  try {
    await res.user!.deleteOne();
    res.json({ message: 'Deleted user' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

async function getUser(req: Request, res: Response, next: NextFunction) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

export default router;
