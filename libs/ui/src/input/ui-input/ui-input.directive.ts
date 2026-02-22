import { Directive, inject } from '@angular/core';
import { NgpInput } from 'ng-primitives/input';

const options = ['ngpInput'];

const error = new Error(`UiInput must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpInput][uiInput]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-input',
  },
})
export class UiInput {
  protected readonly ngpInput = inject(NgpInput, { optional: true });

  constructor() {
    if (!this.ngpInput) {
      console.error(this);
      throw error;
    }
  }
}
