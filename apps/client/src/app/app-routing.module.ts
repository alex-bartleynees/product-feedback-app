import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./suggestions/suggestions.module').then(
        (m) => m.SuggestionsModule
      ),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
