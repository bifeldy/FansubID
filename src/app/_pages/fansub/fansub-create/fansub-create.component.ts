import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import moment from 'moment';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';

@Component({
  selector: 'app-fansub-create',
  templateUrl: './fansub-create.component.html',
  styleUrls: ['./fansub-create.component.css']
})
export class FansubCreateComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fg: FormGroup;

  submitted = false;

  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/router/bg-about.png';
  urls = [];

  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private pi: PageInfoService
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
      name: [null, Validators.compose([Validators.required])],
      slug: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      born: [null, Validators.compose([Validators.required, this.dateValidator])],
      active: [null, Validators.compose([Validators.required])],
      tags: [[], Validators.compose([])],
      website: [[], Validators.compose([])],
      facebook: [[], Validators.compose([])],
      discord: [[], Validators.compose([])]
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

  onSubmit(): void {
    console.log(this.fg.value);
    return;
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      return;
    }
  }
}
