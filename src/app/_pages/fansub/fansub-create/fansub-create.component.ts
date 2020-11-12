import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

import moment from 'moment';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';

@Component({
  selector: 'app-fansub-create',
  templateUrl: './fansub-create.component.html',
  styleUrls: ['./fansub-create.component.css']
})
export class FansubCreateComponent implements OnInit, OnDestroy {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';
  urls = [];

  currentDate = new Date();

  gambar = null;

  subsImgbb = null;
  subsFansub = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private fansub: FansubService,
    private toast: ToastrService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    if (this.subsImgbb) {
      this.subsImgbb.unsubscribe();
    }
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Fansub - Buat Baru`,
      `Halaman Menambahkan Fansub Baru`,
      `Create Fansub`
    );
    this.initForm();
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      born: [null, Validators.compose([Validators.required, this.dateValidator, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      active: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      slug: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      tags: [[], Validators.compose([])],
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      web: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      facebook: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      discord: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
  }

  dateValidator(AC: AbstractControl): any {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
      return {
        dateVaidator: true
      };
    }
    return null;
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
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.gs.log('[ImgLoad]', e);
        if (file.size < 256 * 1000) {
          const img = document.createElement('img');
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
      this.image_url = '/assets/img/form-no-image.png';
      this.gambar.clear(event);
    }
  }

  submitImage(): void {
    this.submitted = true;
    this.subsImgbb = this.imgbb.uploadImage(this.image).subscribe(
      res => {
        this.gs.log('[IMAGE_SUCCESS]', res);
        this.fg.controls.image.patchValue(res.result.url);
        this.submitted = false;
      },
      err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.submitted = false;
      }
    );
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
      data: window.btoa(JSON.stringify({
        image: this.fg.value.image,
        name: this.fg.value.name,
        description: this.fg.value.description,
        born: this.fg.value.born.getTime(),
        active: this.fg.value.active,
        tags: this.fg.value.tags,
        slug: this.fg.value.slug,
        urls
      }))
    }).subscribe(
      res => {
        this.gs.log('[FANSUB_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/fansub');
      },
      err => {
        this.gs.log('[FANSUB_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    );
  }

}
