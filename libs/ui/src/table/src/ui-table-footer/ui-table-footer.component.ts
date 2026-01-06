import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-table-footer, tr[uiTableFooter]',
  imports: [],
  standalone: true,
  templateUrl: './ui-table-footer.component.html',
  styleUrl: './ui-table-footer.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableFooter {}
