import { Injectable } from '@angular/core';

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

  uploadImage(imageFile, binaryDataNotBase64 = true): any {
    let imageData = null;
    if (!binaryDataNotBase64) {
      imageData = imageFile.startsWith('data:image/gif;base64,') ? imageFile.slice(22, imageFile.length) : imageFile;
    } else {
      imageData = imageFile;
    }
    return this.api.postData(`/image`, {
      file: imageData
    }, binaryDataNotBase64);
  }
}
