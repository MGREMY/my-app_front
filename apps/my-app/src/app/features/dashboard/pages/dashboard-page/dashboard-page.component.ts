import { MgnpButton } from '@mgremy/ng-primitives/button';
import { NgpButton } from 'ng-primitives/button';

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MgnpButton, NgpButton, RouterLink],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPageComponent {}
