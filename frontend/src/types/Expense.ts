export interface Expense {
  date: Date;
  category: string;
  amount: number;
  desc: string;
  _id?: string;
}

export interface ExpensesCategories {
  name: string;
  image: string;
  color: string;
  _id: string;
  __v: number;
}
