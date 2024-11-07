import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [StoriesComponent],
  imports: [CommonModule, StoriesRoutingModule, NzCarouselModule],
})
export class StoriesModule {}
