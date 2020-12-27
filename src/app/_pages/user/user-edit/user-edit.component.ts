import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import CryptoJS from 'crypto-js';

import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';

import { environment } from '../../../../environments/client/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  username = null;
  userData = null;

  imagePhoto = null;
  imagePhotoErrorText = null;
  // tslint:disable-next-line: variable-name
  image_photo = null;
  // tslint:disable-next-line: variable-name
  image_photo_original = null;

  imageCover = null;
  imageCoverErrorText = null;
  // tslint:disable-next-line: variable-name
  image_cover = null;
  // tslint:disable-next-line: variable-name
  image_cover_original = null;

  passwordHide = true;

  photoImage = null;
  coverImage = null;

  subsParam = null;
  subsUserDetail = null;
  subsImgbb1 = null;
  subsImgbb2 = null;
  subsUserUpdate = null;
  subsVerify = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private bs: BusyService,
    private us: UserService,
    private pi: PageInfoService,
    private fb: FormBuilder,
    private imgbb: ImgbbService,
    public gs: GlobalService,
    public as: AuthService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  togglePassword(): void {
    this.passwordHide = !this.passwordHide;
  }

  ngOnDestroy(): void {
    if (this.subsParam) {
      this.subsParam.unsubscribe();
    }
    if (this.subsUserDetail) {
      this.subsUserDetail.unsubscribe();
    }
    if (this.subsImgbb1) {
      this.subsImgbb1.unsubscribe();
    }
    if (this.subsImgbb2) {
      this.subsImgbb2.unsubscribe();
    }
    if (this.subsUserUpdate) {
      this.subsUserUpdate.unsubscribe();
    }
    if (this.subsVerify) {
      this.subsVerify.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `User - Ubah Profile`,
      `Halaman Pembaharuan Profile`,
      `Ubah Profile`
    );
    if (this.gs.isBrowser) {
      this.subsParam = this.activatedRoute.params.subscribe(params => {
        this.username = params.username;
        this.bs.busy();
        this.subsUserDetail = this.us.getUserData(this.username).subscribe(
          res => {
            this.gs.log('[USER_DETAIL_SUCCESS]', res);
            this.bs.idle();
            if (this.as.currentUserValue.id !== res.result.id) {
              if (this.gs.isBrowser) {
                this.toast.warning('Profile Ini Milik Orang Lain', 'Whoops!');
              }
              this.router.navigateByUrl(`/user/${this.username}`);
            } else {
              this.initForm(res.result);
            }
          },
          err => {
            this.gs.log('[USER_DETAIL_ERROR]', err);
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: `/user/${this.username}`
              }
            });
          }
        );
      });
    }
  }

  initForm(data): void {
    this.fg = this.fb.group({
      description: [data.profile_.description, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      new_password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(this.gs.allKeyboardKeysRegex)
        ])
      ],
      image_photo: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image_cover: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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
    this.fg.controls.image_photo.patchValue(null);
    this.fg.controls.image_photo.markAsPristine();
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[ImgCoverLoad]', e);
        if (file.size < 256 * 1000) {
          const img = document.createElement('img');
          img.onload = () => {
            this.imagePhoto = file;
            this.image_photo = reader.result.toString();
          };
          img.src = reader.result.toString();
          this.imagePhotoErrorText = null;
        } else {
          this.imagePhoto = null;
          this.image_photo = '/assets/img/form-image-error.png';
          this.imagePhotoErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
          this.photoImage.clear(event);
        }
      };
    } catch (error) {
      this.imagePhoto = null;
      this.imagePhotoErrorText = null;
      this.image_photo = this.image_photo_original;
      this.photoImage.clear(event);
    }
  }

  submitPhotoImage(): void {
    this.submitted = true;
    this.subsImgbb1 = this.imgbb.uploadImage({
      file: this.imagePhoto
    }).subscribe(
      res => {
        this.gs.log('[IMAGE_PHOTO_SUCCESS]', res);
        this.fg.controls.image_photo.patchValue(res.result.url);
        this.fg.controls.image_photo.markAsDirty();
        this.submitted = false;
      },
      err => {
        this.gs.log('[IMAGE_PHOTO_ERROR]', err);
        this.fg.controls.image_photo.patchValue(null);
        this.fg.controls.image_photo.markAsPristine();
        this.submitted = false;
      }
    );
  }

  uploadCoverImage(event, coverImage): void {
    this.coverImage = coverImage;
    this.imageCover = null;
    this.fg.controls.image_cover.patchValue(null);
    this.fg.controls.image_cover.markAsPristine();
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[ImgCoverLoad]', e);
        if (file.size < 256 * 1000) {
          const img = document.createElement('img');
          img.onload = () => {
            this.imageCover = file;
            this.image_cover = reader.result.toString();
          };
          img.src = reader.result.toString();
          this.imageCoverErrorText = null;
        } else {
          this.imageCover = null;
          this.image_cover = '/assets/img/form-image-error.png';
          this.imageCoverErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
          this.coverImage.clear(event);
        }
      };
    } catch (error) {
      this.imageCover = null;
      this.imageCoverErrorText = null;
      this.image_cover = this.image_cover_original;
      this.coverImage.clear(event);
    }
  }

  submitCoverImage(): void {
    this.submitted = true;
    this.subsImgbb2 = this.imgbb.uploadImage({
      file: this.imageCover
    }).subscribe(
      res => {
        this.gs.log('[IMAGE_COVER_SUCCESS]', res);
        this.fg.controls.image_cover.patchValue(res.result.url);
        this.fg.controls.image_cover.markAsDirty();
        this.submitted = false;
      },
      err => {
        this.gs.log('[IMAGE_COVER_ERROR]', err);
        this.fg.controls.image_cover.patchValue(null);
        this.fg.controls.image_cover.markAsPristine();
        this.submitted = false;
      }
    );
  }

  onSubmit(): void {
    this.bs.busy();
    const body = this.gs.getDirtyValues(this.fg);
    this.gs.log('[USER_EDIT_DIRTY]', body);
    if ('new_password' in body) {
      body.new_password = CryptoJS.SHA512(this.fg.value.new_password).toString();
    }
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsUserUpdate = this.us.updateUser(this.username, {
      ...body
    }).subscribe(
      res => {
        this.gs.log('[USER_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.as.removeUser();
        localStorage.setItem(environment.tokenName, res.result.token);
        this.bs.busy();
        this.subsVerify = this.as.verify(res.result.token).subscribe(
          success => {
            this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
            this.bs.idle();
            this.router.navigateByUrl(`/user/${this.username}`);
          },
          error => {
            this.gs.log('[VERIFY_LOGIN_ERROR]', error);
            this.bs.idle();
            this.as.removeUser();
            this.router.navigateByUrl(`/user/${this.username}`);
          }
        );
      },
      err => {
        this.gs.log('[USER_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    );
  }

}
