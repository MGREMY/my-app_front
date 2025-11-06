import { Button } from 'flowbite-angular/button';

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  imports: [Button, RouterLink],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPageComponent {}
