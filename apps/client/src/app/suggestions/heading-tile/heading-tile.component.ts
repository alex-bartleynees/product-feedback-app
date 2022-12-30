import { Component } from '@angular/core';
import { ResizeService } from '../../shared/resize-service/resize.service';

@Component({
  selector: 'product-feedback-app-heading-tile',
  templateUrl: './heading-tile.component.html',
  styleUrls: ['./heading-tile.component.scss'],
})
export class HeadingTileComponent {
  constructor(public resize: ResizeService) {}
}
