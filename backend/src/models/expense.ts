import { Document, Model, model, Schema } from 'mongoose';

interface IExpense extends Document {
  remove(): unknown;
  date: Date;
  category: string;
  amount: number;
  desc: string;
}

interface IUserExpenses extends Document {
  expenses: IExpense[];
  userId: string;
}

const expenseSchema = new Schema<IExpense, Model<IExpense>>({
  date: Date,
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
    required: true,
    unique: false,
  },
  _id: Schema.Types.ObjectId,
});

const userExpensesSchema = new Schema<IUserExpenses, Model<IUserExpenses>>({
  expenses: [expenseSchema],
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
  expenseSchema,
  IExpense,
  IUserExpenses,
  UserExpenses,
};

