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

  subsNotif = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bs: BusyService,
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    if (this.subsNotif) {
      this.subsNotif.unsubscribe();
    }
  }

  initForm(): void {
    this.fg = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      content: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      type: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      dismissible: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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
    this.subsNotif = this.adm.createNotif({
      type: this.fg.value.type,
      title: this.fg.value.title,
      content: this.fg.value.content,
      dismissible: this.fg.value.dismissible,
    }).subscribe(
      res => {
        this.gs.log('[FANSUB_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/admin-mod');
      },
      err => {
        this.gs.log('[FANSUB_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    );
  }

}
