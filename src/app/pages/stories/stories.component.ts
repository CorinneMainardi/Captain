import { Component } from '@angular/core';
import { iStoria } from '../../interfaces/istoria';
import { iCapitolo } from '../../interfaces/icapitolo';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../servicespages/stories.service';
import { map } from 'rxjs';
import { iUser } from '../../interfaces/iuser';
import { AuthService } from '../../auth/auth.service';

import { UserService } from '../../services/user.service';
import { iAccessData } from '../../interfaces/iaccess-data';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss',
})
export class StoriesComponent {
  public array = [1];
  dotPosition = 'left';
  storia!: iStoria;
  favorite!: iStoria;

  capitoli: iCapitolo[] = [];
  id!: number;
  user!: iUser;

  constructor(
    private route: ActivatedRoute,
    private storiesSvc: StoriesService,
    private userSvc: UserService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.getThisUser();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadStoria(+id);
      }
    });
    this.autoLogout();
  }

  loadStoria(id: number) {
    this.storiesSvc.getStoriaById(id).subscribe((storia) => {
      this.storia = storia;
      this.capitoli = storia.capitoli;
      this.userWithFav();
    });
  }
  getThisUser() {
    this.authSvc.user$
      .pipe(
        map((user) => {
          if (user) {
            this.user = user;
            if (this.user.id) this.id = this.user.id;
          }
        })
      )
      .subscribe();
  }
  userWithFav() {
    if (this.user.id) {
      this.favorite = this.storia;
    }
  }
  addFavorites() {
    if (this.user.id)
      this.userSvc.addFavorite(this.user.id, this.favorite).subscribe();
  }

  autoLogout() {
    this.authSvc.authSubject$.subscribe((accessData: iAccessData | null) => {
      if (accessData) {
        const expDate = this.authSvc.jwtHelper.getTokenExpirationDate(
          accessData.accessToken
        );
        if (expDate) {
          this.authSvc.autoLogout(expDate);
        }
      }
    });
  }
}
