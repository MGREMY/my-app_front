import { AppNavbarContent } from './navbar-content.directive';

import { Directive, inject } from '@angular/core';

@Directive({
  selector: '[appNavbarItem]',
  standalone: true,
  providers: [],
  host: {
    '(click)': 'onClick()',
  },
  hostDirectives: [],
  exportAs: 'appNavbarItem',
})
export class AppNavbarItem {
  private readonly _navbarContent = inject(AppNavbarContent);

  protected onClick(): void {
    this._navbarContent.toggle(false);
  }
}
