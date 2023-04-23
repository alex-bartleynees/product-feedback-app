import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion, User } from '@product-feedback-app/api-interfaces';
import {
  SuggestionsFacade,
  UsersFacade,
} from '@product-feedback-app/core-data';
import { filter, Subject, takeUntil } from 'rxjs';
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
  currentUser!: User;

  menuItems: MenuItem[] = [
    {
      title: 'Feature',
      field: 'feature',
    },
    {
      title: 'UI',
      field: 'ui',
    },
    {
      title: 'UX',
      field: 'ux',
    },
    {
      title: 'Enhancement',
      field: 'enhancement',
    },
    {
      title: 'Bug',
      field: 'bug',
    },
  ];

  statusItems: MenuItem[] = [
    {
      title: 'Suggestion',
      field: 'suggestion',
    },
    {
      title: 'Planned',
      field: 'planned',
    },
    {
      title: 'In-Progress',
      field: 'in-progress',
    },
    {
      title: 'Live',
      field: 'live',
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionsFacade,
    private changeDetectorRef: ChangeDetectorRef,
    private usersFacade: UsersFacade
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
          this.changeDetectorRef.markForCheck();
        });
    }

    this.usersFacade.currentUser$
      .pipe(filter(Boolean))
      .subscribe((user) => (this.currentUser = user));
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
        status: this.suggestionForm.statusControl.value,
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
