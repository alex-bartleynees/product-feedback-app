import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-feedback-app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() text = '';
  @Input() active = false;
}
