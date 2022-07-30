import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Suggestion } from '@product-feedback-app/api-interfaces';

@Component({
  selector: 'product-feedback-app-suggestion-list-item',
  templateUrl: './suggestion-list-item.component.html',
  styleUrls: ['./suggestion-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionListItemComponent {
  @Input() suggestion?: Suggestion | null;

  @Output() upVoteClick = new EventEmitter<Suggestion>();
  @Output() suggestionSelectClick = new EventEmitter<Suggestion>();
}
