import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgpMenuItem } from 'ng-primitives/menu';

@Component({
  selector: 'ui-menu-item, button[uiMenuItem]',
  imports: [],
  standalone: true,
  templateUrl: './ui-menu-item.component.html',
  styleUrl: './ui-menu-item.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: NgpMenuItem,
      inputs: ['ngpMenuItemDisabled:disabled'],
      outputs: [],
    },
  ],
})
export class UiMenuItem {}
