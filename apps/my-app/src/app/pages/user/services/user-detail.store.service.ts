import { AdminService } from '@/core/api/admin/admin.service';
import { AuthService } from '@/core/api/auth/auth.service';
import { UserService } from '@/core/api/user/user.service';

import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable()
export class UserDetailStoreService {
  private readonly _authService = inject(AuthService);
  private readonly _adminService = inject(AdminService);
  private readonly _userService = inject(UserService);

  public readonly userId = signal<string | undefined>(undefined);

  public readonly userResource = rxResource({
    params: () => this.userId(),
    stream: ({ params }) =>
      this._authService.isAdmin()
        ? this._adminService.getUserById(params)
        : this._userService.getUserById(params),
  });
}
