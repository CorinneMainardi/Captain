import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteStoryComponent } from './write-story.component';

const routes: Routes = [{ path: '', component: WriteStoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteStoryRoutingModule { }
