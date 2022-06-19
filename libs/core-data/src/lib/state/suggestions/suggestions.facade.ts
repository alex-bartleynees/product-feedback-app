import { Injectable } from '@angular/core';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { filter, Observable } from 'rxjs';

import * as SuggestionsActions from './suggestions.actions';
import * as SuggestionsSelectors from './suggestions.selectors';

@Injectable({ providedIn: 'root' })
export class SuggestionsFacade {
  loaded$ = this.store.pipe(select(SuggestionsSelectors.getSuggestionsLoaded));
  allSuggestions$ = this.store.pipe(
    select(SuggestionsSelectors.getAllSuggestions)
  );
  selectedSuggestions$ = this.store.pipe(
    select(SuggestionsSelectors.getSelected)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === SuggestionsActions.createSuggestion.type ||
        action.type === SuggestionsActions.updateSuggestion.type ||
        action.type === SuggestionsActions.deleteSuggestion.type
    )
  );

  constructor(
    private readonly store: Store,
    private actions$: ActionsSubject
  ) {}

  reset(): void {
    this.dispatch(SuggestionsActions.loadSuggestions());
  }

  filterSuggestions$(category: string, prop: string): Observable<Suggestion[]> {
    return this.store.pipe(
      select(SuggestionsSelectors.filterSuggestions(category, prop))
    );
  }

  loadSuggestions(): void {
    this.dispatch(SuggestionsActions.loadSuggestions());
  }

  selectSuggestion(suggestionId: number): void {
    this.dispatch(SuggestionsActions.selectSuggestion({ suggestionId }));
  }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  upVoteSuggestion(suggestion: Suggestion): void {
    const updatedSuggestion = {
      ...suggestion,
      upvotes: suggestion.upvotes + 1,
    };

    this.dispatch(
      SuggestionsActions.updateSuggestion({ suggestion: updatedSuggestion })
    );
  }

  updateSuggestion(updatedSuggestion: Suggestion): void {
    this.dispatch(
      SuggestionsActions.updateSuggestion({ suggestion: updatedSuggestion })
    );
  }

  createSuggestion(suggestion: Suggestion): void {
    this.dispatch(SuggestionsActions.createSuggestion({ suggestion }));
  }

  deleteSuggestion(id: number): void {
    this.dispatch(SuggestionsActions.deleteSuggestion({ suggestionId: id }));
  }
}
