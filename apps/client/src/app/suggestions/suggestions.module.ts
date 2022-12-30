import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionsComponent } from './suggestions.component';
import { ChipListTileComponent } from './chiplist-tile/chiplist-tile.component';
import { HeadingTileComponent } from './heading-tile/heading-tile.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionsListComponent,
    ChipListTileComponent,
    HeadingTileComponent,
    MobileSidebarComponent,
  ],
  imports: [SharedModule, SuggestionsRoutingModule],
})
export class SuggestionsModule {}
