import { StoriesService } from './../../servicespages/stories.service';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iAccessData } from '../../interfaces/iaccess-data';
import { iUser } from '../../interfaces/iuser';
import { iStoria } from '../../interfaces/istoria';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  user!: iAccessData | null;
  stories: iStoria[] = [];
  isShow$ = new BehaviorSubject<boolean>(true);

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private StoriesSvc: StoriesService
  ) {}
  ngOnInit() {
    // this.autoLogout();
    this.authSvc.restoreUser();

    this.authSvc.authSubject$.subscribe((user) => (this.user = user));

    if (this.user?.user.id)
      this.StoriesSvc.getAllStories().subscribe((story) => {
        story.filter((storia) => {
          if (storia.userId === this.user?.user.id) {
            this.stories.push(storia);
          }
        });
      });
  }
  toggleShow(): void {
    this.isShow$.next(!this.isShow$.getValue());
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
