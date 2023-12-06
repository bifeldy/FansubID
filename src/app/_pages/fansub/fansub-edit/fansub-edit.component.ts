import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { debounceTime, distinctUntilChanged, retry, switchMap, tap } from 'rxjs/operators';

import { CONSTANTS } from '../../../../constants';

import { RoleModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { ToastService } from '../../../_shared/services/toast.service';

@Component({
  selector: 'app-fansub-edit',
  templateUrl: './fansub-edit.component.html',
  styleUrls: ['./fansub-edit.component.css']
})
export class FansubEditComponent implements OnInit, OnDestroy {

  fansubSlug = '';

  fg: UntypedFormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  imageLimitExceeded = null;
  image_url = '/assets/img/form/no-image.png';
  image_url_original = null;

  cover = null;
  coverErrorText = null;
  coverLimitExceeded = null;
  cover_url = '/assets/img/form/no-image.png';
  cover_url_original = null;

  urls = [];

  currentDate = new Date();

  gambar = null;
  gambar_ = null;

  subsActRoute = null;
  subsFansubUpdate = null;
  subsFansubDetail = null;
  subsImgbb = null;
  subsCekFansubSlug = null;
  subsFansubMemberGet = null;

  slugInfo = '';
  editable = true;
  approvedMembers = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private bs: BusyService,
    private activatedRoute: ActivatedRoute,
    private imgbb: ImgbbService,
    private fansub: FansubService,
    private toast: ToastService,
    private as: AuthService,
    private gs: GlobalService
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
    this.subsActRoute?.unsubscribe();
    this.subsFansubUpdate?.unsubscribe();
    this.subsFansubDetail?.unsubscribe();
    this.subsImgbb?.unsubscribe();
    this.subsFansubMemberGet?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.fansubSlug = this.activatedRoute.snapshot.paramMap.get('fansubSlug');
      this.bs.busy();
      this.subsFansubDetail = this.fansub.getFansub(this.fansubSlug).subscribe({
        next: res => {
          this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
          this.bs.idle();
          this.editable = res.result.editable;
          if (!this.editable) {
            this.toast.warning('Data Fansub Ini Tidak Dapat Diubah', 'Whoops!', null, true);
            this.router.navigateByUrl(`/fansub/${this.fansubSlug}`);
          } else {
            this.bs.busy();
            this.subsFansubMemberGet = this.fansub.getFansubMember(this.fansubSlug).subscribe({
              next: r => {
                this.gs.log('[FANSUB_EDIT_MEMBER_LIST_SUCCESS]', r);
                this.bs.idle();
                this.approvedMembers = [];
                for (const m of r.results) {
                  if (m.approved) {
                    this.approvedMembers.push(m);
                  }
                }
                const index = this.approvedMembers.findIndex(m => m.user_.id === this.as.currentUserSubject?.value?.id);
                if (index >= 0 || this.as.currentUserSubject?.value?.role === RoleModel.ADMIN || this.as.currentUserSubject?.value?.role === RoleModel.MODERATOR || this.as.currentUserSubject?.value?.id === res.result.user_.id) {
                  this.initForm(res.result);
                } else {
                  this.toast.warning('Harus Menjadi Anggota Untuk Mengubah Data!', 'Whoops!', null, true);
                  this.router.navigateByUrl(`/fansub/${this.fansubSlug}`);
                }
              },
              error: err => {
                this.gs.log('[FANSUB_EDIT_MEMBER_LIST_ERROR]', err, 'error');
                this.bs.idle();
                this.router.navigate(['/error'], {
                  queryParams: {
                    returnUrl: `/fansub/${this.fansubSlug}`
                  }
                });
              }
            });
          }
        },
        error: err => {
          this.gs.log('[FANSUB_DETAIL_ERROR]', err, 'error');
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/fansub/${this.fansubSlug}`
            }
          });
        }
      });
    }
  }

  initForm(data): void {
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    this.cover_url = data.cover_url;
    this.cover_url_original = this.cover_url;
    this.fg = this.fb.group({
      name: [data.name, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [data.description, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      born: [data.born, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      active: [data.active === true ? '1' : '0', Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      slug: [{ value: data.slug, disabled: data.dns_id }, Validators.compose([Validators.required, Validators.pattern(/^[0-9a-zA-Z-]*$/)])],
      tags: [data.tags, Validators.compose([])],
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      cover: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      web: [data.urls['web'], Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      facebook: [data.urls['facebook'], Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      discord: [data.urls['discord'], Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      twitter: [data.urls['twitter'], Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      rss_feed: [data.rss_feed, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])]
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
    this.fg.controls['tags'].markAsDirty();
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
    this.fg.controls['image'].markAsPristine();
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
      this.image_url = this.image_url_original;
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
        this.fg.controls['image'].markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
        this.fg.controls['image'].markAsPristine();
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
    this.fg.controls['cover'].markAsPristine();
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
      this.cover_url = this.cover_url_original;
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
        this.fg.controls['cover'].markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[COVER_ERROR]', err, 'error');
        this.fg.controls['cover'].patchValue(null);
        this.fg.controls['cover'].markAsPristine();
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
    const body = this.gs.getDirtyValues(this.fg);
    if ('web' in body) {
      delete body.web;
    }
    if ('facebook' in body) {
      delete body.facebook;
    }
    if ('discord' in body) {
      delete body.discord;
    }
    if ('twitter' in body) {
      delete body.twitter;
    }
    body.urls = urls;
    this.gs.log('[FANSUB_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.value.rss_feed) {
      if (!this.fg.value.web || !this.fg.value.rss_feed.startsWith(this.fg.value.web)) {
        this.toast.warning('RSS Feed Tidak Sesuai Dengan Alamat Web', 'URL RSS Feed & WEB', null, true);
        this.submitted = false;
        this.bs.idle();
        return;
      }
    }
    const urlCount = Object.keys(urls).length;
    if (this.fg.invalid || urlCount === 0) {
      if (urlCount === 0) {
        this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)', null, true);
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsFansubUpdate = this.fansub.updateFansub(this.fansubSlug, {
      ...body
    }).subscribe({
      next: res => {
        this.gs.log('[FANSUB_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl(`/fansub/${res.result.slug}`);
      },
      error: err => {
        this.gs.log('[FANSUB_EDIT_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
