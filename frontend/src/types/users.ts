import { Expense, ExpensesCategories } from "./Expense";

export interface User {
  _id: string;
  name: string;
  avatar: string;
  age: number;
}

export interface UsersState {
  activeUserId: string;
  users: any;
  expenses: Record<string, Expense[]>;
  expensesCategories: ExpensesCategories[];
}

export interface UsersAwareState {
  usersModule: UsersState;
}

export interface InitializePayload {
  activeUserId: string;
  users: any;
}

export type { Expense };
