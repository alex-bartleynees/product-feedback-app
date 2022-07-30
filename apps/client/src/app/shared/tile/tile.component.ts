import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'product-feedback-app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  @Input() radial = false;
}
