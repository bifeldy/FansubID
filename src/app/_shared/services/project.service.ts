import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getProject(): Observable<any> {
    return this.api.getData(`/project`);
  }

  createProject(notifData): Observable<any> {
    return this.api.postData('/project', notifData);
  }

  deleteProject(notifId): Observable<any> {
    return this.api.deleteData(`/project/${notifId}`);
  }

}
