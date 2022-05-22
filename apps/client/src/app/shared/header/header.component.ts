import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-feedback-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() numberOfSuggestions: number | undefined = 0;
  @Output() openMenu = new EventEmitter();
}
