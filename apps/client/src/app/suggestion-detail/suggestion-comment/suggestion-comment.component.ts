import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SuggestionComment, User } from '@product-feedback-app/api-interfaces';
import { SuggestionReply } from '@product-feedback-app/api-interfaces';
import { CommentForm } from '../../forms/comment-form';

@Component({
  selector: 'product-feedback-app-suggestion-comment',
  templateUrl: './suggestion-comment.component.html',
  styleUrls: ['./suggestion-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionCommentComponent {
  @Input() comment?: SuggestionComment;
  @Input() parentComment?: SuggestionComment;
  @Input() replyingTo?: string;
  @Input() currentUser?: User | null;

  @Output() newReply = new EventEmitter<SuggestionReply>();

  commentForm = new CommentForm();
  showReply = false;


  onCommentReply() {
    if (!this.comment?.id || !this.commentForm.valid || !this.currentUser) {
      return;
    }

    const newReply: SuggestionReply = {
      suggestionCommentId: this.parentComment?.id
        ? this.parentComment.id
        : this.comment.id,
      content: this.commentForm.comment.value,
      replyingTo: this.comment?.user.username,
      user: this.currentUser,
    };

    this.newReply.emit(newReply);
  }

  onNewReply(reply: SuggestionReply) {
    this.newReply.emit(reply);
  }
}
