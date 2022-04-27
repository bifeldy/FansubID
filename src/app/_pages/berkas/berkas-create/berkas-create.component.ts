import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressBarMode } from '@angular/material/progress-bar';

import { tap, debounceTime, switchMap, finalize, distinctUntilChanged, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { UserModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { DoramaService } from '../../../_shared/services/dorama.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';

@Component({
  selector: 'app-berkas-create',
  templateUrl: './berkas-create.component.html',
  styleUrls: ['./berkas-create.component.css']
})
export class BerkasCreateComponent implements OnInit, OnDestroy {

  currentUser: UserModel = null;

  fg: FormGroup;

  submitted = false;

  projectList = [];

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';

  filteredAnime = [];
  filteredDorama = [];
  filteredFansub = [];
  isLoading = false;

  animeCheckOrAddResponse = null;
  doramaCheckOrAddResponse = null;

  attachment = null;
  attachmentPercentage = 0;
  attachmentIsUploading = false;
  attachmentIsCompleted = false;
  attachmentErrorText = '';

  uploadHandler = null;
  uploadToast = null;

  attachmentPreviousLoaded = null;
  attachmentSpeed = 0;
  attachmentMode: ProgressBarMode = 'indeterminate';

  timerTimeout = null;

  gambar = null;
  ddl = null;

  subsUser = null;
  subsProject = null;
  subsFansub = null;
  subsAnimeDetail = null;
  subsDoramaDetail = null;
  subsProjectDetail = null;
  subsFansubDetail = [];
  subsAnimeNew = null;
  subsDoramaNew = null;
  subsImgbb = null;
  subsBerkasCreate = null;

  berkasType = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private imgbb: ImgbbService,
    private toast: ToastrService,
    private gs: GlobalService,
    private as: AuthService
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
      `Berkas - Buat Baru`,
      `Halaman Membuat Berkas Baru`,
      `Create Berkas`
    );
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.loadProjectList();
      this.initForm();
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
    this.subsUser?.unsubscribe();
    this.uploadHandler?.unsubscribe();
    this.subsProject?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsAnimeDetail?.unsubscribe();
    this.subsDoramaDetail?.unsubscribe();
    this.subsProjectDetail?.unsubscribe();
    for (const sFD of this.subsFansubDetail) {
      sFD?.unsubscribe();
    }
    this.subsAnimeNew?.unsubscribe();
    this.subsDoramaNew?.unsubscribe();
    this.subsImgbb?.unsubscribe();
    this.subsBerkasCreate?.unsubscribe();
  }

  loadProjectList(): void {
    this.bs.busy();
    this.subsProject = this.project.getProject().subscribe({
      next: res => {
        this.gs.log('[PROJECT_LOAD_SUCCESS]', res);
        this.projectList = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[PROJECT_LOAD_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      projectType_id: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      anime_id: [null, Validators.compose([])],
      anime_name: [null, Validators.compose([])],
      dorama_id: [null, Validators.compose([])],
      dorama_name: [null, Validators.compose([])],
      fansub_list: this.fb.array([this.createFansub()]),
      image: [null, Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      attachment_id: [null, Validators.compose([Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      download_url: this.fb.array([this.createDownloadLink()]),
      private: [false, Validators.compose([Validators.required])]
    });
    this.subsAnimeDetail = this.fg.get('anime_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchQuery => this.anime.searchAnime(searchQuery).pipe(
        finalize(() => this.isLoading = false)
      )),
      retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_ANIME_RESULT]', res);
        this.filteredAnime = (res as any).results;
      }
    });
    this.subsDoramaDetail = this.fg.get('dorama_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchQuery => this.dorama.searchDorama(searchQuery).pipe(
        finalize(() => this.isLoading = false)
      )),
      retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_DORAMA_RESULT]', res);
        for (const r of (res as any).results) {
          r.mdl_id = r.mdl_id.split('-')[1];
          r.image_url = r.thumb;
        }
        this.filteredDorama = (res as any).results;
      }
    });
    this.subsProjectDetail = this.fg.get('projectType_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      retry(-1)
    ).subscribe({
      next: projectId => {
        this.gs.log('[BERKAS_CREATE_PROJECT_CHANGED]', projectId);
        const selectedProject = this.projectList.find(p => p.id === projectId);
        this.fg.controls['anime_id'].patchValue(null);
        this.fg.controls['anime_name'].patchValue(null);
        this.fg.controls['dorama_id'].patchValue(null);
        this.fg.controls['dorama_name'].patchValue(null);
        this.fg.controls['anime_id'].setErrors(null);
        this.fg.controls['anime_name'].setErrors(null);
        this.fg.controls['dorama_id'].setErrors(null);
        this.fg.controls['dorama_name'].setErrors(null);
        this.fg.controls['anime_id'].clearValidators();
        this.fg.controls['anime_name'].clearValidators();
        this.fg.controls['dorama_id'].clearValidators();
        this.fg.controls['dorama_name'].clearValidators();
        this.fg.controls['anime_id'].markAsPristine();
        this.fg.controls['anime_name'].markAsPristine();
        this.fg.controls['dorama_id'].markAsPristine();
        this.fg.controls['dorama_name'].markAsPristine();
        this.fg.controls['anime_id'].markAsUntouched();
        this.fg.controls['anime_name'].markAsUntouched();
        this.fg.controls['dorama_id'].markAsUntouched();
        this.fg.controls['dorama_name'].markAsUntouched();
        if (selectedProject.name.toLowerCase().includes('anime')) {
          this.berkasType = selectedProject.name;
          this.fg.controls['anime_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
          this.fg.controls['anime_name'].setValidators([Validators.required]);
        } else if (selectedProject.name.toLowerCase().includes('dorama')) {
          this.berkasType = selectedProject.name;
          this.fg.controls['dorama_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
          this.fg.controls['dorama_name'].setValidators([Validators.required]);
        } else {
          this.berkasType = '';
        }
        this.fg.controls['anime_id'].updateValueAndValidity();
        this.fg.controls['anime_name'].updateValueAndValidity();
        this.fg.controls['dorama_id'].updateValueAndValidity();
        this.fg.controls['dorama_name'].updateValueAndValidity();
      }
    });
  }

  get getDownloadUrlControl(): FormArray {
    return (this.fg.get('download_url') as FormArray);
  }

  createDownloadLink(): any {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])],
      url: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.englishKeyboardKeysRegex)])]
    });
  }

  removeDownloadLink(i: number): void {
    this.getDownloadUrlControl.removeAt(i);
  }

  addDownloadLink(): any {
    this.getDownloadUrlControl.push(this.createDownloadLink());
  }

  get getFansubControl(): FormArray {
    return (this.fg.get('fansub_list') as FormArray);
  }

  createFansub(): any {
    const fbGroup = this.fb.group({
      fansub_id: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_name: [null, Validators.compose([Validators.required])],
    });
    this.subsFansubDetail.push(fbGroup.get('fansub_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchQuery => this.fansub.searchFansub(searchQuery).pipe(
        finalize(() => this.isLoading = false)
      )),
      retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_FANSUB_RESULT]', res);
        this.filteredFansub = (res as any).results;
      }
    }));
    return fbGroup;
  }

  removeFansub(i: number): void {
    this.getFansubControl.removeAt(i);
    this.subsFansubDetail[i]?.unsubscribe();
    this.subsFansubDetail.splice(i, 1);
  }

  addFansub(): any {
    this.getFansubControl.push(this.createFansub());
  }

  resetSelectedAnime(): void {
    this.fg.controls['anime_name'].patchValue(null);
  }

  resetSelectedDorama(): void {
    this.fg.controls['dorama_name'].patchValue(null);
  }

  resetSelectedFansub(i: number): any {
    this.getFansubControl.controls[i].get('fansub_name').patchValue(null);
  }

  filterAnimeSelected(data): void {
    this.gs.log('[ANIME_FILTER_CLICK]', data);
    this.submitted = true;
    this.subsAnimeNew = this.anime.addNewAnime({
      id: data.mal_id,
      name: data.title,
      image_url: data.image_url,
      type: data.type
    }).subscribe({
      next: res => {
        this.gs.log('[ANIME_CHECK_ADD_SUCCESS]', res);
        this.animeCheckOrAddResponse = res.result;
        this.submitted = false;
        this.fg.controls['anime_id'].patchValue(res.result.id);
        this.fg.controls['anime_name'].patchValue(res.result.name);
      },
      error: err => {
        this.gs.log('[ANIME_CHECK_ADD_ERROR]', err);
        this.submitted = false;
        this.resetSelectedAnime();
        this.fg.controls['anime_id'].patchValue(null);
        this.fg.controls['anime_name'].patchValue(null);
      }
    });
  }

  filterDoramaSelected(data): void {
    this.gs.log('[DORAMA_FILTER_CLICK]', data);
    this.submitted = true;
    this.subsDoramaNew = this.dorama.addNewDorama({
      id: parseInt(data.mdl_id, 10),
      slug: data.slug,
      name: data.title,
      image_url: data.image_url,
      type: data.type
    }).subscribe({
      next: res => {
        this.gs.log('[DORAMA_CHECK_ADD_SUCCESS]', res);
        this.doramaCheckOrAddResponse = res.result;
        this.submitted = false;
        this.fg.controls['dorama_id'].patchValue(res.result.id);
        this.fg.controls['dorama_name'].patchValue(res.result.name);
      },
      error: err => {
        this.gs.log('[DORAMA_CHECK_ADD_ERROR]', err);
        this.submitted = false;
        this.resetSelectedDorama();
        this.fg.controls['dorama_id'].patchValue(null);
        this.fg.controls['dorama_name'].patchValue(null);
      }
    });
  }

  filterFansubSelected(data, i: number): void {
    this.gs.log('[FANSUB_FILTER_CLICK]', data);
    this.getFansubControl.controls[i].get('fansub_id').patchValue(data.id);
    this.getFansubControl.controls[i].get('fansub_name').patchValue(data.name);
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
        this.fg.controls['image'].patchValue(res.result.url);
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls['image'].patchValue(null);
        this.submitted = false;
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    if (this.fg.invalid || this.attachmentIsUploading) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    const fansubId = [];
    for (const fs of this.fg.value.fansub_list) {
      fansubId.push(fs.fansub_id);
    }
    this.subsBerkasCreate = this.berkas.createBerkas({
      image: this.fg.value.image,
      name: this.fg.value.name,
      description: this.fg.value.description,
      private: this.fg.value.private,
      projectType_id: this.fg.value.projectType_id,
      anime_id: this.fg.value.anime_id,
      dorama_id: this.fg.value.dorama_id,
      fansub_id: fansubId,
      download_url: this.fg.value.download_url,
      attachment_id: this.fg.value.attachment_id
    }).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/berkas');
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  uploadAttachment(event, ddl): void {
    this.ddl = ddl;
    const file = event.target.files[0];
    this.gs.log('[ATTACHMENT_SELECTED]', file);
    this.fg.controls['attachment_id'].patchValue(null);
    try {
      if (file.size <= this.gs.berkasUploadSizeLimit) {
        this.attachment = file;
        this.attachmentErrorText = '';
      } else {
        this.attachment = null;
        this.attachmentErrorText = 'Ukuran File DDL Melebihi Batas 256 MB!';
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
          this.fg.controls['attachment_id'].patchValue(e.result.id);
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
    this.fg.controls['attachment_id'].patchValue(null);
    this.toast.remove(this.uploadToast.toastId);
    this.ddl.clear();
  }

}
