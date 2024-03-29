import { Injectable } from '@angular/core';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';
import {
  Suggestion,
  SuggestionComment,
  SuggestionCommentReplyRequest,
  SuggestionCommentRequest,
} from '@product-feedback-app/api-interfaces';
import { filter, Observable } from 'rxjs';

import * as SuggestionsActions from './suggestions.actions';
import * as SuggestionsSelectors from './suggestions.selectors';

@Injectable({ providedIn: 'root' })
export class SuggestionsFacade {
  loaded$ = this.store.pipe(select(SuggestionsSelectors.getSuggestionsLoaded));
  loadError$ = this.store.pipe(
    select(SuggestionsSelectors.getSuggestionsError)
  );
  allSuggestions$ = this.store.pipe(
    select(SuggestionsSelectors.getAllSuggestions)
  );
  selectedSuggestions$ = this.store.pipe(
    select(SuggestionsSelectors.getSelected)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === SuggestionsActions.deleteSuggestionSuccess.type
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

  addCommentToSuggestion(comment: SuggestionCommentRequest): void {
    this.dispatch(SuggestionsActions.addCommentToSuggestion({ comment }));
  }

  addReplyToComment(reply: SuggestionCommentReplyRequest) {
    this.dispatch(SuggestionsActions.createCommentReply({ reply }));
  }

  deleteSuggestion(id: number): void {
    this.dispatch(SuggestionsActions.deleteSuggestion({ suggestionId: id }));
  }
}
