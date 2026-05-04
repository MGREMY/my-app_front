import MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION from '@my-app/core/constants/table-filter-option/minimal-user-response.table-filter-option';

import { AdminService } from '@/core/api/admin/admin.service';
import { AuthService } from '@/core/api/auth/auth.service';
import { MinimalUserResponse } from '@/core/api/user/user.response';
import { UserService } from '@/core/api/user/user.service';
import { paginationContainer } from '@/shared/pagination-container';

import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserListStoreService {
  private readonly _authService = inject(AuthService);
  private readonly _adminService = inject(AdminService);
  private readonly _userService = inject(UserService);

  public readonly userFilterOption = MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION;

  public readonly usersResource = paginationContainer<MinimalUserResponse>({
    stream: ({ params }) =>
      this._authService.isAdmin()
        ? this._adminService.getUsers(params)
        : this._userService.getUsers(params),
  });

  public deleteUser(id: string): void {
    this._adminService
      .deleteUserById(id)
      .pipe(tap(() => this.usersResource.resource.reload()))
      .subscribe();
  }
}
