import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionsComponent } from './suggestions/suggestions.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
  },
  {
    path: 'suggestion-detail/:id',
    loadChildren: () =>
      import('./suggestion-detail/suggestion-detail.module').then(
        (m) => m.SuggestionDetailModule
      ),
  },
  {
    path: 'suggestion',
    loadChildren: () =>
      import('./suggestion-edit/suggestion-edit.module').then(
        (m) => m.SuggestionEditModule
      ),
  },
  {
    path: 'road-map',
    loadChildren: () =>
      import('./road-map/road-map.module').then((m) => m.RoadMapModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
