import { Directive, inject } from '@angular/core';
import { NgpComboboxInput } from 'ng-primitives/combobox';

const options = ['ngpComboboxInput'];

const error = new Error(`UiComboboxInput must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpComboboxInput][uiComboboxInput]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-combobox-input',
  },
})
export class UiComboboxInput {
  protected readonly ngpComboboxInput = inject(NgpComboboxInput, { optional: true });

  constructor() {
    if (!this.ngpComboboxInput) {
      console.error(this);
      throw error;
    }
  }
}
