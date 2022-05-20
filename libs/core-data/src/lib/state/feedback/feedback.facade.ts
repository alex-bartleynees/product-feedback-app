import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FeedbackActions from './feedback.actions';
import * as FeedbackFeature from './feedback.reducer';
import * as FeedbackSelectors from './feedback.selectors';

@Injectable()
export class FeedbackFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FeedbackSelectors.getFeedbackLoaded));
  allFeedback$ = this.store.pipe(select(FeedbackSelectors.getAllFeedback));
  selectedFeedback$ = this.store.pipe(select(FeedbackSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FeedbackActions.init());
  }
}
