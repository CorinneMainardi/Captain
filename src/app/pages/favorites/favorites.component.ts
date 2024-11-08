import { Component } from '@angular/core';
import { iAccessData } from '../../interfaces/iaccess-data';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

import { iStoria } from '../../interfaces/istoria';
import { map } from 'rxjs';
import { iUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  // ho provato a debuggare perché mi fa 2 chiamate ma non trovo l'errore
  favorites: iStoria[] = [];
  id!: number;
  user!: iUser;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private userSvc: UserService
  ) {}
  ngOnInit() {
    // this.autoLogout();
    this.authSvc.restoreUser();

    this.getThisUser().subscribe(() => {
      this.getAllFavorites();
    });
  }
  getThisUser() {
    return this.authSvc.user$.pipe(
      map((user) => {
        if (user) {
          this.user = user;
          if (this.user.id) {
            this.id = this.user.id;
          }
        }
      })
    );
  }

  getAllFavorites() {
    this.userSvc.getAllFavorites(this.user).subscribe((favorites) => {
      if (favorites && favorites.length > 0) {
        this.favorites = favorites;
        console.log('Questi sono i tuoi favoriti:', this.favorites);
      } else {
        this.favorites = [];
        console.log('Nessun favorito trovato per questo utente.');
      }
    });
  }
}
// autoLogout() {
//   this.authSvc.authSubject$.subscribe((accessData: iAccessData | null) => {
//     if (accessData) {
//       const expDate = this.authSvc.jwtHelper.getTokenExpirationDate(
//         accessData.accessToken
//       );
//       if (expDate) {
//         this.authSvc.autoLogout(expDate);
//         this.router.navigate(['/']);
//       }
//     }
//   });
// }
