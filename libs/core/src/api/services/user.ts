import { AdditionalFlagsRequest } from '../models/additional-flags';
import { PaginationRequest, PaginationResponse, ZPaginationResponse } from '../models/pagination';
import {
  MinimalUserResponse,
  UserResponse,
  ZMinimalUserResponse,
  ZUserResponse,
} from '../models/user';
import { zParse } from '../zod';

import {
  toURLSearchParams,
  withAdditionalFlags,
  withPagination,
} from '@/core/to-url-search-params';

import { APP_CONFIG_SERVICE } from '@mgremy/core';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${inject(APP_CONFIG_SERVICE).apiUrl}/v1/users`;

  getUsers(request: {
    pagination: PaginationRequest<MinimalUserResponse>;
    additionalFlags: AdditionalFlagsRequest;
  }): Observable<PaginationResponse<MinimalUserResponse>> {
    const query = toURLSearchParams(
      withPagination(request.pagination),
      withAdditionalFlags(request.additionalFlags)
    );

    return this._http
      .get(`${this._prefix}?${query}`)
      .pipe(zParse(ZPaginationResponse(ZMinimalUserResponse)));
  }

  getUserById(id: string): Observable<UserResponse> {
    return this._http.get(`${this._prefix}/${id}`).pipe(zParse(ZUserResponse));
  }

  deleteUserById(id: string): Observable<unknown> {
    return this._http.delete(`${this._prefix}/${id}`);
  }
}
