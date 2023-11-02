import type { UsersState } from '../../types/users';
import { UserAction, UsersActionTypes } from './actions';

const initialState: UsersState = {
  users: {},
  activeUserId: '',
  expenses: [],
  expensesCategories: [],
};

export const usersReducer = (
  state: UsersState = initialState,
  action: UserAction
): UsersState => {
  switch (action.type) {
    case UsersActionTypes.INITIALIZE:
      return {
        ...state,
        activeUserId: action.payload.activeUserId,
        users: action.payload.users,
      };
    case UsersActionTypes.UPDATE_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case UsersActionTypes.UPDATE_EXPENSES_CATEGORIES:
      return {
        ...state,
        expensesCategories: action.payload,
      };
    default:
      return state;
  }
};
