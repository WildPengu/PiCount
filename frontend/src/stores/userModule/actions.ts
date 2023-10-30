import type { FSAAuto } from 'flux-standard-action';
import type { Expense, InitializePayload } from '../../types/users';

export enum UsersActionTypes {
  INITIALIZE = '[Users] INITIALIZE',
  UPDATE_EXPENSES = '[Expenses] UPDATE_EXPENSES',
}

export type Initialize = FSAAuto<
  UsersActionTypes.INITIALIZE,
  InitializePayload
>;

export type UpdateExpenses = FSAAuto<
  UsersActionTypes.UPDATE_EXPENSES,
  Record<string, Expense>
>;

export const initialize = (payload: InitializePayload): Initialize => ({
  type: UsersActionTypes.INITIALIZE,
  payload,
});

export const updateExpenses = (
  payload: Record<string, Expense>
): UpdateExpenses => ({
  type: UsersActionTypes.UPDATE_EXPENSES,
  payload,
});

export type UserAction = Initialize | UpdateExpenses;
