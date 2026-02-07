import { Directive, inject } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

const options = ['ngpComboboxOption'];

const error = new Error(`UiComboboxOption must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpComboboxOption][uiComboboxOption]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-combobox-option',
  },
})
export class UiComboboxOption {
  protected readonly ngpComboboxOption = inject(NgpComboboxOption, { optional: true });

  constructor() {
    if (!this.ngpComboboxOption) {
      console.error(this);
      throw error;
    }
  }
}
