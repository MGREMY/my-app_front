import { UserDetailStoreService } from '../../services/user-detail.store.service';
import { UserDetailComponent } from '@my-app/features/user/user-detail/user-detail.component';
import { AppError } from '@my-app/shared/components/error/error.component';

import { BaseComponent } from '@/shared/base.component';

import { MgnpLoader } from '@mgremy/ng-primitives-extended/loader';

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-user-detail-page',
  imports: [AppError, UserDetailComponent, MgnpLoader],
  templateUrl: './user-detail.page.html',
  providers: [UserDetailStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailPage extends BaseComponent implements OnInit {
  protected readonly _service = inject(UserDetailStoreService);

  public readonly id = input.required<string>();

  ngOnInit(): void {
    effect(
      () => {
        this._service.userId.set(this.id());
      },
      { injector: this._injector }
    );
  }
}
