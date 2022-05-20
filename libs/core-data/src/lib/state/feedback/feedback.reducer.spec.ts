import { Action } from '@ngrx/store';

import * as FeedbackActions from './feedback.actions';
import { FeedbackEntity } from './feedback.models';
import { State, initialState, reducer } from './feedback.reducer';

describe('Feedback Reducer', () => {
  const createFeedbackEntity = (id: string, name = ''): FeedbackEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Feedback actions', () => {
    it('loadFeedbackSuccess should return the list of known Feedback', () => {
      const feedback = [
        createFeedbackEntity('PRODUCT-AAA'),
        createFeedbackEntity('PRODUCT-zzz'),
      ];
      const action = FeedbackActions.loadFeedbackSuccess({ feedback });

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
