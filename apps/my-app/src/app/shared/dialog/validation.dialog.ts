import { FirstLetterUpperPipe } from './../../../../../../libs/shared/src/pipes/first-letter-upper.pipe';

import { MgnpButton } from '@mgremy/ng-primitives/button';
import {
  MgnpDialog,
  MgnpDialogDescription,
  MgnpDialogOverlay,
  MgnpDialogTitle,
} from '@mgremy/ng-primitives/dialog';
import { injectDialogRef, NgpDialogManager, provideDialogState } from 'ng-primitives/dialog';

import { TranslatePipe } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';

export type AppValidationDialogRequest = {
  title: string;
  description?: string;
  type: 'ok' | 'ok_cancel' | 'cancel';
};
export type AppValidationDialogResponse = 'ok' | 'cancel';

@Component({
  selector: 'app-validation-dialog',
  imports: [
    MgnpDialog,
    MgnpDialogOverlay,
    MgnpDialogTitle,
    MgnpDialogDescription,
    MgnpButton,
    TranslatePipe,
    FirstLetterUpperPipe,
  ],
  template: `
    <div mgnpDialogOverlay>
      <div mgnpDialog>
        <h1 mgnpDialogTitle>{{ _dialogRef.data.title | firstLetterUpper }}</h1>
        @if (_dialogRef.data.description) {
          <p mgnpDialogDescription>{{ _dialogRef.data.description | firstLetterUpper }}</p>
        }
        <div class="mt-4 flex items-center justify-end-safe gap-2">
          @switch (_dialogRef.data.type) {
            @case ('ok') {
              <button
                mgnpButton
                variant="outline"
                color="secondary"
                (click)="close('ok')">
                {{ 'dialog.ok' | translate | firstLetterUpper }}
              </button>
            }
            @case ('ok_cancel') {
              <button
                mgnpButton
                variant="outline"
                color="secondary"
                (click)="close('ok')">
                {{ 'dialog.ok' | translate | firstLetterUpper }}
              </button>
              <button
                mgnpButton
                (click)="close('cancel')">
                {{ 'dialog.cancel' | translate | firstLetterUpper }}
              </button>
            }
            @case ('cancel') {
              <button
                mgnpButton
                (click)="close('cancel')">
                {{ 'dialog.cancel' | translate | firstLetterUpper }}
              </button>
            }
          }
        </div>
      </div>
    </div>
  `,
  providers: [provideDialogState()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppValidationDialog {
  protected readonly _dialogRef = injectDialogRef<AppValidationDialogRequest>();

  static open(
    ngpDialogManager: NgpDialogManager,
    data: AppValidationDialogRequest
  ): Observable<AppValidationDialogResponse> {
    return ngpDialogManager
      .open(AppValidationDialog, {
        closeOnEscape: false,
        closeOnOutsideClick: false,
        data,
      })
      .closed.pipe(map((x) => x.result as AppValidationDialogResponse));
  }

  close(response: AppValidationDialogResponse): void {
    this._dialogRef.close(response);
  }
}
