import { Directive, inject } from '@angular/core';
import { NgpComboboxDropdown } from 'ng-primitives/combobox';

const options = ['ngpComboboxDroprown'];

const error = new Error(`UiComboboxDropdown must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpComboboxDropdown][uiComboboxDropdown]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-combobox-dropdown',
  },
})
export class UiComboboxDropdown {
  protected readonly ngpComboboxDropdown = inject(NgpComboboxDropdown, { optional: true });

  constructor() {
    if (!this.ngpComboboxDropdown) {
      console.error(this);
      throw error;
    }
  }
}
