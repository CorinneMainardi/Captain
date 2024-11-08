import { iStoria } from './istoria';

export interface iUser {
  email: string;
  password: string;
  username: string;
  captcha: string;
  agree: boolean;
  id?: number;
  favorites: iStoria[];
}
