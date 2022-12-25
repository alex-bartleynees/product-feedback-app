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
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';
import { CommentIconComponent } from './comment-icon/comment-icon.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  declarations: [
    ButtonComponent,
    ChipComponent,
    HeaderComponent,
    TileComponent,
    SortPipe,
    MenuComponent,
    SuggestionListItemComponent,
    SelectComponent,
    BackButtonComponent,
    CommentIconComponent,
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
    BackButtonComponent,
    CommentIconComponent,
  ],
})
export class SharedModule {}
