import { UiNavbarContent } from '../ui-navbar-content/ui-navbar-content.component';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'ui-navbar-item, button[uiNavbarItem], a[uiNavbarItem]',
  imports: [],
  standalone: true,
  templateUrl: './ui-navbar-item.component.html',
  styleUrl: './ui-navbar-item.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onClick()',
  },
  hostDirectives: [],
})
export class UiNavbarItem {
  private readonly _uiNavbarContent = inject(UiNavbarContent);

  protected onClick(): void {
    this._uiNavbarContent.toggle(false);
  }
}
