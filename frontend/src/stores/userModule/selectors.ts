import type { UsersAwareState } from '../../types/users';

const getUserModule = (state: UsersAwareState) => state.usersModule;

export const selectUsers = (state: UsersAwareState) =>
  getUserModule(state).users;

export const selectActiveUserId = (state: UsersAwareState) =>
  getUserModule(state).activeUserId;
