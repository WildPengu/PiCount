import type { ReducersMapObject } from 'redux';
import type { IModule } from 'redux-dynamic-modules';
import type { UsersAwareState } from '../../types/users';
import { usersReducer } from './reducer';

export const UsersModule: IModule<UsersAwareState> = {
  id: 'usersModule',
  reducerMap: {
    usersModule: usersReducer,
  } as ReducersMapObject<UsersAwareState>,
};
