import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-feedback-app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() radial = false;
}
