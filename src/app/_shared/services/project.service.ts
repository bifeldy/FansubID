import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, JsonResponseArray, ProjectTypeModel } from '../../../models/req-res.model';

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

  getProject(): Observable<JsonResponseArray<ProjectTypeModel>> {
    return this.api.getData(`/project`);
  }

  createProject(notifData): Observable<JsonResponse<ProjectTypeModel>> {
    return this.api.postData('/project', notifData);
  }

  deleteProject(notifId): Observable<JsonResponse<ProjectTypeModel>> {
    return this.api.deleteData(`/project/${notifId}`);
  }

}
