import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { UsersFacade } from './users/users.facade';
import * as fromFeedback from './feedback/feedback.reducer';
import { FeedbackEffects } from './feedback/feedback.effects';
import { FeedbackFacade } from './feedback/feedback.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature(
      fromFeedback.FEEDBACK_FEATURE_KEY,
      fromFeedback.reducer
    ),
    EffectsModule.forFeature([FeedbackEffects]),
  ],
  providers: [UsersFacade, FeedbackFacade],
})
export class StateModule {}
