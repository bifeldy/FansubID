import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { NewsService } from '../../../_shared/services/news.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit, OnDestroy {

  newsId = 0;

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';
  image_url_original = null;

  gambar = null;

  subsActRoute = null;
  subsNewsUpdate = null;
  subsNewsDetail = null;
  subsImgbb = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private activatedRoute: ActivatedRoute,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private news: NewsService,
    private toast: ToastrService,
    public gs: GlobalService,
    public as: AuthService
  ) {
    this.gs.bannerImg = '/assets/img/news-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Informasi - Ubah Berita`,
      `Halaman Pembaharuan Berita`,
      `Edit News`
    );
    if (this.gs.isBrowser) {
      this.newsId = Number(this.activatedRoute.snapshot.paramMap.get('newsId'));
      this.bs.busy();
      this.subsNewsDetail = this.news.getNews(this.newsId).subscribe({
        next: res => {
          this.gs.log('[NEWS_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserValue.id !== res.result.user_.id) {
            this.toast.warning('Berita Ini Milik Orang Lain', 'Whoops!');
            this.router.navigateByUrl(`/news/${this.newsId}`);
          } else {
            this.initForm(res.result);
          }
        },
        error: err => {
          this.gs.log('[NEWS_DETAIL_ERROR]', err);
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/news/${this.newsId}`
            }
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsNewsUpdate?.unsubscribe();
    this.subsNewsDetail?.unsubscribe();
    this.subsImgbb?.unsubscribe();
  }

  initForm(data): void {
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    this.fg = this.fb.group({
      title: [data.title, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      content: [data.content, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      tags: [data.tags, Validators.compose([])],
    });
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
    const body = this.gs.getDirtyValues(this.fg);
    this.gs.log('[NEWS_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsNewsUpdate = this.news.updateNews(this.newsId, {
      ...body
    }).subscribe({
      next: res => {
        this.gs.log('[NEWS_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl(`/news/${this.newsId}`);
      },
      error: err => {
        this.gs.log('[NEWS_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
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

}
