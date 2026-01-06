import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-table-header, tr[uiTableHeader]',
  imports: [],
  standalone: true,
  templateUrl: './ui-table-header.component.html',
  styleUrl: './ui-table-header.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableHeader {}
