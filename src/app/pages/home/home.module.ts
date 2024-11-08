import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  NzCarouselFlipStrategy,
  NzCarouselModule,
} from 'ng-zorro-antd/carousel';
import { SharedModule } from '../../shared-component/shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzCarouselModule,
    SharedModule,
    NzIconModule,
    NzCardModule,
  ],
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [{ name: 'flip', strategy: NzCarouselFlipStrategy }],
    },
  ],
})
export class HomeModule {}
