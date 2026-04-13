import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar, nav[appNavbar]',
  imports: [],
  standalone: true,
  template: `<ng-content />`,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [],
})
export class AppNavbar {}
