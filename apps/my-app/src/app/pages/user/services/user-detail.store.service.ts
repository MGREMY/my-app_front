import { AuthService } from '@/core/api/services/auth';
import { UserService } from '@/core/api/services/user';

import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable()
export class UserDetailStoreService {
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);

  public readonly userId = signal<string | undefined>(undefined);

  public readonly userResource = rxResource({
    params: () => this.userId(),
    stream: ({ params }) => this._userService.getUserById(params),
  });

  public readonly isCurrentUser = computed(() => {
    if (!this.userResource.hasValue()) return false;

    return this._authService.getIdToken().email === this.userResource.value()?.email;
  });
}
