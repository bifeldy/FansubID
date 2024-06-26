import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-list-push-notification',
  templateUrl: './admin-list-push-notification.component.html',
  styleUrls: ['./admin-list-push-notification.component.css']
})
export class AdminListPushNotificationComponent implements OnInit, OnDestroy {

  @ViewChild('kalender', { static: true }) kalender: NgxMatDatetimepicker<any>;

  fg: UntypedFormGroup;

  submitted = false;

  subsNotifGet = null;
  subsNotifCreate = null;
  subsNotifDelete = null;
  subsDialog = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  notifData = {
    column: ['Deadline', 'Judul', 'Konten', 'Pemilik', 'Aksi'],
    row: []
  };

  currentDateTime = new Date();
  maxDateTime = new Date(Date.now() + CONSTANTS.timeMaxDaysNotification);

  constructor(
    private fb: UntypedFormBuilder,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private adm: AdminService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getNotif();
    }
  }

  get maxNotificationDays(): number {
    return CONSTANTS.timeMaxDaysNotification / 24 / 60 / 60 / 1000;
  }

  ngOnDestroy(): void {
    this.subsNotifCreate?.unsubscribe();
    this.subsNotifGet?.unsubscribe();
    this.subsNotifDelete?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  initForm(): void {
    this.fg = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      type: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      dismissible: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      timeout: [null, Validators.compose([Validators.pattern(/^[0-9]+$/)])],
      deadline: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])]
    });
  }

  get dateTimePicker(): any {
    return this.kalender;
  }

  getNotif(): void {
    this.bs.busy();
    if (this.subsNotifGet) {
      this.subsNotifGet.unsubscribe();
      this.bs.idle();
    }
    this.subsNotifGet = this.adm.getAllNotif(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[NOTIFICATION_LIST_SUCCESS]', res);
        this.count = res.count;
        const notifDataRow = [];
        for (const r of res.results) {
          notifDataRow.push({
            foto: r.user_.image_url,
            deleted: new Date(r.deadline).getTime() === new Date(0).getTime(),
            Deadline: r.deadline,
            Judul: r.title,
            Konten: r.content,
            Pemilik: r.user_.username,
            Aksi: (new Date().getTime() > new Date(r.deadline).getTime()) ? [] : [
              { type: 'button', icon: 'close', name: 'Hapus', row: r }
            ]
          });
        }
        this.notifData.row = notifDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[NOTIFICATION_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsNotifCreate = this.adm.createNotif({
      type: this.fg.value.type,
      title: this.fg.value.title,
      content: this.fg.value.content,
      dismissible: (this.fg.value.dismissible === '1'),
      timeout: this.fg.value.timeout,
      deadline: this.fg.value.deadline
    }).subscribe({
      next: res => {
        this.gs.log('[NOTIFICATION_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        for (const c in this.fg.controls) {
          if (this.fg.controls[c]) {
            this.fg.controls[c].patchValue(null);
            this.fg.controls[c].updateValueAndValidity();
            this.fg.controls[c].setErrors(null);
            this.fg.controls[c].markAsUntouched();
            this.fg.controls[c].markAsPristine();
          }
        }
        this.getNotif();
      },
      error: err => {
        this.gs.log('[NOTIFICATION_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getNotif();
      }
    });
  }

  action(data): void {
    this.gs.log('[NOTIFICATION_LIST_CLICK_AKSI]', data);
    if (data.name === 'Hapus') {
      this.deleteNotif(data.row);
    }
    // TODO :: Other Action
  }

  async deleteNotif(data): Promise<void> {
    this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Hapus Notif -- '${data.id}' :: '${data.title}'`,
      'Yakin Akan Menghapus Notifikasi Ini ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsNotifDelete = this.adm.deleteNotif(data.id).subscribe({
            next: res => {
              this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_SUCCESS]', res);
              this.bs.idle();
              this.getNotif();
            },
            error: err => {
              this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_ERROR]', err, 'error');
              this.bs.idle();
              this.getNotif();
            }
          });
        } else if (re === false) {
          this.getNotif();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[NOTIFICATION_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getNotif();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[NOTIFICATION_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getNotif();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[NOTIFICATION_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getNotif();
  }

  openNotif(data): void {
    this.gs.log('[NOTIFICATION_LIST_CLICK_NOTIFICATION]', data);
  }

}
