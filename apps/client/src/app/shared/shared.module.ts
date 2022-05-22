import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreDataModule } from '@product-feedback-app/core-data';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { TileComponent } from './tile/tile.component';

@NgModule({
  imports: [CommonModule, CoreDataModule],
  declarations: [
    ButtonComponent,
    ChipComponent,
    HeaderComponent,
    TileComponent,
    SortPipe,
    MenuComponent,
  ],
  exports: [
    ButtonComponent,
    ChipComponent,
    HeaderComponent,
    TileComponent,
    SortPipe,
    CommonModule,
    CoreDataModule,
    MenuComponent,
  ],
})
export class SharedModule {}
