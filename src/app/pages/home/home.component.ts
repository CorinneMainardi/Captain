import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iAccessData } from '../../interfaces/iaccess-data';
import { Router } from '@angular/router';
import { iStoria } from '../../interfaces/istoria';
import { StoriesService } from '../../servicespages/stories.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private storiesSvc: StoriesService
  ) {}
  public strategy = 'flip';
  public array = [1];
  size: NzButtonSize = 'small';
  stories: iStoria[] = [];
  ngOnInit() {
    this.storiesSvc.getAllStories().subscribe((storia) => {
      this.stories = storia;
      setTimeout(() => console.log(this.stories), 2000);
    });

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
