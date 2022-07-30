import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { Subject, takeUntil } from 'rxjs';
import { SuggestionForm } from '../forms/suggestion-form';
import { MenuItem } from '../shared/menu/menu.component';

@Component({
  selector: 'product-feedback-app-suggestion-edit',
  templateUrl: './suggestion-edit.component.html',
  styleUrls: ['./suggestion-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionEditComponent implements OnInit, OnDestroy {
  editMode = false;
  id?: number;
  suggestionForm = new SuggestionForm();
  selectedSuggestion$ = this.suggestionService.selectedSuggestions$;
  selectedSuggestion?: Suggestion;
  editTitle?: string;

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

  statusItems: MenuItem[] = [
    {
      title: 'Suggestion',
    },
    {
      title: 'Planned',
    },
    {
      title: 'In-Progress',
    },
    {
      title: 'Live',
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionsFacade
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.editMode = true;
      this.suggestionService.selectSuggestion(+id);
    }

    if (this.editMode) {
      this.selectedSuggestion$
        .pipe(takeUntil(this.destroy$))
        .subscribe((suggestion) => {
          this.selectedSuggestion = suggestion;
          this.editTitle = `Editing '${suggestion?.title}'`;
          this.suggestionForm = new SuggestionForm(suggestion);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (!this.suggestionForm.valid) {
      return;
    }
    if (this.editMode && this.selectedSuggestion) {
      const suggestion: Suggestion = {
        id: this.id,
        title: this.suggestionForm.title.value,
        category: this.suggestionForm.category.value,
        upvotes: this.selectedSuggestion?.upvotes,
        status: this.suggestionForm.statusControl.value.toLowerCase(),
        description: this.suggestionForm.description.value,
        comments: this.selectedSuggestion.comments,
      };

      this.suggestionService.updateSuggestion(suggestion);
    } else {
      const suggestion: Suggestion = {
        title: this.suggestionForm.title.value,
        category: this.suggestionForm.category.value,
        upvotes: 0,
        status: '',
        description: this.suggestionForm.description.value,
        comments: [],
      };

      this.suggestionService.createSuggestion(suggestion);
    }

    this.router.navigate(['/']);
  }

  onBackButtonClick() {
    this.router.navigate(['/']);
  }

  onCancelButtonClick(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  onDeleteButtonClick(event: Event) {
    if (!this.id) {
      return;
    }
    event.preventDefault();
    this.suggestionService.deleteSuggestion(this.id);
    this.router.navigate(['/']);
  }
}
