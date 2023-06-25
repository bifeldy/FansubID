import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

import { SosMedModel } from '../../../models/req-res.model';

import { AuthService } from '../../_shared/services/auth.service';
import { GlobalService } from '../../_shared/services/global.service';
import { UserService } from '../../_shared/services/user.service';
import { BusyService } from '../../_shared/services/busy.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { WinboxService } from '../../_shared/services/winbox.service';

import { environment } from '../../../environments/app/environment';

import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  fg1: FormGroup;
  fg2: FormGroup;

  captchaRef = null;
  submitted = false;

  returnUrl = '/';
  verifyImg = '/assets/img/verify.png';
  verifyInfo = 'Verifikasi akunmu dan dapatkan fitur menarik lainnya~';

  kpuRiUserData = null;

  subsCekNik = null;
  subsVerify1 = null;
  subsVerify2 = null;
  subsSosmed = null;
  subsDialog = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private us: UserService,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private activatedRoute: ActivatedRoute,
    private as: AuthService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  ngOnDestroy(): void {
    this.subsCekNik?.unsubscribe();
    this.subsVerify1?.unsubscribe();
    this.subsVerify2?.unsubscribe();
    this.subsSosmed?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    if (this.returnUrl.includes('/login')) {
      this.returnUrl = '/';
    }
    if (this.gs.isBrowser) {
      this.initKTP();
      const app = this.activatedRoute.snapshot.queryParamMap.get('app' || '');
      const code = this.activatedRoute.snapshot.queryParamMap.get('code') || '';
      if (app && code) {
        this.sosmedVerify(app, code);
      } else if (this.as.currentUserSubject?.value?.verified) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.verifyByKtpDisabled();
      }
    }
  }

  get G_CAPTCHA_SITE_KEY(): string {
    return CONSTANTS.gCaptchaSiteKey;
  }

  sosmedVerify(sosmedApp: string, oAuthCode: string): void {
    this.bs.busy();
    this.subsSosmed = this.us.sosmedLogin({
      app: sosmedApp.toUpperCase(),
      code: oAuthCode
    }).subscribe({
      next: res => {
        this.gs.log('[SOSMED]', res);
        this.bs.idle();
        this.sosmedVerifyResult(res, sosmedApp);
      },
      error: err => {
        this.gs.log('[SOSMED]', err, 'error');
        this.bs.idle();
        this.sosmedVerifyResult(err, sosmedApp);
      }
    });
  }

  sosmedVerifyResult(res: any, sosmedApp: string): void {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: res.result?.title || 'Whoops, Terjadi Kesalahan!',
        htmlMessage: res.result.message,
        confirmText: 'Tutup',
        cancelText: 'Ulangi'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.as.removeUser();
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: this.returnUrl
            }
          });
        } else if (re === false) {
          const app = sosmedApp.toUpperCase();
          if (app === SosMedModel.DISCORD) {
            this.openVerifyDiscordUrl();
          } else if (app === SosMedModel.GOOGLE) {
            this.openVerifyGoogleUrl();
          }
          // TODO :: Other Social Media Platform
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  async verifyByKtpDisabled(): Promise<void> {
    this.subsDialog = (await this.ds.openVerifikasiSosmed()).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.openVerifyDiscordUrl();
        } else if (re === false) {
          this.openVerifyGoogleUrl();
        } else {
          this.router.navigateByUrl(this.returnUrl);
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  openVerifyDiscordUrl(): void {
    this.wb.winboxOpenUri(`${environment.baseUrl}/api/discord-verifikasi`, '_self');
  }

  openVerifyGoogleUrl(): void {
    this.wb.winboxOpenUri(`${environment.baseUrl}/api/google-verifikasi`, '_self');
  }

  initKTP(): void {
    this.fg1 = this.fb.group({
      nik: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      nama: [null, [Validators.required, Validators.pattern('^[a-zA-Z. ]+$')]],
      completed: [null, [Validators.required]],
      'g-recaptcha-response': [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
    });
    this.fg2 = this.fb.group({
      nik: [null, [Validators.pattern(/^\d+$/)]],
      nama: [null, [Validators.pattern('^[a-zA-Z. ]+$')]],
      tempat_lahir: [null, [Validators.pattern('^[a-zA-Z ]+$')]],
      tanggal_lahir: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      jenis_kelamin: [null, [Validators.pattern('^[LP]+$')]],
      golongan_darah: [null, [Validators.pattern('^[ABO]+$')]],
      alamat: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      rt: [null, [Validators.pattern(/^\d+$/)]],
      rw: [null, [Validators.pattern(/^\d+$/)]],
      kelurahan_desa: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      kecamatan: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      agama: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      status_perkawinan: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      pekerjaan: [null, [Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      kewarganegaraan: [null, [Validators.pattern('^[WNIA]+$')]],
    });
  }

  captcha(captchaResponse, captchaRef): void {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    if (captchaResponse) {
      this.captchaRef = captchaRef;
      this.fg1.controls['g-recaptcha-response'].patchValue(captchaResponse);
    } else {
      if (this.fg1.value['g-recaptcha-response']) {
        this.fg1.controls['g-recaptcha-response'].patchValue(null);
      }
    }
  }

  findNik(): void {
    this.bs.busy();
    this.submitted = true;
    this.subsCekNik = this.us.cekNik({
      nik: this.fg1.value.nik,
      nama: this.fg1.value.nama,
      'g-recaptcha-response': this.fg1.value['g-recaptcha-response']
    }).subscribe({
      next: res => {
        this.gs.log('[KPU_RI_CEK_NIK]', res);
        this.bs.idle();
        this.submitted = false;
        if (res.result.message === 'success') {
          this.kpuRiUserData = { ...res.result.data, nik: this.fg1.value.nik };
          this.verifyInfo = `
            ${this.kpuRiUserData.nama} - ${this.kpuRiUserData.jenis_kelamin} - ${this.kpuRiUserData.tempat_lahir} -
            ${this.kpuRiUserData.nik} - ${this.kpuRiUserData.namaKel} - ${this.kpuRiUserData.namaKec} -
            ${this.kpuRiUserData.namaKabko} - ${this.kpuRiUserData.namaPropinsi}
          `.replace(/\n/g, ' ').replace(/ +(?= )/g, '').trim();
          this.fg2.controls['nik'].patchValue(this.kpuRiUserData.nik);
          this.fg2.controls['nama'].patchValue(this.kpuRiUserData.nama);
          this.fg2.controls['jenis_kelamin'].patchValue(this.kpuRiUserData.jenis_kelamin);
          this.fg2.controls['tempat_lahir'].patchValue(this.kpuRiUserData.tempat_lahir);
          this.fg2.controls['kelurahan_desa'].patchValue(this.kpuRiUserData.namaKel);
          this.fg2.controls['kecamatan'].patchValue(this.kpuRiUserData.namaKec);
          this.fg1.controls['completed'].patchValue(true);
          this.stepper.next();
          this.captchaRef.reset();
        } else {
          this.verifyInfo = res.result.data.pesan;
          this.fg1.controls['g-recaptcha-response'].patchValue(null);
          this.fg1.controls['completed'].patchValue(null);
          this.kpuRiUserData = null;
          this.captchaRef.reset();
        }
      },
      error: err => {
        this.gs.log('[KPU_RI_CEK_NIK_ERROR]', err);
        this.bs.idle();
        this.submitted = false;
        this.verifyInfo = err.result?.message || err.info;
        this.captchaRef.reset();
      }
    });
  }

  submitKTP(stepper): void {
    this.bs.busy();
    this.submitted = true;
    const body = this.fg2.value;
    for (const propName in body) {
      if (body[propName] === null || body[propName] === undefined) {
        delete body[propName];
      }
    }
    this.subsVerify1 = this.us.verifyKTP({
      ...body
    }).subscribe({
      next: res => {
        this.gs.log('[USER_VERIFIKASI_SUCCESS]', res);
        this.bs.idle();
        this.submitted = false;
        this.as.removeUser();
        this.bs.busy();
        this.subsVerify2 = this.as.verify(this.as.token).subscribe({
          next: success => {
            this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
            this.bs.idle();
            this.router.navigateByUrl(this.returnUrl);
          },
          error: error => {
            this.gs.log('[VERIFY_LOGIN_ERROR]', error, 'error');
            this.bs.idle();
            this.as.removeUser();
            this.router.navigateByUrl(this.returnUrl);
          }
        });
      },
      error: err => {
        this.gs.log('[USER_VERIFIKASI_ERROR]', err, 'error');
        this.bs.idle();
        this.submitted = false;
        this.verifyInfo = err.result?.message || err.info;
        stepper.reset();
      }
    });
  }

}
