import { PaginationRequest } from '@app-core/api/pagination/pagination.request';
import { UserService } from '@app-core/api/user/user.service';

import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable()
export class UserListStoreService {
  private readonly _userService = inject(UserService);

  public readonly paginationRequest = signal<PaginationRequest | undefined>(undefined);

  public readonly users = rxResource({
    params: () => this.paginationRequest(),
    stream: ({ params }) => this._userService.get(params),
  });
}
