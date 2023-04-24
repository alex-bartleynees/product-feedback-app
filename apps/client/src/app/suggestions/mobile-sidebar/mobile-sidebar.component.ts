import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chip } from '../suggestions.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'product-feedback-app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MobileSidebarComponent {
  @Input() chipList: Chip[] = [];
  @Output() chipSelected = new EventEmitter();
}
