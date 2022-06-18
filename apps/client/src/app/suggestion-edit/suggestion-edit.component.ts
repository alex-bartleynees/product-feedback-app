import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { SuggestionForm } from '../forms/suggestion-form';
import { MenuItem } from '../shared/menu/menu.component';

@Component({
  selector: 'product-feedback-app-suggestion-edit',
  templateUrl: './suggestion-edit.component.html',
  styleUrls: ['./suggestion-edit.component.scss'],
})
export class SuggestionEditComponent implements OnInit {
  editMode = false;
  id?: number;
  suggestionForm = new SuggestionForm();

  menuItems: MenuItem[] = [
    {
      title: 'Feature',
    },
    {
      title: 'UI',
    },
    {
      title: 'UX',
    },
    {
      title: 'Enhancement',
    },
    {
      title: 'Bug',
    },
  ];

  constructor(
    private router: Router,
    private suggestionService: SuggestionsFacade
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.suggestionForm.valid) {
      return;
    }

    const suggestion: Suggestion = {
      title: this.suggestionForm.title.value,
      category: this.suggestionForm.category.value,
      upvotes: 0,
      status: '',
      description: this.suggestionForm.feedback.value,
      comments: [],
    };

    this.suggestionService.createSuggestion(suggestion);
    this.router.navigate(['/']);
  }

  onBackButtonClick() {
    this.router.navigate(['/']);
  }

  onCancelButtonClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}
