import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iAccessData } from '../../interfaces/iaccess-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
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
