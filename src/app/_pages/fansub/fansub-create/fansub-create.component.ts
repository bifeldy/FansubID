import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, retry, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-fansub-create',
  templateUrl: './fansub-create.component.html',
  styleUrls: ['./fansub-create.component.css']
})
export class FansubCreateComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';
  urls = [];

  currentDate = new Date();

  gambar = null;

  subsImgbb = null;
  subsFansub = null;
  subsCekFansubSlug = null;

  slugInfo = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private fansub: FansubService,
    private toast: ToastrService,
    private as: AuthService,
    private gs: GlobalService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnDestroy(): void {
    this.subsImgbb?.unsubscribe();
    this.subsFansub?.unsubscribe();
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Fansub - Buat Baru`,
      `Halaman Menambahkan Fansub Baru`,
      `Create Fansub`
    );
    if (this.gs.isBrowser) {
      if (this.as.currentUserValue && this.as.currentUserValue.verified) {
        this.initForm();
      } else {
        this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!');
        this.router.navigate(['/verify'], {
          queryParams: {
            returnUrl: '/fansub'
          }
        });
      }
    }
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      born: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      active: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      slug: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z-]*$/)])],
      tags: [[], Validators.compose([])],
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      web: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      facebook: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      discord: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      rss_feed: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])]
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
          this.imageErrorText = null;
        } else {
          this.image = null;
          this.image_url = '/assets/img/form-image-error.png';
          this.imageErrorText = `Ukuran Upload Melebihi Batas ${CONSTANTS.fileSizeImageLimit} Bytes!`;
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.imageErrorText = null;
      this.image_url = '/assets/img/form-no-image.png';
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
    this.submitted = true;
    if (this.fg.invalid || urls.length === 0) {
      if (urls.length === 0) {
        this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)');
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsFansub = this.fansub.createFansub({
      image: this.fg.value.image,
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
        this.router.navigateByUrl('/fansub');
      },
      error: err => {
        this.gs.log('[FANSUB_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
