import { PaginationRequest, toURLSearchParams } from '../pagination/pagination.request';
import { PaginationResponse, ZPaginationResponse } from '../pagination/pagination.response';
import { MinimalUserResponse, ZMinimalUserResponse } from './minimal-user.response';
import { UserDeleteRequest } from './user-delete-dto/user-delete.request';
import { UserGetByIdRequest } from './user-get-by-id-dto/user-get-by-id.request';
import { UserResponse, ZUserResponse } from './user.response';

import { zParse } from '@libs/core/api/zod';
import { APP_CONFIG_SERVICE } from '@libs/core/app-config.service';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${inject(APP_CONFIG_SERVICE).apiUrl}/v1/users`;

  get(
    request: PaginationRequest<MinimalUserResponse>
  ): Observable<PaginationResponse<MinimalUserResponse>> {
    return this._http
      .get(`${this._prefix}?${toURLSearchParams(request)}`)
      .pipe(zParse(ZPaginationResponse(ZMinimalUserResponse)));
  }

  getById(request: UserGetByIdRequest): Observable<UserResponse> {
    return this._http.get(`${this._prefix}/${request.id}`).pipe(zParse(ZUserResponse));
  }

  delete(request: UserDeleteRequest): Observable<unknown> {
    return this._http.delete(`${this._prefix}/${request.id}`);
  }
}
