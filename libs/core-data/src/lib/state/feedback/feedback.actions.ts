import { createAction, props } from '@ngrx/store';
import { FeedbackEntity } from './feedback.models';

export const init = createAction('[Feedback Page] Init');

export const loadFeedbackSuccess = createAction(
  '[Feedback/API] Load Feedback Success',
  props<{ feedback: FeedbackEntity[] }>()
);

export const loadFeedbackFailure = createAction(
  '[Feedback/API] Load Feedback Failure',
  props<{ error: any }>()
);
