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
  props<{ suggestionId: string }>()
);
