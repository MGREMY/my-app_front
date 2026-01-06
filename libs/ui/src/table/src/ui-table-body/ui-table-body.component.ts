import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-table-body, tr[uiTableBody]',
  imports: [],
  standalone: true,
  templateUrl: './ui-table-body.component.html',
  styleUrl: './ui-table-body.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableBody {}
