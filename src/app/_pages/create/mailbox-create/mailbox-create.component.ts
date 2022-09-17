import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { MailService } from '../../../_shared/services/mail.service';

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
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private pi: PageInfoService,
    private gs: GlobalService,
    private ms: MailService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
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
    this.fg = this.fb.group({
      to: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEmailMulti)])],
      cc: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEmailMulti)])],
      bcc: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEmailMulti)])],
      subject: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      message: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])]
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

}
