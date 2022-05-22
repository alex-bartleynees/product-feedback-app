import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSuggestions from './suggestions/suggestions.reducer';
import { SuggestionsEffects } from './suggestions/suggestions.effects';
import { SuggestionsFacade } from './suggestions/suggestions.facade';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './index';

const STORE_NAME = 'product-feedback-store';
const storeConfig: RootStoreConfig<any, any> = {
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    StoreModule.forFeature(
      fromSuggestions.SUGGESTIONS_FEATURE_KEY,
      fromSuggestions.reducer
    ),
    EffectsModule.forFeature([SuggestionsEffects]),
    EffectsModule.forRoot([SuggestionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: STORE_NAME }),
  ],
  providers: [SuggestionsFacade],
})
export class StateModule {}
