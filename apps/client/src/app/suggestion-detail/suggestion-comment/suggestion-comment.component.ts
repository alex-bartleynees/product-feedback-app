import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SuggestionComment } from '@product-feedback-app/api-interfaces';
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

  @Output() newReply = new EventEmitter<SuggestionComment>();

  commentForm = new CommentForm();
  showReply = false;

  onCommentReply() {
    if (!this.comment || !this.commentForm.valid) {
      return;
    }
    console.log('onCommentReply', this.commentForm.comment.value);
    const newReply: SuggestionReply = {
      content: this.commentForm.comment.value,
      replyingTo: this.comment?.user.username,
      user: {
        image: '../../assets/user-images/image-zena.jpg',
        name: 'Jane Doe',
        username: 'janedoe',
      },
    };

    let newComment: SuggestionComment;

    if (this.parentComment) {
      newComment = this.formatComment(this.parentComment, newReply);
    } else {
      newComment = this.formatComment(this.comment, newReply);
    }
    this.newReply.emit(newComment);
  }

  onNewReply(reply: SuggestionReply) {
    this.newReply.emit(reply);
  }

  private formatComment(
    comment: SuggestionComment,
    newReply: SuggestionComment
  ): SuggestionComment {
    const newComment: SuggestionComment = {
      ...comment,
      replies: comment.replies ? [...comment.replies, newReply] : [newReply],
    };

    return newComment;
  }
}
