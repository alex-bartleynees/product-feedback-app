import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SuggestionDetailRoutingModule } from './suggestion-detail-routing.module';
import { SuggestionDetailComponent } from './suggestion-detail.component';

@NgModule({
  declarations: [SuggestionDetailComponent],
  imports: [SharedModule, SuggestionDetailRoutingModule],
})
export class SuggestionDetailModule {}
