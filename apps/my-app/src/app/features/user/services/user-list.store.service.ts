import MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION from '@my-app/core/constants/table-filter-option/minimal-user-response.table-filter-option';

import { MinimalUserResponse } from '@/core/api/user/user.response';
import { AdminService } from '@/core/api/admin/admin.service';
import { paginationContainer } from '@/shared/pagination-container';

import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _adminService = inject(AdminService);

  public readonly userFilterOption = MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION;

  public readonly usersResource = paginationContainer<MinimalUserResponse>({
    stream: ({ params }) => this._adminService.getUsers(params),
  });

  public deleteUser(id: string): void {
    this._adminService.deleteUserById(id).subscribe();
  }
}
