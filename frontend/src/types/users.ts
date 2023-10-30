export interface User {
  _id: string;
  name: string;
  avatar: string;
  age: number;
}

export interface Expense {
  date: Date;
  category: string;
  amount: number;
  desc: string;
}

export interface UsersState {
  activeUserId: string;
  users: any;
  expenses: Record<string, Expense>;
}

export interface UsersAwareState {
  usersModule: UsersState;
}

export interface InitializePayload {
  activeUserId: string;
  users: any;
}

export interface Expense {
  date: Date;
  category: string;
  amount: number;
  desc: string;
}
