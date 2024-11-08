import { iCapitolo } from './icapitolo';

export interface iStoria {
  title: string;
  description: string;
  capitoli: iCapitolo[];
  id?: number;
  userId?: number; //autore
  genere: string;
  username?: string;
  img: string;
}
