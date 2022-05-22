import { Component, OnInit } from '@angular/core';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { Observable } from 'rxjs';

export interface Chip {
  text: string;
  active: boolean;
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

  constructor(private suggestionsFacade: SuggestionsFacade) {}

  ngOnInit(): void {
    this.suggestionsFacade.loadSuggestions();
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
}
