import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SuggestionsFacade } from '@product-feedback-app/core-data';

@Component({
  selector: 'product-feedback-app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadMapComponent {
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
