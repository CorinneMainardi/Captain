import { FavoritesService } from './../../servicespages/favorites.service';
import { Component } from '@angular/core';
import { iStoria } from '../../interfaces/istoria';
import { iCapitolo } from '../../interfaces/icapitolo';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../servicespages/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss',
})
export class StoriesComponent {
  public array = [1];
  dotPosition = 'left';
  storia!: iStoria;
  capitoli: iCapitolo[] = [];
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private storiesSvc: StoriesService,
    private favoritesSvc: FavoritesService
  ) {}

  ngOnInit(): void {
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
    });
  }

  addFavorites() {
    this.favoritesSvc.addFavorite(this.storia).subscribe();
  }
}
