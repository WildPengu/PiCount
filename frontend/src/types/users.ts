export interface User {
  _id: string;
  name: string;
  avatar: string;
  age: number;
}

export interface UsersState {
  activeUserId: string;
  users: any;
}

export interface UsersAwareState {
  usersModule: UsersState;
}

export interface InitializePayload {
  activeUserId: string;
  users: any;
}
