import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, JsonResponseArray, TaskCronJobModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TaskCronJobService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllTaskCronJobs(): Observable<JsonResponseArray<TaskCronJobModel>> {
    return this.api.getData(`/task-cron-job`);
  }

  toggleOnOffTaskCronJob(tcrId): Observable<JsonResponse<TaskCronJobModel>> {
    return this.api.putData(`/task-cron-job/${tcrId}`);
  }

}
