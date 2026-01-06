import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgpMenu } from 'ng-primitives/menu';

@Component({
  selector: 'ui-menu',
  imports: [],
  standalone: true,
  templateUrl: './ui-menu.component.html',
  styleUrl: './ui-menu.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: NgpMenu,
      inputs: [],
      outputs: [],
    },
  ],
})
export class UiMenu {}
