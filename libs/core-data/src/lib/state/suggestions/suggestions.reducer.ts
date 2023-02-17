import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  Suggestion,
  SuggestionComment,
  SuggestionReply,
} from '@product-feedback-app/api-interfaces';

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
  on(SuggestionsActions.updateSuggestionSuccess, (state, { suggestion }) =>
    suggestion.id
      ? suggestionsAdapter.updateOne(
          { id: suggestion.id, changes: suggestion },
          state
        )
      : state
  ),
  on(SuggestionsActions.updateSuggestionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SuggestionsActions.createSuggestionSuccess, (state, { suggestion }) =>
    suggestionsAdapter.addOne(suggestion, state)
  ),
  on(SuggestionsActions.createSuggestionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SuggestionsActions.deleteSuggestionSuccess, (state, { suggestionId }) =>
    suggestionsAdapter.removeOne(suggestionId, state)
  ),
  on(SuggestionsActions.deleteSuggestionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SuggestionsActions.addCommentToSuggestionSuccess, (state, { comment }) => {
    const suggestion: Suggestion | undefined =
      state.entities[comment.suggestionId];
    const comments: SuggestionComment[] | undefined = suggestion?.comments;
    if (suggestion) {
      return suggestionsAdapter.updateOne(
        {
          id: comment.suggestionId,
          changes: {
            ...suggestion,
            comments: [...(comments ?? []), comment],
          },
        },
        state
      );
    }

    return { ...state };
  }),
  on(SuggestionsActions.AddCommentToSuggestionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SuggestionsActions.createReplySuccess, (state, { reply }) => {
    const suggestion: Suggestion | undefined =
      state.entities[reply.suggestionId];
    const comment = suggestion?.comments?.find(
      (comment) => comment.id === reply.suggestionCommentId
    );
    if (suggestion?.comments && comment) {
      const updatedReplies: SuggestionReply[] = [
        ...(comment?.replies ?? []),
        reply,
      ];
      const updatedComment: SuggestionComment = {
        ...comment,
        replies: updatedReplies,
      };
      const index = suggestion.comments.indexOf(comment);
      const updatedComments: SuggestionComment[] = [...suggestion.comments];
      updatedComments[index] = updatedComment;
      return suggestionsAdapter.updateOne(
        {
          id: reply.suggestionId,
          changes: {
            ...suggestion,
            comments: [...updatedComments],
          },
        },
        state
      );
    }

    return { ...state };
  })
);

export function reducer(state: SuggestionsState | undefined, action: Action) {
  return suggestionsReducer(state, action);
}
