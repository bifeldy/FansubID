import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged, retry, switchMap, tap } from 'rxjs/operators';

import { CONSTANTS } from '../../../../constants';

import { RoleModel } from '../../../../models/req-res.model';

import { CanComponentDeactivate } from '../../../_shared/guards/leave-page.guard';

import { GlobalService } from '../../../_shared/services/global.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { ToastService } from '../../../_shared/services/toast.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-fansub-create',
  templateUrl: './fansub-create.component.html',
  styleUrls: ['./fansub-create.component.css']
})
export class FansubCreateComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  fg: UntypedFormGroup;

  submitted = false;

  image = null;
  imageLimitExceeded = null;
  imageErrorText = null;
  image_url = '/assets/img/form/no-image.png';

  cover = null;
  coverLimitExceeded = null;
  coverErrorText = null;
  cover_url = '/assets/img/form/no-image.png';

  urls = [];

  currentDate = new Date();

  gambar = null;
  gambar_ = null;

  subsImgbb = null;
  subsFansub = null;
  subsCekFansubSlug = null;

  slugInfo = '';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private as: AuthService,
    private bs: BusyService,
    private imgbb: ImgbbService,
    private fansub: FansubService,
    private toast: ToastService,
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

  get rssFeedAllowed(): boolean {
    return (
      this.as.currentUserSubject?.value?.role === RoleModel.ADMIN ||
      this.as.currentUserSubject?.value?.role === RoleModel.MODERATOR ||
      this.as.currentUserSubject?.value?.role === RoleModel.FANSUBBER
    );
  }

  ngOnDestroy(): void {
    this.subsImgbb?.unsubscribe();
    this.subsFansub?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  async canDeactivate(): Promise<boolean> {
    const closeDialog = await this.ds.leavePageDialog();
    return await firstValueFrom(closeDialog);
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      born: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      active: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      slug: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9a-zA-Z-]*$/)])],
      tags: [[], Validators.compose([])],
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      cover: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      web: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      facebook: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      discord: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      twitter: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      rss_feed: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])]
    });
    this.slugValueChanged();
  }

  slugValueChanged(): void {
    this.subsCekFansubSlug = this.fg.get('slug').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.slugInfo = 'Mengecek ...'),
      switchMap(slugQuery => this.fansub.cekSlug({ slug: slugQuery })),
      retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[FANSUB_CEK_SLUG_RESULT_SUCCESS]', res);
        this.slugInfo = (res as any).result.message;
      },
      error: err => {
        this.gs.log('[FANSUB_CEK_SLUG_RESULT_ERROR]', err, 'error');
        this.slugValueChanged();
      }
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.fg.value.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.fg.controls['tags'].patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
  }

  removeTag(tag: any): void {
    const index = this.fg.value.tags.indexOf(tag);
    if (index >= 0) {
      this.fg.value.tags.splice(index, 1);
    }
  }

  uploadImage(event, gambar): void {
    this.gambar = gambar;
    this.image = null;
    this.imageLimitExceeded = null;
    this.imageErrorText = null;
    this.fg.controls['image'].patchValue(null);
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[IMAGE_SELECTED]', e);
        if (file.size <= CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');
          img.onload = () => {
            this.image = file;
            this.image_url = reader.result.toString();
          };
          img.src = reader.result.toString();
        } else {
          this.image = null;
          this.image_url = '/assets/img/form/image-error.png';
          this.imageLimitExceeded = CONSTANTS.fileSizeImageLimit;
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.image_url = '/assets/img/form/no-image.png';
      this.gambar.clear(event);
    }
  }

  submitImage(): void {
    this.submitted = true;
    this.subsImgbb = this.imgbb.uploadImage({
      file: this.image
    }).subscribe({
      next: res => {
        this.gs.log('[IMAGE_SUCCESS]', res);
        this.fg.controls['image'].patchValue(res.result.url);
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
        this.submitted = false;
        this.imageErrorText = err.result?.message || err.info;
      }
    });
  }

  uploadCover(event, gambar_): void {
    this.gambar_ = gambar_;
    this.cover = null;
    this.coverLimitExceeded = null;
    this.coverErrorText = null;
    this.fg.controls['cover'].patchValue(null);
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[COVER_SELECTED]', e);
        if (file.size <= CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');
          img.onload = () => {
            this.cover = file;
            this.cover_url = reader.result.toString();
          };
          img.src = reader.result.toString();
        } else {
          this.cover = null;
          this.cover_url = '/assets/img/form/image-error.png';
          this.coverLimitExceeded = CONSTANTS.fileSizeImageLimit;
          this.gambar_.clear(event);
        }
      };
    } catch (error) {
      this.cover = null;
      this.cover_url = '/assets/img/form/no-image.png';
      this.gambar_.clear(event);
    }
  }

  submitCover(): void {
    this.submitted = true;
    this.subsImgbb = this.imgbb.uploadImage({
      file: this.cover
    }).subscribe({
      next: res => {
        this.gs.log('[COVER_SUCCESS]', res);
        this.fg.controls['cover'].patchValue(res.result.url);
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[COVER_ERROR]', err, 'error');
        this.fg.controls['cover'].patchValue(null);
        this.submitted = false;
        this.coverErrorText = err.result?.message || err.info;
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    const urls = {};
    if (this.fg.value.web) {
      urls['web'] = this.fg.value.web;
    }
    if (this.fg.value.facebook) {
      urls['facebook'] = this.fg.value.facebook;
    }
    if (this.fg.value.discord) {
      urls['discord'] = this.fg.value.discord;
    }
    if (this.fg.value.twitter) {
      urls['twitter'] = this.fg.value.twitter;
    }
    this.submitted = true;
    const urlCount = Object.keys(urls).length;
    if (this.fg.invalid || urlCount === 0) {
      if (urlCount === 0) {
        this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)', null, true);
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsFansub = this.fansub.createFansub({
      image: this.fg.value.image,
      cover: this.fg.value.cover,
      name: this.fg.value.name,
      description: this.fg.value.description,
      born: this.fg.value.born.getTime(),
      active: this.fg.value.active,
      tags: this.fg.value.tags,
      slug: this.fg.value.slug,
      urls,
      rss_feed: this.fg.value.rss_feed
    }).subscribe({
      next: res => {
        this.gs.log('[FANSUB_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/fansub', {
          state: {
            bypassCanDeactivate: true
          }
        });
      },
      error: err => {
        this.gs.log('[FANSUB_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
