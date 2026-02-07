import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-loader',
  imports: [],
  standalone: true,
  templateUrl: './ui-loader.component.html',
  styleUrl: './ui-loader.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
  },
})
export class UiLoader {}
