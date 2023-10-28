import type { UsersState } from '../../types/users';
import { UserAction, UsersActionTypes } from './actions';

const initialState: UsersState = {
  users: {},
  activeUserId: '',
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
    default:
      return state;
  }
};
