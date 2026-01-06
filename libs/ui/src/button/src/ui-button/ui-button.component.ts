import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

@Component({
  selector: 'ui-button, button[uiButton], a[uiButton]',
  imports: [],
  standalone: true,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
  },
  hostDirectives: [
    {
      directive: NgpButton,
      inputs: ['disabled'],
      outputs: [],
    },
  ],
})
export class UiButton {
  readonly size = input<ButtonSize>('md');
  readonly variant = input<ButtonVariant>('primary');
}
