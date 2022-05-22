import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as SuggestionsActions from './suggestions.actions';
import { SuggestionsEffects } from './suggestions.effects';
import { SuggestionsFacade } from './suggestions.facade';
import { SuggestionsEntity } from './suggestions.models';
import {
  SUGGESTIONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './suggestions.reducer';
import * as SuggestionsSelectors from './suggestions.selectors';

interface TestSchema {
  suggestions: State;
}

describe('SuggestionsFacade', () => {
  let facade: SuggestionsFacade;
  let store: Store<TestSchema>;
  const createSuggestionsEntity = (
    id: string,
    name = ''
  ): SuggestionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SUGGESTIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SuggestionsEffects]),
        ],
        providers: [SuggestionsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(SuggestionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allSuggestions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allSuggestions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadSuggestionsSuccess` to manually update list
     */
    it('allSuggestions$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allSuggestions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        SuggestionsActions.loadSuggestionsSuccess({
          suggestions: [
            createSuggestionsEntity('AAA'),
            createSuggestionsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allSuggestions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
