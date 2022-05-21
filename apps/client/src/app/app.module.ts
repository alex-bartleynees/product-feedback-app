import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { ButtonComponent } from './button/button.component';
import { TileComponent } from './tile/tile.component';
import { ChipComponent } from './chip/chip.component';
import { HeaderComponent } from './header/header.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    ButtonComponent,
    TileComponent,
    ChipComponent,
    HeaderComponent,
    SuggestionsListComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
