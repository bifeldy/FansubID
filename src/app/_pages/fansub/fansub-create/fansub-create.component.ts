import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

import moment from 'moment';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-fansub-create',
  templateUrl: './fansub-create.component.html',
  styleUrls: ['./fansub-create.component.css']
})
export class FansubCreateComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fg: FormGroup;

  submitted = false;

  imageErrorText = null;
  selectedImageFileName = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';
  urls = [];

  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private fansub: FansubService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
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
      name: ['', Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      description: ['', Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      born: ['', Validators.compose([Validators.required, this.dateValidator, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      active: ['', Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      slug: ['', Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      tags: [[], Validators.compose([])],
      image: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      web: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      facebook: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      discord: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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

  uploadImage(event): void {
    this.fg.controls.image.patchValue(null);
    const file = event.target.files[0];
    this.selectedImageFileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      if (file.size < 256000) {
        const img = document.createElement('img');
        img.onload = () => {
          this.image_url = reader.result.toString();
          this.fg.controls.image.patchValue(file);
        };
        img.src = reader.result.toString();
        this.imageErrorText = null;
      } else {
        this.image_url = '/assets/img/form-image-error.png';
        this.fg.controls.image.patchValue(null);
        this.imageErrorText = 'Ukuran Upload File Melebihi Batas 256 KB!';
      }
    };
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
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.fansub.createFansub({
      image: this.fg.value.image,
      data: window.btoa(JSON.stringify({
        name: this.fg.value.name,
        description: this.fg.value.description,
        born: this.fg.value.born.getTime(),
        active: parseInt(this.fg.value.active, 10) === 1,
        tags: this.fg.value.tags,
        slug: this.fg.value.slug,
        urls
      }))
    }).subscribe(
      res => {
        this.gs.log('[FANSUB_CREATE_SUCCESS]', res);
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
