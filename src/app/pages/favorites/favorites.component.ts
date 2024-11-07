import { Component } from '@angular/core';
import { iAccessData } from '../../interfaces/iaccess-data';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  constructor(private authSvc: AuthService, private router: Router) {}
  ngOnInit() {
    // this.autoLogout();
    this.authSvc.restoreUser();
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
