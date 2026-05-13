import {
  PaginationRequest,
  paginationRequestToURLSearchParams,
  PaginationResponse,
  ZPaginationResponse,
} from '../pagination/pagination.request';
import { zParse } from '../zod';
import {
  MinimalUserResponse,
  UserResponse,
  ZMinimalUserResponse,
  ZUserResponse,
} from './user.response';

import { APP_CONFIG_SERVICE } from '@/core/app-config.service';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${inject(APP_CONFIG_SERVICE).apiUrl}/v1/users`;

  getUsers(
    request: PaginationRequest<MinimalUserResponse>
  ): Observable<PaginationResponse<MinimalUserResponse>> {
    return this._http
      .get(`${this._prefix}?${paginationRequestToURLSearchParams(request)}`)
      .pipe(zParse(ZPaginationResponse(ZMinimalUserResponse)));
  }

  getUserById(id: string): Observable<UserResponse> {
    return this._http.get(`${this._prefix}/${id}`).pipe(zParse(ZUserResponse));
  }
}
