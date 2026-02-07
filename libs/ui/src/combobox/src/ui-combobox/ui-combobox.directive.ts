import { Directive, inject } from '@angular/core';
import { NgpCombobox } from 'ng-primitives/combobox';

const options = ['ngpCombobox'];

const error = new Error(`UiCombobox must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpCombobox][uiCombobox]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-combobox',
  },
})
export class UiCombobox {
  protected readonly ngpCombobox = inject(NgpCombobox, { optional: true });

  constructor() {
    if (!this.ngpCombobox) {
      console.error(this);
      throw error;
    }
  }
}
