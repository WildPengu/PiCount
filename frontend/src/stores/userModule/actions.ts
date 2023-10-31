import type { FSAAuto } from 'flux-standard-action';
import type { Expense, InitializePayload } from '../../types/users';
import { ExpensesCategories } from '../../types/Expense';

export enum UsersActionTypes {
  INITIALIZE = '[Users] INITIALIZE',
  UPDATE_EXPENSES = '[Expenses] UPDATE_EXPENSES',
  UPDATE_EXPENSESCATEGORIES = '[ExpensesCategories] UPDATE_EXPENSES',
}

export type Initialize = FSAAuto<
  UsersActionTypes.INITIALIZE,
  InitializePayload
>;

export type UpdateExpenses = FSAAuto<
  UsersActionTypes.UPDATE_EXPENSES,
  Expense[]
>;

export type UpdateExpensesCategories = FSAAuto<
  UsersActionTypes.UPDATE_EXPENSESCATEGORIES,
  ExpensesCategories[]
>;

export const initialize = (payload: InitializePayload): Initialize => ({
  type: UsersActionTypes.INITIALIZE,
  payload,
});

export const updateExpenses = (
  payload: Expense[]
): UpdateExpenses => ({
  type: UsersActionTypes.UPDATE_EXPENSES,
  payload,
});

export const updateExpensesCategories = (
  payload: ExpensesCategories[]
): UpdateExpensesCategories => ({
  type: UsersActionTypes.UPDATE_EXPENSESCATEGORIES,
  payload,
});

export type UserAction = Initialize | UpdateExpenses | UpdateExpensesCategories;
