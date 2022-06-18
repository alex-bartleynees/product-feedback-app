import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestionListItemComponent } from '../suggestions/suggestion-list-item/suggestion-list-item.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { TileComponent } from './tile/tile.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    ButtonComponent,
    ChipComponent,
    HeaderComponent,
    TileComponent,
    SortPipe,
    MenuComponent,
    SuggestionListItemComponent,
    SelectComponent,
  ],
  exports: [
    ButtonComponent,
    ChipComponent,
    HeaderComponent,
    TileComponent,
    SortPipe,
    CommonModule,
    MenuComponent,
    SuggestionListItemComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
  ],
})
export class SharedModule {}
