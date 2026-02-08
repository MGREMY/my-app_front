import { MinimalUserResponse } from '@my-app/core/api/user/minimal-user.response';
import { UserService } from '@my-app/core/api/user/user.service';
import MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION from '@my-app/core/constants/table-filter-option/minimal-user-response.table-filter-option';
import { paginationContainer } from '@my-app/shared/pagination-container';

import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _userService = inject(UserService);

  public readonly userFilterOption = MINIMAL_USER_RESPONSE_TABLE_FILTER_OPTION;

  public usersResource = paginationContainer<MinimalUserResponse>({
    stream: ({ params }) => this._userService.get(params),
  });

  public deleteUser(id: string): void {
    this._userService.delete({ id: id }).subscribe();
  }
}
