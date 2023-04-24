import { Component } from '@angular/core';
import { SuggestionsFacade } from '@product-feedback-app/core-data';

@Component({
  selector: 'product-feedback-app-roadmap-tile',
  templateUrl: './roadmap-tile.component.html',
  styleUrls: ['./roadmap-tile.component.scss'],
})
export class RoadMapTileComponent {
  plannedSuggestions$ = this.suggestionsFacade.filterSuggestions$(
    'status',
    'planned'
  );
  inProgressSuggestions$ = this.suggestionsFacade.filterSuggestions$(
    'status',
    'in-progress'
  );
  liveSuggestions$ = this.suggestionsFacade.filterSuggestions$(
    'status',
    'live'
  );
  constructor(private suggestionsFacade: SuggestionsFacade) {}
}
