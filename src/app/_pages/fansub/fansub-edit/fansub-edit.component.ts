import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { debounceTime, distinctUntilChanged, retry, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-fansub-edit',
  templateUrl: './fansub-edit.component.html',
  styleUrls: ['./fansub-edit.component.css']
})
export class FansubEditComponent implements OnInit, OnDestroy {

  fansubSlug = '';

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';
  image_url_original = null;

  urls = [];

  currentDate = new Date();

  gambar = null;

  subsActRoute = null;
  subsFansubUpdate = null;
  subsFansubDetail = null;
  subsImgbb = null;
  subsCekFansubSlug = null;

  slugInfo = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private activatedRoute: ActivatedRoute,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private fansub: FansubService,
    private toast: ToastrService,
    public as: AuthService,
    public gs: GlobalService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsFansubUpdate?.unsubscribe();
    this.subsFansubDetail?.unsubscribe();
    this.subsImgbb?.unsubscribe();
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Fansub - Ubah Data`,
      `Halaman Pembaharuan Data Fansub`,
      `Ubah Fansub`
    );
    if (this.gs.isBrowser) {
      this.fansubSlug = this.activatedRoute.snapshot.paramMap.get('fansubSlug');
      if (this.as.currentUserValue && this.as.currentUserValue.verified) {
        this.bs.busy();
        this.subsFansubDetail = this.fansub.getFansub(this.fansubSlug).subscribe({
          next: res => {
            this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
            this.initForm(res.result);
            this.bs.idle();
          },
          error: err => {
            this.gs.log('[FANSUB_DETAIL_ERROR]', err);
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: `/fansub/${this.fansubSlug}`
              }
            });
          }
        });
      } else {
        this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!');
        this.router.navigateByUrl(`/fansub/${this.fansubSlug}`);
      }
    }
  }

  initForm(data): void {
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    const urls = data.urls;
    const WEB = urls.find(u => u.name === 'web');
    const FACEBOOK = urls.find(u => u.name === 'facebook');
    const DISCORD = urls.find(u => u.name === 'discord');
    const ACTIVE = data.active === true ? '1' : '0';
    this.fg = this.fb.group({
      name: [data.name, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      description: [data.description, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      born: [data.born, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      active: [ACTIVE, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      slug: [data.slug, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z-]*$/)])],
      tags: [data.tags, Validators.compose([])],
      image: [null, Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      web: [(WEB?.url || null), Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      facebook: [(FACEBOOK?.url || null), Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      discord: [(DISCORD?.url || null), Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])]
    });
    this.subsCekFansubSlug = this.fg.get('slug').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.slugInfo = 'Mengecek ...'),
      switchMap(slugQuery => this.fansub.cekSlug({ slug: slugQuery })),
      retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[FANSUB_CEK_SLUG_RESULT]', res);
        this.slugInfo = (res as any).result.message;
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
    this.fg.controls.tags.patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
    this.fg.controls.tags.markAsDirty();
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
    this.fg.controls.image.patchValue(null);
    this.fg.controls.image.markAsPristine();
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[IMAGE_SELECTED]', e);
        if (file.size < this.gs.gambarUploadSizeLimit) {
          const img = this.gs.document.createElement('img');
          img.onload = () => {
            this.image = file;
            this.image_url = reader.result.toString();
          };
          img.src = reader.result.toString();
          this.imageErrorText = null;
        } else {
          this.image = null;
          this.image_url = '/assets/img/form-image-error.png';
          this.imageErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.imageErrorText = null;
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
        this.fg.controls.image.patchValue(res.result.url);
        this.fg.controls.image.markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.fg.controls.image.markAsPristine();
        this.submitted = false;
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    const urls = [];
    if (this.fg.value.web) {
      urls.push({ name: 'web', url: this.fg.value.web });
    }
    if (this.fg.value.facebook) {
      urls.push({ name: 'facebook', url: this.fg.value.facebook });
    }
    if (this.fg.value.discord) {
      urls.push({ name: 'discord', url: this.fg.value.discord });
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
    body.urls = urls;
    this.gs.log('[FANSUB_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid || urls.length === 0) {
      if (urls.length === 0) {
        this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)');
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
        this.gs.log('[FANSUB_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
