import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { iStoria } from '../../interfaces/istoria';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  declarations: [SharedComponent],
  imports: [CommonModule, SharedRoutingModule, NzDescriptionsModule],
  exports: [SharedComponent],
})
export class SharedModule {}
