import { Action } from '@ngrx/store';

import * as SuggestionsActions from './suggestions.actions';
import { SuggestionsEntity } from './suggestions.models';
import { State, initialState, reducer } from './suggestions.reducer';

describe('Suggestions Reducer', () => {
  const createSuggestionsEntity = (
    id: string,
    name = ''
  ): SuggestionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Suggestions actions', () => {
    it('loadSuggestionsSuccess should return the list of known Suggestions', () => {
      const suggestions = [
        createSuggestionsEntity('PRODUCT-AAA'),
        createSuggestionsEntity('PRODUCT-zzz'),
      ];
      const action = SuggestionsActions.loadSuggestionsSuccess({ suggestions });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
