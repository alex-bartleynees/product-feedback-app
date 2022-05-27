import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionsComponent } from './suggestions.component';

@NgModule({
  declarations: [SuggestionsComponent, SuggestionsListComponent],
  imports: [SharedModule, SuggestionsRoutingModule],
})
export class SuggestionsModule {}
