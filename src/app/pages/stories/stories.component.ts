import { Component } from '@angular/core';
import { iStoria } from '../../interfaces/istoria';
import { iCapitolo } from '../../interfaces/icapitolo';

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
  // costructor(private )
}
