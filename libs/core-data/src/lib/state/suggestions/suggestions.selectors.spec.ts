import { SuggestionsEntity } from './suggestions.models';
import {
  suggestionsAdapter,
  SuggestionsPartialState,
  initialState,
} from './suggestions.reducer';
import * as SuggestionsSelectors from './suggestions.selectors';

describe('Suggestions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSuggestionsId = (it: SuggestionsEntity) => it.id;
  const createSuggestionsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SuggestionsEntity);

  let state: SuggestionsPartialState;

  beforeEach(() => {
    state = {
      suggestions: suggestionsAdapter.setAll(
        [
          createSuggestionsEntity('PRODUCT-AAA'),
          createSuggestionsEntity('PRODUCT-BBB'),
          createSuggestionsEntity('PRODUCT-CCC'),
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

  describe('Suggestions Selectors', () => {
    it('getAllSuggestions() should return the list of Suggestions', () => {
      const results = SuggestionsSelectors.getAllSuggestions(state);
      const selId = getSuggestionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SuggestionsSelectors.getSelected(
        state
      ) as SuggestionsEntity;
      const selId = getSuggestionsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSuggestionsLoaded() should return the current "loaded" status', () => {
      const result = SuggestionsSelectors.getSuggestionsLoaded(state);

      expect(result).toBe(true);
    });

    it('getSuggestionsError() should return the current "error" state', () => {
      const result = SuggestionsSelectors.getSuggestionsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
