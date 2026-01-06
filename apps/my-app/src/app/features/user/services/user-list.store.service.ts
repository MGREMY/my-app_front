import { UserService } from '@my-app/core/api/user/user.service';
import { paginationContainer } from '@my-app/shared/pagination-container';

import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _userService = inject(UserService);

  public usersResource = paginationContainer({
    stream: ({ params }) => this._userService.get(params),
  });
}
