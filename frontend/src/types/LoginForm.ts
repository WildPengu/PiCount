export interface LoginForm {
  id: number;
  name: string;
  password: string;
}

export interface ChangeUserPasswordForm {
  oldPass: string;
  newPass: string;
  confirmNewPass: string;
}
