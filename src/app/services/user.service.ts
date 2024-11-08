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

  // Add this method to fetch a user by ID
  getUserById(userId: number) {
    return this.http.get<iUser>(`${this.usersUrl}/${userId}`);
  }
  addFavorite(userId: number, newFavorite: iStoria) {
    // Recuperiamo l'utente con i suoi favoriti attuali
    return this.getUserById(userId).pipe(
      map((user) => {
        // Assicuriamoci che la lista dei favoriti sia inizializzata
        const favorites = user.favorites || [];

        // Controlliamo se l'elemento esiste già nei preferiti
        if (favorites.find((element) => element.id === newFavorite.id)) {
          // Se esiste, ritorniamo l'array esistente di favoriti
          return favorites;
        } else {
          // Se non esiste, aggiungiamo il nuovo favorito
          const updatedFavorites = [...favorites, newFavorite];

          // Ritorniamo l'osservabile della PATCH che aggiorna solo i favorites
          return this.http.patch<iUser>(`${this.usersUrl}/${userId}`, {
            favorites: updatedFavorites,
          });
        }
      }),
      // Utilizziamo `switchMap` per ottenere l'aggiornamento
      switchMap((patchObservable) => patchObservable)
    );
  }

  getAllFavorites(user: iUser) {
    return this.http.get<iUser[]>(this.usersUrl).pipe(
      map((users) => {
        // Trova l'utente con l'id corrispondente e restituisci i suoi favoriti
        const currentUser = users.find((u) => u.id === user.id);
        if (currentUser && currentUser.favorites) {
          return currentUser.favorites;
        } else {
          return []; // Restituisce un array vuoto se non ci sono favoriti
        }
      })
    );
  }
}
