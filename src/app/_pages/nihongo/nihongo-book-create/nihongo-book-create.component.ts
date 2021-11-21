import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-nihongo-book-create',
  templateUrl: './nihongo-book-create.component.html',
  styleUrls: ['./nihongo-book-create.component.css']
})
export class NihongoBookCreateComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';

  attachment = null;
  attachmentPercentage = 0;
  attachmentIsUploading = false;
  attachmentIsCompleted = false;
  attachmentErrorText = '';

  uploadHandler = null;
  uploadToast = null;

  attachmentPreviousLoaded = null;
  attachmentSpeed = 0;
  attachmentMode = 'indeterminate';

  timerTimeout = null;

  gambar = null;
  ddl = null;

  subsBook = null;
  subsImgbb = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bs: BusyService,
    private pi: PageInfoService,
    private imgbb: ImgbbService,
    private nihon: NihongoService,
    private toast: ToastrService,
    private berkas: BerkasService,
    public gs: GlobalService,
    public as: AuthService
  ) {
    this.gs.bannerImg = '/assets/img/news-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Buku Pendukung - Buat Baru`,
      `Halaman Menambahkan Pendukung Belajar`,
      `Create Book`
    );
    if (this.gs.isBrowser) {
      if (!this.as.currentUserValue.verified) {
        this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!');
        this.router.navigateByUrl(`/nihongo`);
      } else {
        this.initForm();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.uploadHandler) {
      this.attachmentMode = 'indeterminate';
      this.attachmentPercentage = 0;
      this.attachmentSpeed = 0;
      this.attachmentIsUploading = false;
      this.attachmentIsCompleted = false;
    }
    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }
    if (this.timerTimeout) {
      clearTimeout(this.timerTimeout);
      this.timerTimeout = null;
    }
    this.subsImgbb?.unsubscribe();
    this.subsBook?.unsubscribe();
    this.uploadHandler?.unsubscribe();
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      attachment_id: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
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
        this.fg.controls.image.patchValue(res.result.url);
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.submitted = false;
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
    this.subsBook = this.nihon.createBook({
      image: this.fg.value.image,
      name: this.fg.value.name,
      description: this.fg.value.description
    }).subscribe({
      next: res => {
        this.gs.log('[BOOK_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/news');
      },
      error: err => {
        this.gs.log('[BOOK_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  uploadAttachment(event, ddl): void {
    this.ddl = ddl;
    const file = event.target.files[0];
    this.gs.log('[ATTACHMENT_SELECTED]', file);
    this.fg.controls.attachment_id.patchValue(null);
    try {
      if (file.size <= this.gs.berkasUploadSizeLimit) {
        this.attachment = file;
        this.attachmentErrorText = '';
      } else {
        this.attachment = null;
        this.attachmentErrorText = 'Ukuran File DDL Melebihi Batas 32 MB!';
        this.ddl.clear(event);
      }
    } catch (error) {
      this.attachment = null;
      this.attachmentErrorText = '';
      this.ddl.clear(event);
    }
  }

  submitAttachment(): void {
    this.attachmentIsUploading = true;
    this.uploadToast = this.toast.warning(
      `${this.attachmentPercentage}% @ ${this.attachmentSpeed} KB/s`,
      `Mengunggah ...`,
      {
        closeButton: false,
        timeOut: 0,
        disableTimeOut: 'extendedTimeOut',
        tapToDismiss: false
      }
    );
    this.uploadHandler = this.berkas.uploadLampiran({
      file: this.attachment
    }).subscribe({
      next: event => {
        this.gs.log('[UPLOAD_EVENTS]', event);
        if ((event as any).loaded && (event as any).total) {
          const e = (event as any);
          this.gs.log('[UPLOAD_PROGRESS]', e);
          this.attachmentMode = 'determinate';
          this.attachmentPercentage = Math.round(e.loaded / e.total * 100);
          if (this.attachmentPercentage < 100) {
            this.attachmentSpeed = (e.loaded - this.attachmentPreviousLoaded) / 1000;
            this.attachmentPreviousLoaded = e.loaded;
            if (this.attachmentSpeed <= 0) {
              this.attachmentSpeed = 0;
            }
          }
          this.uploadToast.toastRef.componentInstance.message = `${this.attachmentPercentage}% @ ${this.attachmentSpeed} KB/s`;
        }
        if ((event as any).body) {
          const e = (event as any).body;
          this.gs.log('[UPLOAD_COMPLETED]', e);
          this.attachmentMode = 'determinate';
          this.attachmentIsUploading = false;
          this.attachmentIsCompleted = true;
          this.fg.controls.attachment_id.patchValue(e.result.id);
          this.toast.remove(this.uploadToast.toastId);
          const timer = (2 * 60 * 1000) + (30 * 1000);
          this.uploadToast = this.toast.warning(
            `Segera Kirim Data Berkas Anda!`,
            `Lampiran Akan Dihapus ...`,
            {
              closeButton: false,
              timeOut: timer,
              disableTimeOut: 'extendedTimeOut',
              tapToDismiss: false,
              progressAnimation: 'decreasing'
            }
          );
          this.timerTimeout = setTimeout(() => {
            this.gs.log('[UPLOAD_TIMEOUT]', timer);
            this.attachmentMode = 'determinate';
            this.failOrCancelUpload();
          }, timer);
        }
      },
      error: err => {
        this.gs.log('[UPLOAD_ERROR]', err);
        this.attachmentMode = 'indeterminate';
        this.failOrCancelUpload(err);
      }
    });
  }

  failOrCancelUpload(err = null): void {
    this.attachmentIsUploading = false;
    this.attachmentIsCompleted = false;
    this.attachment = null;
    this.attachmentErrorText = err?.error?.result?.message || err?.error?.info || '';
    this.fg.controls.attachment_id.patchValue(null);
    this.toast.remove(this.uploadToast.toastId);
    this.ddl.clear();
  }

}
