import { iCapitolo } from './icapitolo';

export interface Ifavorite {
  title: string;
  description: string;
  capitoli: iCapitolo[];
  id?: number;
  addedById: number;
  userId: number;
  genere: string;
  username?: string;
  img: string;
}
