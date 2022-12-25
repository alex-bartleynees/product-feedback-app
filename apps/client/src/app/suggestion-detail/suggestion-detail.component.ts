import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Suggestion,
  SuggestionComment,
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
    const comment: SuggestionComment = {
      content: this.commentForm.comment.value,
      user: {
        image: '../../assets/user-images/image-zena.jpg',
        name: 'John Doe',
        username: 'johndoe',
      },
    };

    const updatedSuggestion: Suggestion = {
      ...this.selectedSuggestion,
      comments: this.selectedSuggestion.comments
        ? [...this.selectedSuggestion.comments, comment]
        : [comment],
    };

    this.suggestionsFacade.updateSuggestion(updatedSuggestion);
    this.commentForm.comment.setValue('');
  }

  onNewReply(comment: SuggestionComment): void {
    if (!this.selectedSuggestion) {
      return;
    }

    const updatedSuggestion: Suggestion = this.updateSuggestionWithReply(
      this.selectedSuggestion,
      comment
    );
    this.suggestionsFacade.updateSuggestion(updatedSuggestion);
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
