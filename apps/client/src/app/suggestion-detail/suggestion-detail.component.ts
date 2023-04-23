import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Suggestion,
  SuggestionCommentReplyRequest,
  SuggestionCommentRequest,
  SuggestionReply,
  User,
} from '@product-feedback-app/api-interfaces';
import {
  SuggestionsFacade,
  UsersFacade,
} from '@product-feedback-app/core-data';
import { filter } from 'rxjs';
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
  currentUser!: User;

  constructor(
    private suggestionsFacade: SuggestionsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.suggestionsFacade.selectSuggestion(+id);
    }

    this.selectedSuggestion$.subscribe((suggestion) => {
      this.selectedSuggestion = suggestion;
    });

    this.usersFacade.currentUser$.pipe(filter(Boolean)).subscribe((user) => {
      this.currentUser = user;
    });
  }

  onBackButtonClick() {
    this.router.navigate(['/']);
  }

  onUpVoteClick(suggestion: Suggestion): void {
    this.suggestionsFacade.upVoteSuggestion(suggestion);
  }

  onSubmitComment(): void {
    if (
      !this.selectedSuggestion ||
      !this.commentForm.valid ||
      !this.currentUser.id
    ) {
      return;
    }
    const comment: SuggestionCommentRequest = {
      suggestionId: this.selectedSuggestion.id,
      content: this.commentForm.comment.value,
      userId: this.currentUser.id,
    };

    this.suggestionsFacade.addCommentToSuggestion(comment);
    this.commentForm.comment.setValue('');
  }

  onNewReply(reply: SuggestionReply): void {
    if (
      !this.selectedSuggestion?.id ||
      !reply.user.id ||
      !this.currentUser.id
    ) {
      return;
    }

    const suggestionReplyRequest: SuggestionCommentReplyRequest = {
      suggestionId: this.selectedSuggestion.id,
      suggestionCommentId: reply.suggestionCommentId,
      content: reply.content,
      replyingTo: reply.replyingTo,
      userId: this.currentUser.id,
    };

    this.suggestionsFacade.addReplyToComment(suggestionReplyRequest);
  }

  onEditFeedbackClick(): void {
    this.router.navigate(['/suggestion', this.selectedSuggestion?.id]);
  }
}
