import type { FSAAuto } from 'flux-standard-action';
import type { InitializePayload } from '../../types/users';

export enum UsersActionTypes {
  INITIALIZE = '[Users] INITIALIZE',
}

export type Initialize = FSAAuto<
  UsersActionTypes.INITIALIZE,
  InitializePayload
>;

export const initialize = (payload: InitializePayload): Initialize => ({
  type: UsersActionTypes.INITIALIZE,
  payload,
});

export type UserAction = Initialize;
