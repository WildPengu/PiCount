import { Document, Model, model, Schema } from 'mongoose';
interface IUser extends Document {
  name: string;
  avatar?: string;
  age?: number;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
});

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
