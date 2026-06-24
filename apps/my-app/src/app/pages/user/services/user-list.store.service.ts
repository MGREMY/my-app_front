import MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION from '@my-app/core/constants/table-filter-option/minimal-user-response.table-filter-option';
import { AppValidationDialog } from '@my-app/shared/dialog/validation.dialog';

import { AdditionalFlagsRequest } from '@/core/api/models/additional-flags';
import { MinimalUserResponse } from '@/core/api/models/user';
import { AuthService } from '@/core/api/services/auth';
import { UserService } from '@/core/api/services/user';
import { paginationContainer } from '@/shared/pagination-container';

import { APP_TRANSLATION_SERVICE } from '@mgremy/core';
import { NgpDialogManager } from 'ng-primitives/dialog';

import { inject, Injectable, signal } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _dialogManager = inject(NgpDialogManager);
  private readonly _translationService = inject(APP_TRANSLATION_SERVICE);

  public readonly userFilterOption = MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION;

  public readonly canDelete = signal(this._authService.isAdmin());
  public readonly canApplyAdditionalFlags = signal(this._authService.isAdmin());
  public readonly additionalFlags = signal<AdditionalFlagsRequest>({
    includeDeletedItems: false,
  });

  public readonly usersResource = paginationContainer<MinimalUserResponse>({
    stream: ({ params }) =>
      this._userService.getUsers({
        pagination: params,
        additionalFlags: this.additionalFlags(),
      }),
  });

  public deleteUser(id: string): void {
    AppValidationDialog.open(this._dialogManager, {
      title: this._translationService.instant('validation.user_delete.title'),
      description: this._translationService.instant('validation.user_delete.description', {
        id: id,
      }),
      type: 'ok_cancel',
    }).subscribe((result) => {
      if (result === 'ok') {
        this._userService.deleteUserById(id).subscribe({
          next: () => this.usersResource.resource.reload(),
        });
      }
    });
  }
}
