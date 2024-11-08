import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { iStoria } from '../interfaces/istoria';
import { StoriesService } from '../services/stories.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  size: NzButtonSize = 'small';
  stories: Partial<iStoria[]> = [];
  storia!: iStoria;
  constructor(private storiesSvc: StoriesService) {}
  ngOnInit() {
    this.storiesSvc.getAllStories().subscribe((storia) => {
      this.stories = storia;
      if (this.stories[0]) this.storia = this.stories[0];
    });
  }
}
