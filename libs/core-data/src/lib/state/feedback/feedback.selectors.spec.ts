import { FeedbackEntity } from './feedback.models';
import {
  feedbackAdapter,
  FeedbackPartialState,
  initialState,
} from './feedback.reducer';
import * as FeedbackSelectors from './feedback.selectors';

describe('Feedback Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFeedbackId = (it: FeedbackEntity) => it.id;
  const createFeedbackEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeedbackEntity);

  let state: FeedbackPartialState;

  beforeEach(() => {
    state = {
      feedback: feedbackAdapter.setAll(
        [
          createFeedbackEntity('PRODUCT-AAA'),
          createFeedbackEntity('PRODUCT-BBB'),
          createFeedbackEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Feedback Selectors', () => {
    it('getAllFeedback() should return the list of Feedback', () => {
      const results = FeedbackSelectors.getAllFeedback(state);
      const selId = getFeedbackId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FeedbackSelectors.getSelected(state) as FeedbackEntity;
      const selId = getFeedbackId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFeedbackLoaded() should return the current "loaded" status', () => {
      const result = FeedbackSelectors.getFeedbackLoaded(state);

      expect(result).toBe(true);
    });

    it('getFeedbackError() should return the current "error" state', () => {
      const result = FeedbackSelectors.getFeedbackError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
