import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-navbar, nav[uiNavbar]',
  imports: [],
  standalone: true,
  templateUrl: './ui-navbar.component.html',
  styleUrl: './ui-navbar.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [],
})
export class UiNavbar {}
