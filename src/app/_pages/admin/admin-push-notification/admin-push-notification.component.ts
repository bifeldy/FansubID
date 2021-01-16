import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-admin-push-notification',
  templateUrl: './admin-push-notification.component.html',
  styleUrls: ['./admin-push-notification.component.css']
})
export class AdminPushNotificationComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  subsNotifGet = null;
  subsNotifCreate = null;
  subsNotifDelete = null;

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
  maxDateTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private bs: BusyService,
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getNotif();
    }
  }

  ngOnDestroy(): void {
    if (this.subsNotifCreate) {
      this.subsNotifCreate.unsubscribe();
    }
    if (this.subsNotifGet) {
      this.subsNotifGet.unsubscribe();
    }
    if (this.subsNotifDelete) {
      this.subsNotifDelete.unsubscribe();
    }
  }

  initForm(): void {
    this.fg = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      content: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      type: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      dismissible: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      deadline: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
  }

  getNotif(): void {
    this.bs.busy();
    this.subsNotifGet = this.adm.getAllNotif(
      this.q, this.page, this.row, this.sort, this.order
    ).subscribe(
      res => {
        this.gs.log('[NOTIFICATION_LIST_SUCCESS]', res);
        this.count = res.count;
        const notifDataRow = [];
        for (const r of res.results) {
          notifDataRow.push({
            foto: r.user_.image_url,
            Deadline: r.deadline,
            Judul: r.title,
            Konten: r.content,
            Pemilik: r.user_.username,
            Aksi: [{
              type: 'button',
              icon: 'close',
              name: 'Hapus',
              id: r.id
            }]
          });
        }
        this.notifData.row = notifDataRow;
        this.bs.idle();
      },
      err => {
        this.gs.log('[NOTIFICATION_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
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
      deadline: this.fg.value.deadline
    }).subscribe(
      res => {
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
      err => {
        this.gs.log('[NOTIFICATION_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
        this.getNotif();
      }
    );
  }

  deleteNotif(data): void {
    this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE]', data);
    this.bs.busy();
    this.subsNotifGet = this.adm.deleteNotif(data.id).subscribe(
      res => {
        this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_SUCCESS]', res);
        this.bs.idle();
        this.getNotif();
      },
      err => {
        this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_ERROR]', err);
        this.bs.idle();
        this.getNotif();
      }
    );
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

}
