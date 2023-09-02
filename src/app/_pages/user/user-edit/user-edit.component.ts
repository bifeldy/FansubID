import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { environment } from '../../../../environments/app/environment';

import { CONSTANTS } from '../../../../constants';

import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { CryptoService } from '../../../_shared/services/crypto.service';
import { ToastService } from '../../../_shared/services/toast.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  fg: UntypedFormGroup;

  submitted = false;

  username = null;
  userData = null;

  imagePhoto = null;
  imagePhotoErrorText = null;
  imagePhotoLimitExceeded = null;
  image_photo = null;
  image_photo_original = null;

  imageCover = null;
  imageCoverErrorText = null;
  imageCoverLimitExceeded = null;
  image_cover = null;
  image_cover_original = null;

  passwordHide = true;

  photoImage = null;
  coverImage = null;

  subsUserDetail = null;
  subsImgbb1 = null;
  subsImgbb2 = null;
  subsUserUpdate = null;
  subsVerify = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private bs: BusyService,
    private us: UserService,
    private pi: PageInfoService,
    private fb: UntypedFormBuilder,
    private imgbb: ImgbbService,
    private gs: GlobalService,
    private as: AuthService,
    private cs: CryptoService
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

  togglePassword(): void {
    this.passwordHide = !this.passwordHide;
  }

  ngOnDestroy(): void {
    this.subsUserDetail?.unsubscribe();
    this.subsImgbb1?.unsubscribe();
    this.subsImgbb2?.unsubscribe();
    this.subsUserUpdate?.unsubscribe();
    this.subsVerify?.unsubscribe();
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `User - Ubah Profile`,
      `Halaman Pembaharuan Profile`,
      `Ubah Profile`
    );
    if (this.gs.isBrowser) {
      this.username = this.activatedRoute.snapshot.paramMap.get('username');
      this.bs.busy();
      this.subsUserDetail = this.us.getUserData(this.username).subscribe({
        next: res => {
          this.gs.log('[USER_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserSubject?.value?.id !== res.result.id) {
            this.toast.warning('Profile Ini Milik Orang Lain', 'Whoops!', null, true);
            this.router.navigateByUrl(`/user/${this.username}`);
          } else {
            this.initForm(res.result);
          }
        },
        error: err => {
          this.gs.log('[USER_DETAIL_ERROR]', err, 'error');
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/user/${this.username}`
            }
          });
        }
      });
    }
  }

  initForm(data): void {
    this.fg = this.fb.group({
      nama: [data.kartu_tanda_penduduk_.nama, [Validators.required, Validators.pattern('^[a-zA-Z. ]+$')]],
      description: [data.profile_.description, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      old_password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      new_password: [null, Validators.compose([Validators.minLength(8), Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      image_photo: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      image_cover: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      private: [data.private, Validators.compose([Validators.required])]
    });
    this.image_photo = data.image_url;
    this.image_photo_original = this.image_photo;
    this.image_cover = data.profile_.cover_url;
    this.image_cover_original = this.image_cover;
    this.userData = data;
  }

  uploadPhotoImage(event, photoImage): void {
    this.photoImage = photoImage;
    this.imagePhoto = null;
    this.imagePhotoLimitExceeded = null;
    this.imagePhotoErrorText = null;
    this.fg.controls['image_photo'].patchValue(null);
    this.fg.controls['image_photo'].markAsPristine();
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[IMAGE_PHOTO_SELECTED]', e);
        if (file.size <= CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');
          img.onload = () => {
            this.imagePhoto = file;
            this.image_photo = reader.result.toString();
          };
          img.src = reader.result.toString();
        } else {
          this.imagePhoto = null;
          this.image_photo = '/assets/img/form/image-error.png';
          this.imagePhotoLimitExceeded = CONSTANTS.fileSizeImageLimit;
          this.photoImage.clear(event);
        }
      };
    } catch (error) {
      this.imagePhoto = null;
      this.image_photo = this.image_photo_original;
      this.photoImage.clear(event);
    }
  }

  submitPhotoImage(): void {
    this.submitted = true;
    this.subsImgbb1 = this.imgbb.uploadImage({
      file: this.imagePhoto
    }).subscribe({
      next: res => {
        this.gs.log('[IMAGE_PHOTO_SUCCESS]', res);
        this.fg.controls['image_photo'].patchValue(res.result.url);
        this.fg.controls['image_photo'].markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_PHOTO_ERROR]', err, 'error');
        this.fg.controls['image_photo'].patchValue(null);
        this.fg.controls['image_photo'].markAsPristine();
        this.submitted = false;
        this.imagePhotoErrorText = err.result?.message || err.info;
      }
    });
  }

  uploadCoverImage(event, coverImage): void {
    this.coverImage = coverImage;
    this.imageCover = null;
    this.imageCoverLimitExceeded = null;
    this.imageCoverErrorText = null;
    this.fg.controls['image_cover'].patchValue(null);
    this.fg.controls['image_cover'].markAsPristine();
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[IMAGE_COVER_SELECTED]', e);
        if (file.size <= CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');
          img.onload = () => {
            this.imageCover = file;
            this.image_cover = reader.result.toString();
          };
          img.src = reader.result.toString();
        } else {
          this.imageCover = null;
          this.image_cover = '/assets/img/form/image-error.png';
          this.imageCoverLimitExceeded = CONSTANTS.fileSizeImageLimit;
          this.coverImage.clear(event);
        }
      };
    } catch (error) {
      this.imageCover = null;
      this.image_cover = this.image_cover_original;
      this.coverImage.clear(event);
    }
  }

  submitCoverImage(): void {
    this.submitted = true;
    this.subsImgbb2 = this.imgbb.uploadImage({
      file: this.imageCover
    }).subscribe({
      next: res => {
        this.gs.log('[IMAGE_COVER_SUCCESS]', res);
        this.fg.controls['image_cover'].patchValue(res.result.url);
        this.fg.controls['image_cover'].markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_COVER_ERROR]', err, 'error');
        this.fg.controls['image_cover'].patchValue(null);
        this.fg.controls['image_cover'].markAsPristine();
        this.submitted = false;
        this.imageCoverErrorText = err.result?.message || err.info;
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    const body = this.gs.getDirtyValues(this.fg);
    body.old_password = this.cs.hashPassword(this.fg.value.old_password);
    if ('new_password' in body && body.new_password) {
      body.new_password = this.cs.hashPassword(this.fg.value.new_password);
    }
    this.gs.log('[USER_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsUserUpdate = this.us.updateUser(this.username, {
      ...body
    }).subscribe({
      next: res => {
        this.gs.log('[USER_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.as.removeUser();
        this.bs.busy();
        this.subsVerify = this.as.verify(this.as.token).subscribe({
          next: success => {
            this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
            this.bs.idle();
            this.router.navigateByUrl(`/user/${this.username}`);
          },
          error: error => {
            this.gs.log('[VERIFY_LOGIN_ERROR]', error, 'error');
            this.bs.idle();
            this.as.removeUser();
            this.router.navigateByUrl(`/user/${this.username}`);
          }
        });
      },
      error: err => {
        this.gs.log('[USER_EDIT_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  changeUname(): void {
    const adminList = ['bifeldy'];
    this.router.navigate(['/create/mailbox'], {
      queryParams: {
        subject: '[ReqUName] Pengajuan Ganti Username',
        to: adminList.map(e => `${e}@${environment.domain}`).join(','),
        cc: this.as.currentUserSubject?.value?._email
      }
    });
  }

}
