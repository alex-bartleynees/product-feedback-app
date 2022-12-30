import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chip } from '../suggestions.component';

@Component({
  selector: 'product-feedback-app-chiplist-tile',
  templateUrl: './chiplist-tile.component.html',
  styleUrls: ['./chiplist-tile.component.scss'],
})
export class ChipListTileComponent {
  @Input() chipList: Chip[] = [];
  @Output() chipSelected = new EventEmitter();
}
