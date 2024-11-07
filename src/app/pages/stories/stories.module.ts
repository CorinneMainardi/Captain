import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IconsProviderModule } from '../../icons-provider.module';

@NgModule({
  declarations: [StoriesComponent],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    NzCarouselModule,
    IconsProviderModule,
  ],
})
export class StoriesModule {}
