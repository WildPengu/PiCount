export interface Expense {
    date: Date;
    category: string;
    amount: number;
    desc: string;
    _id?: string;
};

export interface ExpensesCategories {
    [x: string]: any;
    name: string;
    image: string;
    color: string;
    _id: string;
    __v: number;
};