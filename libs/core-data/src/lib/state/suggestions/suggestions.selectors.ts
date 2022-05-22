import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { pipe } from 'rxjs';
import {
  SUGGESTIONS_FEATURE_KEY,
  SuggestionsState,
  suggestionsAdapter,
} from './suggestions.reducer';

// Lookup the 'Suggestions' feature state managed by NgRx
export const getSuggestionsState = createFeatureSelector<SuggestionsState>(
  SUGGESTIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = suggestionsAdapter.getSelectors();

export const getSuggestionsLoaded = createSelector(
  getSuggestionsState,
  (state: SuggestionsState) => state.loaded
);

export const getSuggestionsError = createSelector(
  getSuggestionsState,
  (state: SuggestionsState) => state.error
);

export const getAllSuggestions = createSelector(
  getSuggestionsState,
  (state: SuggestionsState) => selectAll(state)
);

export const getSuggestionsEntities = createSelector(
  getSuggestionsState,
  (state: SuggestionsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSuggestionsState,
  (state: SuggestionsState) => state.selectedId
);

export const getSelected = createSelector(
  getSuggestionsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const filterSuggestions = (category: string, prop: string) =>
  createSelector(getAllSuggestions, (suggestions) => {
    return suggestions.filter(
      (suggestion) => suggestion[category as keyof Suggestion] === prop
    );
  });
