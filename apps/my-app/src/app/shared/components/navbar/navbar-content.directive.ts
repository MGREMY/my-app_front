import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appNavbarContent], ul[appNavbarContent]',
  standalone: true,
  providers: [],
  host: {
    '[attr.data-enter]': 'isOpen() === true ? true : null',
    '[attr.data-exit]': 'isOpen() === false ? false : null',
  },
  hostDirectives: [],
  exportAs: 'appNavbarContent',
})
export class AppNavbarContent {
  protected readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  toggle(newVal?: boolean | undefined): void {
    if (newVal === undefined) {
      const value = this._isOpen();
      newVal = !value;
    }

    this._isOpen.set(newVal);
  }
}
