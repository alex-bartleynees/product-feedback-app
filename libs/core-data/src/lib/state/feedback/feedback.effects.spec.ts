import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FeedbackActions from './feedback.actions';
import { FeedbackEffects } from './feedback.effects';

describe('FeedbackEffects', () => {
  let actions: Observable<Action>;
  let effects: FeedbackEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FeedbackEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FeedbackEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FeedbackActions.init() });

      const expected = hot('-a-|', {
        a: FeedbackActions.loadFeedbackSuccess({ feedback: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
