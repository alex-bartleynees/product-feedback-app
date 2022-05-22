import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionService } from '../../services/suggestions/suggestion.service';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as SuggestionsActions from './suggestions.actions';
@Injectable()
export class SuggestionsEffects {
  constructor(
    private actions$: Actions,
    private suggestionsService: SuggestionService
  ) {}

  loadSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.loadSuggestions),
      mergeMap(() => this.suggestionsService.all()),
      map((suggestions: Suggestion[]) =>
        SuggestionsActions.loadSuggestionsSuccess({ suggestions })
      ),
      catchError(async (error) =>
        SuggestionsActions.loadSuggestionsFailure({ error })
      )
    )
  );

  updateSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.updateSuggestion),
      mergeMap((action) => this.suggestionsService.update(action.suggestion)),
      map((suggestion: Suggestion) =>
        SuggestionsActions.updateSuggestionSuccess({ suggestion })
      ),
      catchError(async (error) =>
        SuggestionsActions.updateSuggestionFailure({ error })
      )
    )
  );
}
