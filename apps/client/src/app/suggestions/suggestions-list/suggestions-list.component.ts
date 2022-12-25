import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { Observable } from 'rxjs';
import { SortBy } from '../suggestions.component';

@Component({
  selector: 'product-feedback-app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsListComponent {
  @Input() allSuggestions$?: Observable<Suggestion[]>;
  @Input() sortBy: SortBy = { key: 'upvotes', order: 'desc' };

  @Output() upVoteClick = new EventEmitter<Suggestion>();
  @Output() suggestionSelectClick = new EventEmitter<Suggestion>();
  @Output() addFeedbackButtonClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onButtonClick() {
    this.router.navigate(['/suggestion']);
  }
}
