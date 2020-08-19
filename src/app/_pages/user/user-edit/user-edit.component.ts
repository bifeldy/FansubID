import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  fg: FormGroup;

  submitted = false;

  username = null;
  userData = null;

  // tslint:disable-next-line: variable-name
  image_photo = null;
  imagePhotoErrorText = null;

  // tslint:disable-next-line: variable-name
  image_cover = null;
  imageCoverErrorText = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private gs: GlobalService,
    private bs: BusyService,
    private us: UserService,
    private pi: PageInfoService,
    private fb: FormBuilder,
    public as: AuthService
  ) { }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `User - Ubah Profile`,
      `Halaman Pembaharuan Profile`,
      `Ubah Profile`
      );
    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.bs.busy();
      this.us.getUserData(this.username).subscribe(
        res => {
          this.gs.log('[USER_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserValue.id !== res.result.id) {
            this.toast.warning('Profile Ini Milik Orang Lain', 'Whoops!');
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

  initForm(data): void {
    this.fg = this.fb.group({
      description: [data.profile_.description, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image_photo: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image_cover: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
    this.image_photo = data.image_url;
    this.image_cover = data.profile_.cover_url;
    this.userData = data;
  }

  uploadPhotoImage(event): void {
    this.fg.controls.image_photo.patchValue(null);
    const file = event.target.files[0];
    this.image_photo = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      if (file.size < 256000) {
        const img = document.createElement('img');
        img.onload = () => {
          this.image_photo = reader.result.toString();
          this.fg.controls.image_photo.patchValue(file);
          this.fg.controls.image_photo.markAsDirty();
        };
        img.src = reader.result.toString();
        this.imagePhotoErrorText = null;
      } else {
        this.image_photo = '/assets/img/form-image-error.png';
        this.fg.controls.image_photo.patchValue(null);
        this.imagePhotoErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
      }
    };
  }

  uploadCoverImage(event): void {
    this.fg.controls.image_cover.patchValue(null);
    const file = event.target.files[0];
    this.image_cover = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      if (file.size < 256000) {
        const img = document.createElement('img');
        img.onload = () => {
          this.image_cover = reader.result.toString();
          this.fg.controls.image_cover.patchValue(file);
          this.fg.controls.image_cover.markAsDirty();
        };
        img.src = reader.result.toString();
        this.imageCoverErrorText = null;
      } else {
        this.image_cover = '/assets/img/form-image-error.png';
        this.fg.controls.image_cover.patchValue(null);
        this.imageCoverErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
      }
    };
  }

  onSubmit(): void {
    this.bs.busy();
    const body = this.gs.getDirtyValues(this.fg);
    this.gs.log('[FANSUB_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.us.updateUser(this.username, {
      image_photo: this.fg.value.image_photo,
      image_cover: this.fg.value.image_cover,
      data: window.btoa(JSON.stringify({
        ...body,
      }))
    }).subscribe(
      res => {
        this.gs.log('[USER_EDIT_SUCCESS]', res);
        this.bs.idle();
        this.as.removeUser();
        localStorage.setItem(environment.tokenName, res.result.token);
        this.bs.busy();
        this.as.verify(res.result.token).subscribe(
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
        this.bs.idle();
        this.submitted = false;
      }
    );
  }
}
