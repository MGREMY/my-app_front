import { Directive, inject } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpComboboxButton } from 'ng-primitives/combobox';
import { NgpMenuTrigger } from 'ng-primitives/menu';

const options = ['ngpButton', 'ngpComboboxButton', 'ngpMenuTrigger'];

const error = new Error(`UiButton must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpButton][uiButton], [ngpComboboxButton][uiButton], [ngpMenuTrigger][uiButton]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-button',
  },
})
export class UiButton {
  protected readonly ngpButton = inject(NgpButton, { optional: true });
  protected readonly ngpComboboxButton = inject(NgpComboboxButton, { optional: true });
  protected readonly ngpMenuTrigger = inject(NgpMenuTrigger, { optional: true });

  constructor() {
    if (!this.ngpButton && !this.ngpComboboxButton && !this.ngpMenuTrigger) {
      console.error(this);
      throw error;
    }
  }
}
