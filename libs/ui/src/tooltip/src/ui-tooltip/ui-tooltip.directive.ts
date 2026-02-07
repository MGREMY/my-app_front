import { Directive, inject } from '@angular/core';
import { NgpTooltip } from 'ng-primitives/tooltip';

const options = ['ngpTooltip'];

const error = new Error(`UiTooltip must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpTooltip][uiTooltip]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-tooltip',
  },
})
export class UiTooltip {
  protected readonly ngpTooltip = inject(NgpTooltip, { optional: true });

  constructor() {
    if (!this.ngpTooltip) {
      console.error(this);
      throw error;
    }
  }
}
