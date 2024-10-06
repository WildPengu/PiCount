import { Expense, ExpensesCategories } from './Expense';

export interface User {
  _id: string;
  name: string;
  avatar: string;
  age: number;
  password: string;
}

export interface UsersState {
  activeUserId: string;
  users: Record<string, User>;
  expenses: Record<string, Expense[]>;
  expensesCategories: ExpensesCategories[];
}

export interface UsersAwareState {
  usersModule: UsersState;
}

export interface InitializePayload {
  activeUserId: string;
  users: Record<string, User>;
}

export type { Expense };
