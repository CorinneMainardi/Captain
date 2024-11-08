import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { iStoria } from '../interfaces/istoria';
import { StoriesService } from '../servicespages/stories.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  size: NzButtonSize = 'small';
  stories: Partial<iStoria[]> = [];
  constructor(private storiesSvc: StoriesService) {}
  ngOnInit() {
    this.storiesSvc.getAllStories().subscribe((storia) => {
      this.stories = storia;
      setTimeout(() => console.log(this.stories), 2000);
    });
  }
}