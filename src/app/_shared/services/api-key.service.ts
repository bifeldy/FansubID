import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, ApiKeyModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getUserApiKey(username): Observable<JsonResponse<ApiKeyModel>> {
    return this.api.getData(`/api-key?username=${username}`);
  }

  createApiKey(apiKeyData): Observable<JsonResponse<ApiKeyModel>> {
    return this.api.postData(`/api-key`, apiKeyData);
  }

  revokeApiKey(apiKeyId): Observable<JsonResponse<ApiKeyModel>> {
    return this.api.deleteData(`/api-key/${apiKeyId}`);
  }

}
