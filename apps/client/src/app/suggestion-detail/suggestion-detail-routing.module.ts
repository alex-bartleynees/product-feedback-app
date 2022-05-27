import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionDetailComponent } from './suggestion-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestionDetailRoutingModule {}
