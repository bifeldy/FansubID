import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { firstValueFrom } from 'rxjs';

import { CONSTANTS } from '../../../../constants';

import { CanComponentDeactivate } from '../../../_shared/guards/leave-page.guard';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { NewsService } from '../../../_shared/services/news.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  imageLimitExceeded = null;
  image_url = '/assets/img/form/no-image.png';

  gambar = null;

  subsNews = null;
  subsImgbb = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private news: NewsService,
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

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Informasi - Buat Baru`,
      `Halaman Menambahkan Berita Baru`,
      `Create News`
    );
    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this.subsImgbb?.unsubscribe();
    this.subsNews?.unsubscribe();
  }

  async canDeactivate(): Promise<boolean> {
    const closeDialog = await this.ds.leavePageDialog();
    return await firstValueFrom(closeDialog);
  }

  initForm(): void {
    this.fg = this.fb.group({
      title: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      tags: [[], Validators.compose([])]
    });
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

  onSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsNews = this.news.createNews({
      image: this.fg.value.image,
      title: this.fg.value.title,
      content: this.fg.value.content,
      tags: this.fg.value.tags,
    }).subscribe({
      next: res => {
        this.gs.log('[NEWS_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/news');
      },
      error: err => {
        this.gs.log('[NEWS_CREATE_ERROR]', err, 'error');
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
    this.fg.controls['tags'].patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
  }

  removeTag(tag: any): void {
    const index = this.fg.value.tags.indexOf(tag);
    if (index >= 0) {
      this.fg.value.tags.splice(index, 1);
    }
  }

}
