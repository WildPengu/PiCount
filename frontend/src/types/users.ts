export interface User {
  _id: string;
  name: string;
  avatar: string;
  age: number;
}

export interface UsersState {
  activeUser: string;
  users: any;
}

export interface UsersAwareState {
  usersModule: UsersState;
}

export interface InitializePayload {
  activeUser: string;
  users: any;
}
