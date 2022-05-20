import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as FeedbackActions from './feedback.actions';
import * as FeedbackFeature from './feedback.reducer';

@Injectable()
export class FeedbackEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedbackActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FeedbackActions.loadFeedbackSuccess({ feedback: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return FeedbackActions.loadFeedbackFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
