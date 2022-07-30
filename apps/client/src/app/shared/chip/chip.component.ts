import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'product-feedback-app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input() text: string | number = '';
  @Input() active = false;
  @Input() showArrow = false;

  @Output() chipClick = new EventEmitter<string | number>();
  @Output() upVoteClick = new EventEmitter();
}
