import { Component, OnDestroy, OnInit } from '@angular/core';

import { TaskCronJobModel, UserModel } from '../../../../models/req-res.model';
import { ServerInfoModel } from '../../../../models/socket-io.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { TaskCronJobService } from '../../../_shared/services/task-cron-job.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit, OnDestroy {

  currentUser: UserModel = null;
  settings: ServerInfoModel = null;

  cronJobs: TaskCronJobModel[] = [];

  subsUser = null;
  subsCronJobsGet = null;
  subsCronJobsPut = null;

  constructor(
    private bs: BusyService,
    private gs: GlobalService,
    private as: AuthService,
    private adm: AdminService,
    private ss: StatsServerService,
    private tcj: TaskCronJobService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get ADM(): AdminService {
    return this.adm;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.getServerSettings();
      this.getAllTaskCronJobs();
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsCronJobsGet?.unsubscribe();
    this.subsCronJobsPut?.unsubscribe();
  }

  getServerSettings(): void {
    this.ss.socketEmit('server-get', {}, (response: any) => {
      this.gs.log(`[SOCKET_SERVER-GET]`, response);
      this.settings = response;
    });
  }

  toggleSetting(key: string, checked: boolean): void {
    this.ss.socketEmit('server-set', {
      [key]: checked
    }, (response: any) => {
      this.gs.log(`[SOCKET_SERVER-SET]`, response);
      this.settings = response;
    });
  }

  getAllTaskCronJobs(): void {
    this.bs.busy();
    this.subsCronJobsGet = this.tcj.getAllTaskCronJobs().subscribe({
      next: res => {
        this.gs.log('[TASK_CRON_JOB_LIST_SUCCESS]', res);
        this.cronJobs = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[TASK_CRON_JOB_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  toggleCronJob(t: TaskCronJobModel): void {
    this.bs.busy();
    this.subsCronJobsPut = this.tcj.toggleOnOffTaskCronJob(t.id).subscribe({
      next: res => {
        this.gs.log('[TASK_CRON_JOB_TOGGLE_SUCCESS]', res);
        this.bs.idle();
        this.getAllTaskCronJobs();
      },
      error: err => {
        this.gs.log('[TASK_CRON_JOB_TOGGLE_ERROR]', err);
        this.bs.idle();
        this.getAllTaskCronJobs();
      }
    });
  }

}
