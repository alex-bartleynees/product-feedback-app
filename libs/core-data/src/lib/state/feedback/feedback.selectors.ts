import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FEEDBACK_FEATURE_KEY,
  State,
  feedbackAdapter,
} from './feedback.reducer';

// Lookup the 'Feedback' feature state managed by NgRx
export const getFeedbackState =
  createFeatureSelector<State>(FEEDBACK_FEATURE_KEY);

const { selectAll, selectEntities } = feedbackAdapter.getSelectors();

export const getFeedbackLoaded = createSelector(
  getFeedbackState,
  (state: State) => state.loaded
);

export const getFeedbackError = createSelector(
  getFeedbackState,
  (state: State) => state.error
);

export const getAllFeedback = createSelector(getFeedbackState, (state: State) =>
  selectAll(state)
);

export const getFeedbackEntities = createSelector(
  getFeedbackState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFeedbackState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getFeedbackEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
