import { ActionReducerMap } from '@ngrx/store';
import { SuggestionsState } from './suggestions/suggestions.reducer';
import * as fromSuggestions from './suggestions/suggestions.reducer';
import * as fromUsers from './users/users.reducer';
import { UsersState } from './users/users.reducer';

export interface AppState {
  suggestions: SuggestionsState;
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  suggestions: fromSuggestions.reducer,
  users: fromUsers.reducer,
};
