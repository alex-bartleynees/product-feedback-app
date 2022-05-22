import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suggestion } from '@product-feedback-app/api-interfaces';

@Component({
  selector: 'product-feedback-app-suggestion-list-item',
  templateUrl: './suggestion-list-item.component.html',
  styleUrls: ['./suggestion-list-item.component.scss'],
})
export class SuggestionListItemComponent {
  @Input() suggestion?: Suggestion;

  @Output() upVoteClick = new EventEmitter<Suggestion>();
}
