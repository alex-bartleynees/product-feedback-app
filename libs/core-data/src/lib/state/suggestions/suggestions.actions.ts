import { createAction, props } from '@ngrx/store';
import { Suggestion } from '@product-feedback-app/api-interfaces';

export const loadSuggestions = createAction('[Suggestions] Load Suggestions');

export const loadSuggestionsSuccess = createAction(
  '[Suggestions] Load Suggestions Success',
  props<{ suggestions: Suggestion[] }>()
);

export const loadSuggestionsFailure = createAction(
  '[Suggestions] Load Suggestions Failure',
  props<{ error: any }>()
);

export const selectSuggestion = createAction(
  '[Suggestions] Select Suggestion',
  props<{ suggestionId: number }>()
);

export const updateSuggestion = createAction(
  '[Suggestions] Update Suggestion',
  props<{ suggestion: Suggestion }>()
);

export const updateSuggestionSuccess = createAction(
  '[Suggestions] Update Suggestion Success',
  props<{ suggestion: Suggestion }>()
);

export const updateSuggestionFailure = createAction(
  '[Suggestions] Update Suggestion Failure',
  props<{ error: any }>()
);

export const createSuggestion = createAction(
  '[Suggestions] Create Suggestion',
  props<{ suggestion: Suggestion }>()
);

export const createSuggestionSuccess = createAction(
  '[Suggestions] Create Suggestion Success',
  props<{ suggestion: Suggestion }>()
);

export const createSuggestionFailure = createAction(
  '[Suggestions] Create Suggestion Failure',
  props<{ error: any }>()
);

export const deleteSuggestion = createAction(
  '[Suggestions] Delete Suggestion',
  props<{ suggestionId: number }>()
);

export const deleteSuggestionSuccess = createAction(
  '[Suggestions] Delete Suggestion Success',
  props<{ suggestionId: number }>()
);

export const deleteSuggestionFailure = createAction(
  '[Suggestions] Delete Suggestion Failure',
  props<{ error: any }>()
);
