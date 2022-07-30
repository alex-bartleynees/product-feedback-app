import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'product-feedback-app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() style = '';
}
