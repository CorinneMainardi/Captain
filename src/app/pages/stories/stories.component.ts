import { FavoritesService } from './../../servicespages/favorites.service';
import { Component } from '@angular/core';
import { iStoria } from '../../interfaces/istoria';
import { iCapitolo } from '../../interfaces/icapitolo';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../servicespages/stories.service';
import { map } from 'rxjs';
import { iUser } from '../../interfaces/iuser';
import { AuthService } from '../../auth/auth.service';
import { Ifavorite } from '../../interfaces/ifavorite';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss',
})
export class StoriesComponent {
  public array = [1];
  dotPosition = 'left';
  storia!: iStoria;
  fav!: Ifavorite;
  capitoli: iCapitolo[] = [];
  id!: number;

  user!: iUser;
  constructor(
    private route: ActivatedRoute,
    private storiesSvc: StoriesService,
    private favoritesSvc: FavoritesService,
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
  }

  loadStoria(id: number) {
    this.storiesSvc.getStoriaById(id).subscribe((storia) => {
      this.storia = storia;
      this.capitoli = storia.capitoli;
      this.addUserById();
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
  addUserById() {
    if (this.user.id) {
      this.fav = { ...this.storia, addedById: this.user.id } as Ifavorite;
    }
  }
  addFavorites() {
    this.favoritesSvc.addFavorite(this.fav).subscribe();
    console.log(this.fav);
  }
}
