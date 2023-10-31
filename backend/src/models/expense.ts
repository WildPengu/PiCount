import { Document, Model, model, Schema } from 'mongoose';

interface Expense {
  date: Date;
  category: string;
  amount: number;
  desc: string;
  id: string;
}

interface IUserExpenses extends Document {
  expenses: Map<string, Expense>;
  userId: string;
}

const expenseSchema = new Schema<Expense, Model<Expense>>({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
    unique: false,
  },
  desc: {
    type: String,
    unique: false,
  },
});

const userExpensesSchema = new Schema<IUserExpenses, Model<IUserExpenses>>({
  expenses: {
    type: Map,
    of: expenseSchema,
  },
  userId: String,
});

const UserExpenses = model<IUserExpenses, Model<IUserExpenses>>(
  'expenses',
  userExpensesSchema
);

function createUserExpensesModel(id: string) {
  const userExpensesSchema = new Schema<IUserExpenses, Model<IUserExpenses>>({
    [id]: [expenseSchema],
    expenses: [],
  });

  return model<IUserExpenses, Model<IUserExpenses>>(
    'expenses',
    userExpensesSchema
  );
}

export {
  createUserExpensesModel,
  Expense,
  expenseSchema,
  IUserExpenses,
  UserExpenses,
};

