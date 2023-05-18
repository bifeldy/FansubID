import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/app/environment';

import { CONSTANTS } from '../../../constants';

import { GlobalService } from '../../_shared/services/global.service';
import { AuthService } from '../../_shared/services/auth.service';
import { BusyService } from '../../_shared/services/busy.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { CryptoService } from '../../_shared/services/crypto.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  usernameUsed = null;
  emailUsed = null;
  captchaRef = null;

  fg: FormGroup;
  submitted = false;

  returnUrl = '/';
  registerImg = '/assets/img/login-register.png';
  registerInfo = 'Ayo bergabung dan masuk dalam komunitas~';

  subsUser = null;
  subsRegister = null;
  subsVerify = null;
  subsDialog = null;
  subsResendActivation = null;

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private router: Router,
    private bs: BusyService,
    private route: ActivatedRoute,
    private as: AuthService,
    private ds: DialogService,
    private cs: CryptoService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsRegister?.unsubscribe();
    this.subsVerify?.unsubscribe();
    this.subsUser?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsResendActivation?.unsubscribe();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.initForm();
          }
        }
      });
    }
  }

  get G_CAPTCHA_SITE_KEY(): string {
    return CONSTANTS.gCaptchaSiteKey;
  }

  get ENV(): any {
    return environment;
  }

  get registerFormVal(): any {
    return this.fg.controls;
  }

  initForm(): void {
    this.fg = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(8), Validators.pattern('^[a-z0-9]+$')]],
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z. ]+$')]],
      email: [null, [Validators.required, Validators.email, Validators.pattern(CONSTANTS.regexEmail)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      agree_tatib: [null, [Validators.required]],
      agree_pp: [null, [Validators.required]],
      'g-recaptcha-response': [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
    });
  }

  onClickedSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    this.registerInfo = 'Harap Menunggu ...';
    this.usernameUsed = null;
    this.emailUsed = null;
    this.gs.log('[REGISTER_FORM_REQUEST]', this.fg.value);
    if (this.fg.invalid) {
      this.registerInfo = 'Periksa Dan Isi Kembali Data!';
      this.submitted = false;
      this.bs.idle();
      return;
    }
    if (this.fg.valid) {
      this.submitted = true;
      this.subsRegister = this.as.register({
        username: this.fg.value.username,
        name: this.fg.value.name,
        email: this.fg.value.email,
        password: this.cs.hashPassword(this.fg.value.password),
        agree_tatib: this.fg.value.agree_tatib,
        agree_pp: this.fg.value.agree_pp,
        'g-recaptcha-response': this.fg.value['g-recaptcha-response']
      }).subscribe({
        next: (res: any) => {
          this.gs.log('[REGISTER_FORM_SUCCESS]', res);
          this.bs.idle();
          this.submitted = false;
          this.captchaRef.reset();
          this.registerInfo = res.info;
          this.activationDialog(res);
        },
        error: err => {
          this.gs.log('[REGISTER_FORM_ERROR]', err, 'error');
          this.bs.idle();
          this.submitted = false;
          this.captchaRef.reset();
          this.registerInfo = err.result?.message || err.info;
          this.usernameUsed = err.result.username;
          this.emailUsed = err.result.email;
        }
      });
    }
  }

  activationDialog(res: any) {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: res.result.title,
        htmlMessage: res.result.message,
        confirmText: 'Kirim Ulang Email',
        infoText: res.result.id
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsResendActivation = this.as.resendActivation(res.result.id).subscribe({
            next: success => {
              this.gs.log('[RESEND_ACTIVATION_SUCCESS]', success);
              this.bs.idle();
              this.activationDialog(success);
            },
            error: error => {
              this.gs.log('[RESEND_ACTIVATION_ERROR]', error, 'error');
              this.bs.idle();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  captcha(captchaResponse, captchaRef): void {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    this.captchaRef = captchaRef;
    if (captchaResponse) {
      this.fg.controls['g-recaptcha-response'].patchValue(captchaResponse);
    }
  }

  async openAturanTatib(): Promise<void> {
    if (this.fg.value.agree_tatib) {
      const defaultData = {
        id: 'ATURAN-TATA-TERTIB',
        data: {
          title: 'Aturan Dan Tata Tertib Komunitas',
          htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
          confirmText: 'Ok, Saya Mengerti!',
          cancelText: null
        },
        disableClose: false,
        maxWidth: this.ds.maxWidth
      };
      this.subsDialog = (await this.ds.fetchInformationRegisterMode(defaultData, true)).afterClosed().subscribe({
        next: re => {
          this.gs.log('[ATURAN_TATA_TERTIB_DIALOG_CLOSED]', re);
          this.fg.controls['agree_tatib'].patchValue(re);
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

  async openPrivacyPolicy(): Promise<void> {
    if (this.fg.value.agree_pp) {
      const defaultData = {
        id: 'PRIVACY-POLICY',
        data: {
          title: 'Kebijakan Privasi',
          htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
          confirmText: 'Ok, Saya Mengerti!',
          cancelText: null
        },
        disableClose: false,
        maxWidth: this.ds.maxWidth
      };
      this.subsDialog = (await this.ds.fetchInformationRegisterMode(defaultData, true)).afterClosed().subscribe({
        next: re => {
          this.gs.log('[PRIVACY_POLICY_DIALOG_CLOSED]', re);
          this.fg.controls['agree_pp'].patchValue(re);
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

}
