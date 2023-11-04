import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { CONSTANTS } from '../../../../constants';

import { environment } from '../../../../environments/app/environment';

import { CanComponentDeactivate } from '../../../_shared/guards/leave-page.guard';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { TicketService } from '../../../_shared/services/ticket.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  fg: UntypedFormGroup;

  captchaRef = null;

  submitted = false;

  subsUser = null;
  subsDialog = null;
  subsTicket = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private as: AuthService,
    private bs: BusyService,
    private pi: PageInfoService,
    private ticket: TicketService,
    private gs: GlobalService,
    private ds: DialogService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get G_CAPTCHA_SITE_KEY(): string {
    return CONSTANTS.gCaptchaSiteKey;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Ticket - Permintaan Baru`,
      `Halaman Permohonan Baru`,
      `Ajukan Permintaan Permohonan`
    );
    if (this.gs.isBrowser) {
      this.initForm();
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.fg?.controls['contact_email']?.patchValue(user._email);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsTicket?.unsubscribe();
  }

  async canDeactivate(): Promise<boolean> {
    const closeDialog = await this.ds.leavePageDialog();
    return await firstValueFrom(closeDialog);
  }

  initForm(): void {
    const url = this.activatedRoute.snapshot.queryParamMap.get('url') || null;
    this.fg = this.fb.group({
      url: [url, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexUrl)])],
      contact_email: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEmail)])],
      reported_issue: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      expected_solution: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      'g-recaptcha-response': [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]]
    });
  }

  captcha(captchaResponse, captchaRef): void {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    if (captchaResponse) {
      this.captchaRef = captchaRef;
      this.fg.controls['g-recaptcha-response'].patchValue(captchaResponse);
    } else {
      if (this.fg.value['g-recaptcha-response']) {
        this.fg.controls['g-recaptcha-response'].patchValue(null);
      }
    }
  }

  showInfo(message: string) {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: 'Pembuatan Laporan',
        htmlMessage: message,
        confirmText: 'Tutup'
      }
    }).afterClosed().subscribe({
      next: r => {
        this.gs.log('[INFO_DIALOG_CLOSED]', r);
        this.subsDialog.unsubscribe();
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
    this.subsTicket = this.ticket.createTicket({
      url: this.fg.value.url,
      contact_email: this.fg.value.contact_email,
      reported_issue: this.fg.value.reported_issue,
      expected_solution: this.fg.value.expected_solution,
      'g-recaptcha-response': this.fg.value['g-recaptcha-response']
    }).subscribe({
      next: res => {
        this.gs.log('[NEWS_CREATE_SUCCESS]', res);
        const urlTicket = `${environment.baseUrl}/ticket/${res.result.id}?secret=${res.result.secret}`;
        this.showInfo(`
          Terima kasih telah turut ikut serta dalam menjaga dan mengawasi ${environment.siteName}.
          Harap simpan URL dan gunakan untuk melihat progressnya ::
          <a href="${urlTicket}" target="_self" class="text-decoration-none">${urlTicket}</a>
        `);
        this.submitted = false;
        this.bs.idle();
        this.router.navigate([`/ticket/${res.result.id}`], {
          state: {
            bypassCanDeactivate: true
          },
          queryParams: {
            secret: res.result.secret
          }
        });
      },
      error: err => {
        this.gs.log('[NEWS_CREATE_ERROR]', err, 'error');
        this.showInfo(err.result?.message || err.info);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
