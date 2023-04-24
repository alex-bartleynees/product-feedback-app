import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-feedback-app-heading-tile',
  templateUrl: './heading-tile.component.html',
  styleUrls: ['./heading-tile.component.scss'],
})
export class HeadingTileComponent {
  showMobileSidebar = false;
  @Output() mobileSideBarClick = new EventEmitter();

  onMobileSideBarClick() {
    this.showMobileSidebar = !this.showMobileSidebar;
    this.mobileSideBarClick.emit();
  }
}
