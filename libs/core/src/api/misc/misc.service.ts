import { APP_CONFIG_SERVICE } from '@libs/core/app-config.service';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  private readonly _http = inject(HttpClient);
  private readonly _prefix = `${inject(APP_CONFIG_SERVICE).apiUrl}/v1/misc`;

  antiForgeryToken(): Observable<unknown> {
    return this._http.get(`${this._prefix}/anti-forgery-token`);
  }
}
