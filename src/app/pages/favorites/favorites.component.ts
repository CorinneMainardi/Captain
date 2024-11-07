import { Component } from '@angular/core';
import { iAccessData } from '../../interfaces/iaccess-data';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../servicespages/favorites.service';
import { iStoria } from '../../interfaces/istoria';
import { map } from 'rxjs';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favorites: iStoria[] = [];
  id!: number;
  user!: iUser;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private favoritesSvc: FavoritesService
  ) {}
  ngOnInit() {
    // this.autoLogout();
    this.authSvc.restoreUser();
    this.getAllFavorites();
    this.getThisUser();
    if (this.user.id) this.id = this.user.id;
  }
  getThisUser() {
    this.authSvc.user$
      .pipe(
        map((user) => {
          if (user) {
            this.user = user;
            console.log(this.user);
          }
        })
      )
      .subscribe();
  }
  getAllFavorites() {
    this.favoritesSvc.getAllFavorites(this.id).subscribe((favorites) => {
      this.favorites = favorites;
    });
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
}
