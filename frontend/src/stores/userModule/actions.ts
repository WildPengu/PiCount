import type { FSAAuto } from 'flux-standard-action';
import type { Expense, InitializePayload, UsersState } from '../../types/users';
import { ExpensesCategories } from '../../types/Expense';


export enum UsersActionTypes {
  INITIALIZE = '[Users] INITIALIZE',
  UPDATE_EXPENSES = '[Expenses] UPDATE_EXPENSES',
  UPDATE_EXPENSES_CATEGORIES = '[Expenses] UPDATE_EXPENSES_CATEGORIES',
  UPDATE_ACTIVE_USER_ID = "[Users] UPDATE_ACTIVE_USER_ID"
}

export type Initialize = FSAAuto<
  UsersActionTypes.INITIALIZE,
  InitializePayload
>;

export type UpdateExpenses = FSAAuto<
  UsersActionTypes.UPDATE_EXPENSES,
  Record<string, Expense[]>
>;

export type UpdateExpensesCategories = FSAAuto<
  UsersActionTypes.UPDATE_EXPENSES_CATEGORIES,
  ExpensesCategories[]
>;

export type UpdateActiveUserId = FSAAuto<
  UsersActionTypes.UPDATE_ACTIVE_USER_ID,
  string
>;

export const initialize = (payload: InitializePayload): Initialize => ({
  type: UsersActionTypes.INITIALIZE,
  payload,
});

export const updateExpenses = (
  payload: Record<string, Expense[]>
): UpdateExpenses => ({
  type: UsersActionTypes.UPDATE_EXPENSES,
  payload,
});

export const updateExpensesCategories = (
  payload: ExpensesCategories[]
): UpdateExpensesCategories => ({
  type: UsersActionTypes.UPDATE_EXPENSES_CATEGORIES,
  payload,
});

export const updateActiveUserId = (
  payload: string
): UpdateActiveUserId => ({
  type: UsersActionTypes.UPDATE_ACTIVE_USER_ID,
  payload,
});

export type UserAction = Initialize | UpdateExpenses | UpdateExpensesCategories | UpdateActiveUserId;
