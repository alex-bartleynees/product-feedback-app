import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SuggestionsFacade } from '@product-feedback-app/core-data';
import { combineLatest, fromEvent, map } from 'rxjs';

@Component({
  selector: 'product-feedback-app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('plannedTab') plannedTab!: ElementRef;
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

  allSuggestions$ = combineLatest([
    this.suggestionsFacade.filterSuggestions$('status', 'planned'),
    this.suggestionsFacade.filterSuggestions$('status', 'in-progress'),
    this.suggestionsFacade.filterSuggestions$('status', 'live'),
  ]).pipe(
    map(([planned, inProgress, live]) => ({ planned, inProgress, live }))
  );

  selectedTab!: HTMLDivElement;
  selectedTabName = 'planned';
  isMobile = window.innerWidth <= 700 ? true : false;

  constructor(
    private suggestionsFacade: SuggestionsFacade,
    private renderer: Renderer2
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 700) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'suggestions');
  }

  ngAfterViewInit(): void {
    this.selectedTab = this.plannedTab.nativeElement;
  }

  tabSelected(tab: string, tabElement: HTMLDivElement) {
    this.renderer.removeClass(this.selectedTab, 'tab__selected');
    this.renderer.removeClass(
      this.selectedTab,
      `tab__selected--${this.selectedTabName}`
    );
    this.selectedTab = tabElement;
    this.selectedTabName = tab;
    this.renderer.addClass(tabElement, `tab__selected`);
    this.renderer.addClass(tabElement, `tab__selected--${tab}`);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'suggestions');
  }
}
