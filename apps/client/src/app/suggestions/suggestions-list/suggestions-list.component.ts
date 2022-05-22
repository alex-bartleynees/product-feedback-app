import { Component, Input } from '@angular/core';
import { Suggestion } from '@product-feedback-app/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-feedback-app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss'],
})
export class SuggestionsListComponent {
  @Input() allSuggestions$?: Observable<Suggestion[]>;

  sortBy = 'comments';
  ascending = false;
}
