import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-navbar-item, button[uiNavbarItem], a[uiNavbarItem]',
  imports: [],
  standalone: true,
  templateUrl: './ui-navbar-item.component.html',
  styleUrl: './ui-navbar-item.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [],
})
export class UiNavbarItem {}
