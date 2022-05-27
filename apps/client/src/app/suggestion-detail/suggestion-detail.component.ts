import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';

@Component({
  selector: 'product-feedback-app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.scss'],
})
export class SuggestionDetailComponent implements OnInit {
  selectedSuggestion$ = this.suggestionsFacade.selectedSuggestions$;
  constructor(
    private suggestionsFacade: SuggestionsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionsFacade.loadSuggestions();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.suggestionsFacade.selectSuggestion(+id);
    }
  }

  onBackButtonClick() {
    this.router.navigate(['/']);
  }

  onUpVoteClick(suggestion: Suggestion): void {
    this.suggestionsFacade.upVoteSuggestion(suggestion);
  }
}
