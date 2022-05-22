import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortBy } from '../../suggestions/suggestions.component';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'product-feedback-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() numberOfSuggestions: number | undefined = 0;
  @Input() menuItemSelected?: MenuItem;
  @Output() openMenu = new EventEmitter();
}
