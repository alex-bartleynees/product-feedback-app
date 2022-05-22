import { ActionReducerMap } from '@ngrx/store';
import { SuggestionsState } from './suggestions/suggestions.reducer';
import * as fromSuggestions from './suggestions/suggestions.reducer';

export interface AppState {
  suggestions: SuggestionsState;
}

export const reducers: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.reducer,
};
