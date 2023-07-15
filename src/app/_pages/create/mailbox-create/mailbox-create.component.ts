import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { environment } from '../../../../environments/app/environment';

import { CONSTANTS } from '../../../../constants';

import { RoleModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { MailService } from '../../../_shared/services/mail.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-mailbox-create',
  templateUrl: './mailbox-create.component.html',
  styleUrls: ['./mailbox-create.component.css']
})
export class MailboxCreateComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  subsMail = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private pi: PageInfoService,
    private gs: GlobalService,
    private as: AuthService,
    private ms: MailService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get canSendAsNoReply(): boolean {
    const role: RoleModel = this.as.currentUserSubject?.value?.role;
    return role === RoleModel.ADMIN || role === RoleModel.MODERATOR;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Mailbox - Buat Baru`,
      `Halaman Membuat Surel Baru`,
      `Create Email`
    );
    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this.subsMail?.unsubscribe();
  }

  initForm(): void {
    const p = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || null;
    const t = [];
    if (p) {
      t.push(p);
    }
    this.fg = this.fb.group({
      to: [t, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEmailMulti)])],
      cc: [[], Validators.compose([Validators.pattern(CONSTANTS.regexEmailMulti)])],
      bcc: [[], Validators.compose([Validators.pattern(CONSTANTS.regexEmailMulti)])],
      subject: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      message: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      no_reply: [false, Validators.compose([Validators.required])]
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
    this.subsMail = this.ms.sendMail(this.fg.value).subscribe({
      next: res => {
        this.gs.log('[MAIL_SEND_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/mailbox');
      },
      error: err => {
        this.gs.log('[MAIL_SEND_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  addTo(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.fg.value.to.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.fg.controls['to'].patchValue(this.fg.value.to.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
  }

  removeTo(to: any): void {
    const index = this.fg.value.to.indexOf(to);
    if (index >= 0) {
      this.fg.value.to.splice(index, 1);
    }
  }

  addCc(event: MatChipInputEvent): void {
    const input = event.chipInput.inputElement;
    const value = event.value;
    if ((value || '').trim()) {
      this.fg.value.cc.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.fg.controls['cc'].patchValue(this.fg.value.cc.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
  }

  removeCc(cc: any): void {
    const index = this.fg.value.cc.indexOf(cc);
    if (index >= 0) {
      this.fg.value.cc.splice(index, 1);
    }
  }

  addBcc(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.fg.value.bcc.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.fg.controls['bcc'].patchValue(this.fg.value.bcc.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
  }

  removeBcc(bcc: any): void {
    const index = this.fg.value.bcc.indexOf(bcc);
    if (index >= 0) {
      this.fg.value.bcc.splice(index, 1);
    }
  }

}
