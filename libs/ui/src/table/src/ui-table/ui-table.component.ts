import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-table, table[uiTable]',
  imports: [NgTemplateOutlet],
  standalone: true,
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTable {
  readonly tableHeader = input<TemplateRef<unknown>>();
  readonly tableBody = input<TemplateRef<unknown>>();
  readonly tableFooter = input<TemplateRef<unknown>>();

  readonly data = input<unknown[]>();
}
