import { Document, Model, model, Schema } from 'mongoose';

interface IExpensesCategory extends Document {
  name: string;
  image?: string;
  color: string;
}

interface IExpensesCategoryModel extends Model<IExpensesCategory> {}

const categorySchema = new Schema<IExpensesCategory, IExpensesCategoryModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
});

const ExpensesCategories = model<IExpensesCategory, IExpensesCategoryModel>(
  'ExpensesCategories',
  categorySchema
);
export { ExpensesCategories };
