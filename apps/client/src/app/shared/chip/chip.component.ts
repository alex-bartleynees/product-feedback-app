import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-feedback-app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() text: string | number = '';
  @Input() active = false;

  @Output() chipClick = new EventEmitter<string | number>();
}
