import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  Suggestion,
  SuggestionCommentReplyResponse,
  SuggestionCommentResponse,
} from '@product-feedback-app/api-interfaces';
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

  createSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.createSuggestion),
      mergeMap((action) => this.suggestionsService.create(action.suggestion)),
      map((suggestion: Suggestion) =>
        SuggestionsActions.createSuggestionSuccess({ suggestion })
      ),
      catchError(async (error) =>
        SuggestionsActions.createSuggestionFailure({ error })
      )
    )
  );

  addCommentToSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.addCommentToSuggestion),
      mergeMap((action) => this.suggestionsService.addComment(action.comment)),
      map((comment: SuggestionCommentResponse) => {
        return SuggestionsActions.addCommentToSuggestionSuccess({ comment });
      }),
      catchError(async (error) =>
        SuggestionsActions.AddCommentToSuggestionFailure({ error })
      )
    )
  );

  addReplyToComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.createCommentReply),
      mergeMap((action) => this.suggestionsService.addReply(action.reply)),
      map((reply: SuggestionCommentReplyResponse) => {
        return SuggestionsActions.createReplySuccess({ reply });
      }),
      catchError(async (error) =>
        SuggestionsActions.createReplyFailure({ error })
      )
    )
  );

  deleteSuggestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuggestionsActions.deleteSuggestion),
      mergeMap((action) => this.suggestionsService.delete(action.suggestionId)),
      map((suggestionId: number) =>
        SuggestionsActions.deleteSuggestionSuccess({ suggestionId })
      ),
      catchError(async (error) =>
        SuggestionsActions.deleteSuggestionFailure({ error })
      )
    )
  );
}
