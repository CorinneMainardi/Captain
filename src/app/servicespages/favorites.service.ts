import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { iStoria } from '../interfaces/istoria';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesUrl: string = environment.favoritesUrl;

  constructor(private http: HttpClient) {}
  addFavorite(favorites: iStoria) {
    return this.http.post(this.favoritesUrl, favorites);
  }

  getAllFavorites(id: number) {
    return this.http.get<iStoria[]>(this.favoritesUrl).pipe(
      map((favorite) => {
        return favorite.filter((fav) => {
          if (fav.userId === id) {
            return true;
          } else {
            return false;
          }
        });
      })
    );
  }
}
