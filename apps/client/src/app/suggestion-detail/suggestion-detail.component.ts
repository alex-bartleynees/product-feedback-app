import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Suggestion,
  SuggestionComment,
  SuggestionCommentReplyRequest,
  SuggestionCommentRequest,
  SuggestionReply,
} from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { CommentForm } from '../forms/comment-form';

@Component({
  selector: 'product-feedback-app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionDetailComponent implements OnInit {
  selectedSuggestion$ = this.suggestionsFacade.selectedSuggestions$;
  selectedSuggestion?: Suggestion;
  commentForm = new CommentForm();
  constructor(
    private suggestionsFacade: SuggestionsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.suggestionsFacade.selectSuggestion(+id);
    }

    this.selectedSuggestion$.subscribe((suggestion) => {
      this.selectedSuggestion = suggestion;
    });
  }

  onBackButtonClick() {
    this.router.navigate(['/']);
  }

  onUpVoteClick(suggestion: Suggestion): void {
    this.suggestionsFacade.upVoteSuggestion(suggestion);
  }

  onSubmitComment(): void {
    if (!this.selectedSuggestion || !this.commentForm.valid) {
      return;
    }
    const comment: SuggestionCommentRequest = {
      suggestionId: this.selectedSuggestion.id,
      content: this.commentForm.comment.value,
      userId: 7,
    };

    this.suggestionsFacade.addCommentToSuggestion(comment);
    this.commentForm.comment.setValue('');
  }

  onNewReply(reply: SuggestionReply): void {
    if (!this.selectedSuggestion?.id || !reply.user.id) {
      return;
    }

    const suggestionReplyRequest: SuggestionCommentReplyRequest = {
      suggestionId: this.selectedSuggestion.id,
      suggestionCommentId: reply.suggestionCommentId,
      content: reply.content,
      replyingTo: reply.replyingTo,
      userId: reply.user.id,
    };
    console.log(suggestionReplyRequest);
    this.suggestionsFacade.addReplyToComment(suggestionReplyRequest);
  }

  onEditFeedbackClick(): void {
    this.router.navigate(['/suggestion', this.selectedSuggestion?.id]);
  }

  private updateSuggestionWithReply(
    suggestion: Suggestion,
    newComment: SuggestionComment | undefined
  ): Suggestion {
    if (!newComment) {
      return suggestion;
    }
    return {
      ...suggestion,
      comments: suggestion.comments?.map((comment) => {
        if (comment.user.username === newComment.user.username) {
          return newComment;
        }
        return comment;
      }),
    };
  }
}
