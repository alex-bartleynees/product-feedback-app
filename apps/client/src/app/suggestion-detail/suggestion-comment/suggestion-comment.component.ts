import { Component, Input } from '@angular/core';
import { SuggestionComment } from '@product-feedback-app/api-interfaces';

@Component({
  selector: 'product-feedback-app-suggestion-comment',
  templateUrl: './suggestion-comment.component.html',
  styleUrls: ['./suggestion-comment.component.scss'],
})
export class SuggestionCommentComponent {
  @Input() comment?: SuggestionComment;
  showReply = false;
}
