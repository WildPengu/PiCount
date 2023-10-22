import { Document, Model, model, Schema } from 'mongoose';
interface Expense extends Document {
  date: Date;
  category: string;
  amount: number;
  desc: string;
}
interface IUser extends Document {
  name: string;
  avatar?: string;
  age?: number;
  expenses: Expense[];
}

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  age: Number,
  expenses: [],
});

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
