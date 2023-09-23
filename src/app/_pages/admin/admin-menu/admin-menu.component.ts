import { Component, OnDestroy, OnInit } from '@angular/core';

import { TaskCronJobModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { TaskCronJobService } from '../../../_shared/services/task-cron-job.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit, OnDestroy {

  cronJobs: TaskCronJobModel[] = [];

  subsCronJobsGet = null;
  subsCronJobsPut = null;
  subsDialog = null;

  constructor(
    private bs: BusyService,
    private gs: GlobalService,
    private as: AuthService,
    private adm: AdminService,
    private ss: StatsServerService,
    private tcj: TaskCronJobService,
    private ds: DialogService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get AS(): AuthService {
    return this.as;
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
      this.getAllTaskCronJobs();
    }
  }

  ngOnDestroy(): void {
    this.subsCronJobsGet?.unsubscribe();
    this.subsCronJobsPut?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  toggleSetting(key: string, checked: boolean): void {
    this.ss.socketEmit('server-set', { [key]: checked });
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
        this.gs.log('[TASK_CRON_JOB_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  async toggleCronJob(t: TaskCronJobModel): Promise<void> {
    const statusRun = t.running ? 'Matikan' : 'Nyalakan';
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `${statusRun} ${t.id}`,
      `Apakah Yakin Ingin Memaksa ${statusRun} Jadwal Ini ?`
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsCronJobsPut = this.tcj.toggleOnOffTaskCronJob(t.id).subscribe({
            next: res => {
              this.gs.log('[TASK_CRON_JOB_TOGGLE_SUCCESS]', res);
              this.bs.idle();
              this.getAllTaskCronJobs();
            },
            error: err => {
              this.gs.log('[TASK_CRON_JOB_TOGGLE_ERROR]', err, 'error');
              this.bs.idle();
              this.getAllTaskCronJobs();
            }
          });
        } else if (re === false) {
          this.getAllTaskCronJobs();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

}
