import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private api: ApiService
  ) {
  }

  getProject(): any {
    return this.api.getData(`/project`);
  }

}
