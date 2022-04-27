import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogNihongoDataModel } from '../../../models/Dialog';

import { GlobalService } from '../../../../_shared/services/global.service';
import { ImgbbService } from '../../../services/imgbb.service';
import { BusyService } from '../../../services/busy.service';
import { NihongoService } from '../../../services/nihongo.service';

@Component({
  selector: 'app-material-dialog-belajar',
  templateUrl: './material-dialog-belajar.component.html',
  styleUrls: ['./material-dialog-belajar.component.css']
})
export class MaterialDialogBelajarComponent implements OnInit, OnDestroy {

  fg: FormGroup;
  submitted = false;

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';
  image_url_original = null;

  gambar = null;

  subsNihongo = null;
  subsImgbb = null;

  constructor(
    private fb: FormBuilder,
    private bs: BusyService,
    private imgbb: ImgbbService,
    private nihongo: NihongoService,
    private dialogRef: MatDialogRef<MaterialDialogBelajarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogNihongoDataModel,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogNihongoDataModel {
    return this.data;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.gs.log('[DIALOG_DATA_IN]', this.data);
      this.initForm(this.data?.dataset);
    }
  }

  ngOnDestroy(): void {
    this.subsImgbb?.unsubscribe();
    this.subsNihongo?.unsubscribe();
  }

  initForm(data): void {
    this.fg = this.fb.group({
      kana: [data?.kana, Validators.compose([Validators.required, Validators.pattern(this.gs.japaneseKeyboardKeysRegex)])],
      romaji: [data?.romaji, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      meaning: [data?.meaning, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      category: [data?.category || this.data.modeTampilan, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      image: [null, Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
    });
    if (data) {
      this.image_url = data?.image_url;
    } else {
      this.fg.controls['image'].setValidators([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)]);
    }
    this.image_url_original = this.image_url;
  }

  uploadImage(event, gambar): void {
    this.gambar = gambar;
    this.image = null;
    this.fg.controls['image'].patchValue(null);
    this.fg.controls['image'].markAsPristine();
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
        this.fg.controls['image'].patchValue(res.result.url);
        this.fg.controls['image'].markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls['image'].patchValue(null);
        this.fg.controls['image'].markAsPristine();
        this.submitted = false;
      }
    });
  }

  saveData(): void {
    this.bs.busy();
    this.submitted = true;
    let body = null;
    if (this.data?.dataset) {
      body = this.gs.getDirtyValues(this.fg);
      this.gs.log('[NIHONGO_ADD_OR_EDIT_DIRTY]', body);
    }
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    if (body) {
      this.subsNihongo = this.nihongo.updateNihongo(this.data.dataset.id, { ...body });
    } else {
      this.subsNihongo = this.nihongo.createNihongo({
        image: this.fg.value.image,
        kana: this.fg.value.kana,
        romaji: this.fg.value.romaji,
        meaning: this.fg.value.meaning,
        category: this.fg.value.category
      });
    }
    this.subsNihongo = this.subsNihongo.subscribe({
      next: res => {
        this.gs.log('[NIHONGO_ADD_OR_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.dialogRef.close(res);
      },
      error: err => {
        this.gs.log('[NIHONGO_ADD_OR_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
