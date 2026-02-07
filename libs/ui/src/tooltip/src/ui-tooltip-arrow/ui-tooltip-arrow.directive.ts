import { Directive, inject } from '@angular/core';
import { NgpTooltipArrow } from 'ng-primitives/tooltip';

const options = ['ngpTooltipArrow'];

const error = new Error(`UiTooltipArrow must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpTooltipArrow][uiTooltipArrow]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-tooltip-arrow',
  },
})
export class UiTooltipArrow {
  protected readonly ngpTooltipArrow = inject(NgpTooltipArrow, { optional: true });

  constructor() {
    if (!this.ngpTooltipArrow) {
      console.error(this);
      throw error;
    }
  }
}
