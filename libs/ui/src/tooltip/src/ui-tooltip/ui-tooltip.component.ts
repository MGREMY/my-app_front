import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

@Component({
  selector: 'ui-tooltip',
  imports: [],
  standalone: true,
  templateUrl: './ui-tooltip.component.html',
  styleUrl: './ui-tooltip.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: NgpTooltip,
      inputs: [],
      outputs: [],
    },
  ],
})
export class UiTooltip {}
