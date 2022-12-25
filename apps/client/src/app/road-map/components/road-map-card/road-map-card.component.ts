import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { SuggestionsFacade } from '@product-feedback-app/core-data';

@Component({
  selector: 'product-feedback-app-road-map-card',
  templateUrl: './road-map-card.component.html',
  styleUrls: ['./road-map-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadMapCardComponent {
  @Input() suggestion?: Suggestion;

  constructor(private suggestionsFacade: SuggestionsFacade) {}

  handleUpVoteClick(suggestion: Suggestion) {
    this.suggestionsFacade.upVoteSuggestion(suggestion);
  }
}
