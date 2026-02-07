import { Directive, inject } from '@angular/core';
import { NgpMenu } from 'ng-primitives/menu';

const options = ['ngpMenu'];

const error = new Error(`UiMenu must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpMenu][uiMenu]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-menu',
  },
})
export class UiMenu {
  protected readonly ngpMenu = inject(NgpMenu, { optional: true });

  constructor() {
    if (!this.ngpMenu) {
      console.error(this);
      throw error;
    }
  }
}
