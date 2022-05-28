import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SuggestionDetailRoutingModule } from './suggestion-detail-routing.module';
import { SuggestionDetailComponent } from './suggestion-detail.component';
import { SuggestionCommentComponent } from './suggestion-comment/suggestion-comment.component';

@NgModule({
  declarations: [SuggestionDetailComponent, SuggestionCommentComponent],
  imports: [SharedModule, SuggestionDetailRoutingModule],
})
export class SuggestionDetailModule {}
