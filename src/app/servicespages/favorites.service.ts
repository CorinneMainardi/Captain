import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { iStoria } from '../interfaces/istoria';
import { map } from 'rxjs';
import { Ifavorite } from '../interfaces/ifavorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesUrl: string = environment.favoritesUrl;

  constructor(private http: HttpClient) {}
  addFavorite(favorites: Ifavorite) {
    return this.http.post(this.favoritesUrl, favorites);
  }

  getAllFavorites(addedByUserId: number) {
    return this.http.get<Ifavorite[]>(this.favoritesUrl).pipe(
      map((favorites) => {
        // Filtra le storie aggiunte ai preferiti dall'utente loggato
        return favorites.filter((fav) => fav.addedById === addedByUserId);
      })
    );
  }
}
