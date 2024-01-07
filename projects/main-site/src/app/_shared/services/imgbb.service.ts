import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  uploadImage(image): Observable<JsonResponse> {
    return this.api.postData(`/image`, image, true, {
      headers: {
        'ngsw-bypass': 'true'
      }
    });
  }

}
