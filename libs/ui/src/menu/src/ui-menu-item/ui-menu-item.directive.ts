import { Directive, inject } from '@angular/core';
import { NgpMenuItem } from 'ng-primitives/menu';

const options = ['ngpMenuItem'];

const error = new Error(`UiMenuItem must be used with ${options.join(' / ')}`);

@Directive({
  selector: '[ngpMenuItem][uiMenuItem]',
  standalone: true,
  host: {
    'data-ui-component': 'ui-menu-item',
  },
})
export class UiMenuItem {
  protected readonly ngpMenuItem = inject(NgpMenuItem, { optional: true });

  constructor() {
    if (!this.ngpMenuItem) {
      console.error(this);
      throw error;
    }
  }
}
