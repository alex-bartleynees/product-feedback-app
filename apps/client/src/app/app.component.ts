import { Component, OnInit } from '@angular/core';
import { SuggestionsFacade } from '@product-feedback-app/core-data';

@Component({
  selector: 'product-feedback-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private suggestionsFacade: SuggestionsFacade) {}

  ngOnInit() {
    this.suggestionsFacade.loadSuggestions();
  }
}
