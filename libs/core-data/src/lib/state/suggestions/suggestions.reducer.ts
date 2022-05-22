import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Suggestion } from '@product-feedback-app/api-interfaces';

import * as SuggestionsActions from './suggestions.actions';

export const SUGGESTIONS_FEATURE_KEY = 'suggestions';

export interface SuggestionsState extends EntityState<Suggestion> {
  selectedId?: string | number; // which Suggestions record has been selected
  loaded: boolean; // has the Suggestions list been loaded
  error?: string | null; // last known error (if any)
}

export interface SuggestionsPartialState {
  readonly [SUGGESTIONS_FEATURE_KEY]: SuggestionsState;
}

export const suggestionsAdapter: EntityAdapter<Suggestion> =
  createEntityAdapter<Suggestion>();

export const initialSuggestionsState: SuggestionsState =
  suggestionsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const suggestionsReducer = createReducer(
  initialSuggestionsState,
  on(SuggestionsActions.loadSuggestions, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SuggestionsActions.loadSuggestionsSuccess, (state, { suggestions }) =>
    suggestionsAdapter.setAll(suggestions, { ...state, loaded: true })
  ),
  on(SuggestionsActions.loadSuggestionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SuggestionsActions.selectSuggestion, (state, { suggestionId }) => ({
    ...state,
    selectedId: suggestionId,
  })),
  on(SuggestionsActions.updateSuggestionSuccess, (state, { suggestion }) => ({
    ...suggestionsAdapter.updateOne(
      { id: suggestion.id, changes: suggestion },
      state
    ),
  })),
  on(SuggestionsActions.updateSuggestionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: SuggestionsState | undefined, action: Action) {
  return suggestionsReducer(state, action);
}
