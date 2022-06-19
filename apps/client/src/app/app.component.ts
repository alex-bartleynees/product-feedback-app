import { Component, OnDestroy, OnInit } from '@angular/core';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { Subject } from 'rxjs';

@Component({
  selector: 'product-feedback-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private suggestionsFacade: SuggestionsFacade) {}

  ngOnInit() {
    this.suggestionsFacade.loadSuggestions();
    this.suggestionsFacade.mutations$.subscribe(() => {
      this.suggestionsFacade.reset();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
