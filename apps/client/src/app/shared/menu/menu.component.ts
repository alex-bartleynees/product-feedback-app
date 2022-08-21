import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SortBy } from '../../suggestions/suggestions.component';

export interface MenuItem {
  title: string;
  field?: string;
  sortBy?: SortBy;
}

@Component({
  selector: 'product-feedback-app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() itemSelected?: MenuItem;
  @Output() menuItemClicked = new EventEmitter<MenuItem>();
}
