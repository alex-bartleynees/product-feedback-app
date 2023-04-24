import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-feedback-app-heading-tile',
  templateUrl: './heading-tile.component.html',
  styleUrls: ['./heading-tile.component.scss'],
})
export class HeadingTileComponent {
  @Output() mobileSideBarClick = new EventEmitter();
}
