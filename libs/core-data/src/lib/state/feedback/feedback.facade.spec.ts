import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as FeedbackActions from './feedback.actions';
import { FeedbackEffects } from './feedback.effects';
import { FeedbackFacade } from './feedback.facade';
import { FeedbackEntity } from './feedback.models';
import {
  FEEDBACK_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './feedback.reducer';
import * as FeedbackSelectors from './feedback.selectors';

interface TestSchema {
  feedback: State;
}

describe('FeedbackFacade', () => {
  let facade: FeedbackFacade;
  let store: Store<TestSchema>;
  const createFeedbackEntity = (id: string, name = ''): FeedbackEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FEEDBACK_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FeedbackEffects]),
        ],
        providers: [FeedbackFacade],
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
      facade = TestBed.inject(FeedbackFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFeedback$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFeedback$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFeedbackSuccess` to manually update list
     */
    it('allFeedback$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFeedback$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FeedbackActions.loadFeedbackSuccess({
          feedback: [createFeedbackEntity('AAA'), createFeedbackEntity('BBB')],
        })
      );

      list = await readFirst(facade.allFeedback$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
