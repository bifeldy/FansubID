import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  constructor(
    private api: ApiService
  ) {
  }

  uploadImage(imageFile): any {
    return this.api.postData(`https://api.imgbb.com/1/upload`, {
      key: environment.imgbbKey,
      name: new Date().getTime(),
      image: imageFile,
    }, true);
  }
}
