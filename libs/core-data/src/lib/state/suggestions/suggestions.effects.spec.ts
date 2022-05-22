import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SuggestionsActions from './suggestions.actions';
import { SuggestionsEffects } from './suggestions.effects';

describe('SuggestionsEffects', () => {
  let actions: Observable<Action>;
  let effects: SuggestionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SuggestionsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SuggestionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SuggestionsActions.init() });

      const expected = hot('-a-|', {
        a: SuggestionsActions.loadSuggestionsSuccess({ suggestions: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
