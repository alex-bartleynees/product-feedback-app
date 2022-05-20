import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FeedbackActions from './feedback.actions';
import { FeedbackEntity } from './feedback.models';

export const FEEDBACK_FEATURE_KEY = 'feedback';

export interface State extends EntityState<FeedbackEntity> {
  selectedId?: string | number; // which Feedback record has been selected
  loaded: boolean; // has the Feedback list been loaded
  error?: string | null; // last known error (if any)
}

export interface FeedbackPartialState {
  readonly [FEEDBACK_FEATURE_KEY]: State;
}

export const feedbackAdapter: EntityAdapter<FeedbackEntity> =
  createEntityAdapter<FeedbackEntity>();

export const initialState: State = feedbackAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const feedbackReducer = createReducer(
  initialState,
  on(FeedbackActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FeedbackActions.loadFeedbackSuccess, (state, { feedback }) =>
    feedbackAdapter.setAll(feedback, { ...state, loaded: true })
  ),
  on(FeedbackActions.loadFeedbackFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return feedbackReducer(state, action);
}
