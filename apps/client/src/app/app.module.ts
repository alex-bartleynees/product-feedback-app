import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { APP_CONFIG } from '@app-config/config';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreDataModule } from '@product-feedback-app/core-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipListTileComponent } from './suggestions/chiplist-tile/chiplist-tile.component';
import { HeadingTileComponent } from './suggestions/heading-tile/heading-tile.component';
import { MobileSidebarComponent } from './suggestions/mobile-sidebar/mobile-sidebar.component';
import { SuggestionsListComponent } from './suggestions/suggestions-list/suggestions-list.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { SharedModule } from './shared/shared.module';
import { RoadMapTileComponent } from './suggestions/roadmap-tile/roadmap-tile.component';
@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    SuggestionsListComponent,
    ChipListTileComponent,
    HeadingTileComponent,
    MobileSidebarComponent,
    RoadMapTileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreDataModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{ provide: APP_CONFIG, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
