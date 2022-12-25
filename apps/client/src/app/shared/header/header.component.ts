import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../menu/menu.component';

@Component({
  selector: 'product-feedback-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() numberOfSuggestions: number | undefined = 0;
  @Input() menuItemSelected?: MenuItem;
  @Output() openMenu = new EventEmitter();
  @Output() addFeedbackButtonClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onAddFeedbackButtonClick() {
    this.router.navigate(['/suggestion']);
  }
}
