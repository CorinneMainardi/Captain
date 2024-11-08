import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iStoria } from '../interfaces/istoria';
import { map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<iUser[]>(this.usersUrl);
  }
  getUserById(userId: number) {
    return this.http.get<iUser>(`${this.usersUrl}/${userId}`);
  }
  addFavorite(userId: number, newFavorite: iStoria) {
    return this.getUserById(userId).pipe(
      map((user) => {
        const favorites = user.favorites || [];

        if (favorites.find((element) => element.id === newFavorite.id)) {
          return favorites;
        } else {
          const updatedFavorites = [...favorites, newFavorite];

          return this.http.patch<iUser>(`${this.usersUrl}/${userId}`, {
            favorites: updatedFavorites,
          });
        }
      }),

      switchMap((patchObservable) => patchObservable)
    );
  }

  getAllFavorites(user: iUser) {
    return this.http.get<iUser[]>(this.usersUrl).pipe(
      map((users) => {
        const currentUser = users.find((u) => u.id === user.id);
        if (currentUser && currentUser.favorites) {
          return currentUser.favorites;
        } else {
          return [];
        }
      })
    );
  }
}
