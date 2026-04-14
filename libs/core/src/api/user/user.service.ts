import {
  PaginationRequest,
  PaginationResponse,
  toURLSearchParams,
  ZPaginationResponse,
} from '../pagination/pagination.request';
import {
  MinimalUserResponse,
  UserResponse,
  ZMinimalUserResponse,
  ZUserResponse,
} from './user.response';

import { zParse } from '@/core/api/zod';
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

  get(
    request: PaginationRequest<MinimalUserResponse>
  ): Observable<PaginationResponse<MinimalUserResponse>> {
    return this._http
      .get(`${this._prefix}?${toURLSearchParams(request)}`)
      .pipe(zParse(ZPaginationResponse(ZMinimalUserResponse)));
  }

  getById(id: string): Observable<UserResponse> {
    return this._http.get(`${this._prefix}/${id}`).pipe(zParse(ZUserResponse));
  }

  delete(id: string): Observable<unknown> {
    return this._http.delete(`${this._prefix}/${id}`);
  }
}
