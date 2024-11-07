export interface iUser {
  email: string;
  password: string;
  checkPassword: string;
  username: string;
  captcha: string;
  agree: boolean;
  id?: number;
}
