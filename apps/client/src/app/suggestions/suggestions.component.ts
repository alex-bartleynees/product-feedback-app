import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { Observable } from 'rxjs';
import { MenuItem } from '../shared/menu/menu.component';

export interface Chip {
  text: string;
  active: boolean;
}

export interface SortBy {
  key: string;
  order: string;
}

@Component({
  selector: 'product-feedback-app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  allSuggestions$ = this.suggestionsFacade.allSuggestions$;
  plannedSuggestions$?: Observable<Suggestion[]>;
  inProgressSuggestions$?: Observable<Suggestion[]>;
  liveSuggestions$?: Observable<Suggestion[]>;
  isMenuOpen = false;
  sortBy: SortBy = { key: 'upvotes', order: 'desc' };
  chipList: Chip[] = [
    {
      text: 'All',
      active: true,
    },
    {
      text: 'UI',
      active: false,
    },
    {
      text: 'UX',
      active: false,
    },
    {
      text: 'Enhancement',
      active: false,
    },
    {
      text: 'Bug',
      active: false,
    },
    {
      text: 'Feature',
      active: false,
    },
  ];
  menuItems: MenuItem[] = [
    {
      title: 'Most Upvotes',
      sortBy: {
        key: 'upvotes',
        order: 'desc',
      },
    },
    {
      title: 'Least Upvotes',
      sortBy: {
        key: 'upvotes',
        order: 'asc',
      },
    },
    {
      title: 'Most Comments',
      sortBy: {
        key: 'comments',
        order: 'desc',
      },
    },
    {
      title: 'Least Comments',
      sortBy: {
        key: 'comments',
        order: 'asc',
      },
    },
  ];
  menuItemSelected: MenuItem = this.menuItems[0];

  constructor(
    private suggestionsFacade: SuggestionsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plannedSuggestions$ = this.suggestionsFacade.filterSuggestions$(
      'status',
      'planned'
    );

    this.inProgressSuggestions$ = this.suggestionsFacade.filterSuggestions$(
      'status',
      'in-progress'
    );

    this.liveSuggestions$ = this.suggestionsFacade.filterSuggestions$(
      'status',
      'live'
    );
  }

  onChipClick(chipList: Chip[], chip: Chip): void {
    if (chip.text === 'All') {
      this.allSuggestions$ = this.suggestionsFacade.allSuggestions$;
      this.resetChipList(chipList, chip);
      return;
    }

    this.allSuggestions$ = this.filterSuggestions('category', chip);
    this.resetChipList(chipList, chip);
  }

  filterSuggestions(key: string, chip: Chip): Observable<Suggestion[]> {
    return this.suggestionsFacade.filterSuggestions$(
      key,
      chip.text.toLowerCase()
    );
  }

  resetChipList(chipList: Chip[], chip: Chip): void {
    chipList.forEach((c) => (c.active = false));
    chip.active = true;
  }

  onMenuItemClick(menuItem: MenuItem): void {
    this.sortBy = menuItem.sortBy;
    this.menuItemSelected = menuItem;
    this.isMenuOpen = false;
  }

  onUpVoteClick(suggestion: Suggestion): void {
    this.suggestionsFacade.upVoteSuggestion(suggestion);
  }

  onSuggestionClick(suggestion: Suggestion): void {
    this.suggestionsFacade.selectSuggestion(suggestion.id);
    this.router.navigate(['/suggestion-detail', suggestion.id]);
  }
}
