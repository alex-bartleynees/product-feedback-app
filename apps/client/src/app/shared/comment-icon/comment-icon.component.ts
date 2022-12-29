import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'product-feedback-app-comment-icon',
  templateUrl: './comment-icon.component.html',
  styleUrls: ['./comment-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentIconComponent {
  @Input() numberOfComments?: number;
}
