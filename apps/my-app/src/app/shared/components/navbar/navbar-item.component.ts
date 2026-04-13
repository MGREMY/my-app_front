import { AppNavbarContent } from './navbar-content.component';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar-item, button[appNavbarItem], a[appNavbarItem]',
  imports: [],
  standalone: true,
  template: `<ng-content />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
  },
  hostDirectives: [],
})
export class AppNavbarItem {
  private readonly _navbarContent = inject(AppNavbarContent);

  protected onClick(): void {
    this._navbarContent.toggle(false);
  }
}
