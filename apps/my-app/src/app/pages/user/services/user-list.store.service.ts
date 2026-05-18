import MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION from '@my-app/core/constants/table-filter-option/minimal-user-response.table-filter-option';

import { AdditionalFlagsRequest } from '@/core/api/additional-flags/additional-flags.request';
import { AuthService } from '@/core/api/auth/auth.service';
import { MinimalUserResponse } from '@/core/api/user/user.response';
import { UserService } from '@/core/api/user/user.service';
import { paginationContainer } from '@/shared/pagination-container';

import { inject, Injectable, signal } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);

  public readonly userFilterOption = MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION;

  public readonly canDelete = signal(this._authService.isAdmin());
  public readonly canApplyAdditionalFlags = signal(this._authService.isAdmin());
  public readonly additionalFlags = signal<AdditionalFlagsRequest>({
    includeDeletedItems: true,
  });

  public readonly usersResource = paginationContainer<MinimalUserResponse>({
    stream: ({ params }) => this._userService.getUsers(params, this.additionalFlags()),
  });

  public deleteUser(id: string): void {
    this._userService.deleteUserById(id).subscribe({
      next: () => this.usersResource.resource.reload(),
    });
  }
}
