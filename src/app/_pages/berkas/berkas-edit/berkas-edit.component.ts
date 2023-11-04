import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize, distinctUntilChanged, retry } from 'rxjs/operators';
import { UploadState, Uploader, UploadxService } from 'ngx-uploadx';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { DoramaService } from '../../../_shared/services/dorama.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { ToastService } from '../../../_shared/services/toast.service';

@Component({
  selector: 'app-berkas-edit',
  templateUrl: './berkas-edit.component.html',
  styleUrls: ['./berkas-edit.component.css']
})
export class BerkasEditComponent implements OnInit, OnDestroy {

  berkasId = '';

  uploads$: Observable<Uploader[]>;

  attachmentSelected: UploadState = null;
  attachmentErrorText = null;
  attachmentLimitExceeded = null;

  timerTimeout = null;

  fg: UntypedFormGroup;

  submitted = false;

  projectList = [];

  uploadToast = null;

  gambar = null;
  ddl = null;

  image = null;
  imageErrorText = null;
  imageLimitExceeded = null;
  image_url = '/assets/img/form/no-image.png';
  image_url_original = null;

  filteredAnime = [];
  filteredDorama = [];
  filteredFansub = [];
  isLoading = false;

  animeCheckOrAddResponse = null;
  doramaCheckOrAddResponse = null;

  attachmentFile = null;
  attachmentFontSubtitle = [];

  subsProject = null;
  subsFansub = null;
  subsAnimeDetail = null;
  subsDoramaDetail = null;
  subsProjectDetail = null;
  subsFansubDetail = [];
  subsAnimeNew = null;
  subsDoramaNew = null;
  subsImgbb = null;
  subsBerkasDetail = null;
  subsBerkasUpdate = null;
  subsUpload = null;

  berkasType = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private toast: ToastService,
    private imgbb: ImgbbService,
    private gs: GlobalService,
    private as: AuthService,
    private uploadService: UploadxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get CONSTANTS(): any {
    return CONSTANTS;
  }

  get AS(): AuthService {
    return this.as;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get extAttachment(): string {
    return CONSTANTS.extAttachment.join(', ');
  }

  get fileTypeAttachmentAllowed(): string {
    return CONSTANTS.fileTypeAttachmentAllowed.join(', ');
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Berkas - Ubah Berkas`,
      `Halaman Pembaharuan Data Berkas`,
      `Ubah Berkas`
    );
    if (this.gs.isBrowser) {
      this.berkasId = this.activatedRoute.snapshot.paramMap.get('berkasId');
      this.bs.busy();
      this.subsBerkasDetail = this.berkas.getBerkas(this.berkasId).subscribe({
        next: res => {
          this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserSubject?.value?.id !== res.result.user_.id) {
            this.toast.warning('Berkas Ini Bukan Milikmu', 'Whoops!', null, true);
            this.router.navigateByUrl(`/berkas/${res.result.id}`);
          } if (!this.as.currentUserSubject?.value?.verified && res.result.attachment_) {
            if (typeof res.result.attachment_ === 'string') {
              this.toast.warning(res.result.attachment_, 'Whoops!', null, true);
            } else {
              this.toast.warning('Harap Verifikasi Akun Terlebih Dahulu', 'Whoops!', null, true);
            }
            this.router.navigateByUrl(`/berkas/${res.result.id}`);
          } else {
            this.loadProjectList();
            this.initForm(res.result);
            this.uploads$ = this.uploadService.connect();
            this.subsUpload = this.uploadService.events.subscribe({
              next: state => {
                this.gs.log('[UPLOAD_EVENTS]', state);
                if (state.status === 'uploading' || state.status === 'complete') {
                  this.attachmentSelected = state;
                }
                if (state.status === 'complete') {
                  this.gs.log('[UPLOAD_COMPLETED]', state.response);
                  this.fg.controls['attachment_id'].patchValue(state.response.result.id);
                  this.fg.controls['attachment_id'].markAsDirty();
                  this.uploadToast = this.toast.warning(
                    `Segera Kirim Data Berkas!`,
                    `Lampiran Akan Dihapus ...`,
                    {
                      closeButton: false,
                      timeOut: CONSTANTS.timeoutDeleteTempAttachmentTime,
                      disableTimeOut: 'extendedTimeOut',
                      tapToDismiss: false,
                      progressAnimation: 'decreasing'
                    },
                    true
                  );
                  this.timerTimeout = setTimeout(() => {
                    this.gs.log('[UPLOAD_TIMEOUT]', CONSTANTS.timeoutDeleteTempAttachmentTime);
                    this.failOrCancelUpload({
                      info: 'Expired, Silahkan Upload Ulang!'
                    });
                  }, CONSTANTS.timeoutDeleteTempAttachmentTime);
                } else if (state.status === 'error') {
                  this.gs.log('[UPLOAD_ERROR]', state.response, 'error');
                  this.failOrCancelUpload(state.response);
                }
              },
              error: err => {
                this.gs.log('[UPLOAD_ERROR]', err, 'error');
                this.failOrCancelUpload(err);
              }
            });
          }
        },
        error: err => {
          this.gs.log('[BERKAS_DETAIL_ERROR]', err, 'error');
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/berkas/${this.berkasId}`
            }
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }
    if (this.timerTimeout) {
      clearTimeout(this.timerTimeout);
      this.timerTimeout = null;
    }
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
    this.subsBerkasDetail?.unsubscribe();
    this.subsBerkasUpdate?.unsubscribe();
    this.subsUpload?.unsubscribe();
  }

  uploadAttachment(event, ddl): void {
    this.ddl = ddl;
    const file = event.target.files[0];
    this.attachmentLimitExceeded = null;
    this.attachmentErrorText = null;
    this.gs.log('[ATTACHMENT_SELECTED]', file);
    this.fg.controls['attachment_id'].patchValue(null);
    this.uploadService.disconnect();
    try {
      if (file.size <= CONSTANTS.fileSizeAttachmentTotalLimit) {
        this.uploadService.handleFiles(file);
      } else {
        this.attachmentLimitExceeded = CONSTANTS.fileSizeAttachmentTotalLimit;
        this.ddl.clear(event);
      }
    } catch (error) {
      this.ddl.clear(event);
    }
  }

  submitAttachment(item: Uploader): void {
    const uploader = this.uploadService.state().find(x => x.uploadId === item.uploadId);
    if (uploader) {
      this.attachmentSelected = uploader;
      item.status = 'queue';
    }
  }

  failOrCancelUpload(err = null): void {
    this.attachmentSelected = null;
    this.attachmentErrorText = err?.result?.message || err?.info || err?.error?.message || 'Terjadi Kesalahan, Harap Reload Halaman!';
    this.uploadService.disconnect();
    this.fg.controls['attachment_id'].patchValue(null);
    this.fg.controls['attachment_id'].markAsPristine();
    this.fg.controls['attachment_id'].markAsUntouched();
    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }
    this.ddl.clear();
  }

  verify(): void {
    this.router.navigate(['/verify'], {
      queryParams: {
        returnUrl: this.router.url.split('?')[0]
      },
      state: {
        bypassCanDeactivate: true
      }
    });
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
        this.gs.log('[PROJECT_LOAD_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  hasRequiredField(abstractControl: AbstractControl, controlName: string): boolean {
    return abstractControl.get(controlName).hasValidator(Validators.required);
  }

  initForm(data): void {
    if ('attachment_' in data && data.attachment_) {
      this.attachmentFile = data.attachment_;
      if (data.attachment_.fonts_) {
        data.attachment_.fonts_.forEach(f => {
          this.attachmentFontSubtitle.push(`${f.name}.${f.ext}`);
        });
      }
      if (data.attachment_.subtitles_) {
        data.attachment_.subtitles_.forEach(s => {
          this.attachmentFontSubtitle.push(`${s.name}.${s.ext}`);
        });
      }
    }
    this.fg = this.fb.group({
      name: [data.name, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [data.description, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      projectType_id: [data.project_type_.id, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      anime_id: [(data.anime_?.id || null), Validators.compose([])],
      anime_name: [data.anime_?.name || null, Validators.compose([])],
      dorama_id: [(data.dorama_?.id || null), Validators.compose([])],
      dorama_name: [data.dorama_?.name || null, Validators.compose([])],
      fansub_list: this.fb.array([]),
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      sn_code: [data.sn_code, Validators.compose([])],
      attachment_id: [data.attachment_?.id, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      download_url: this.fb.array([]),
      private: [data.private, Validators.compose([Validators.required])],
      r18: [data.r18, Validators.compose([Validators.required])]
    });
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    this.berkasType = data.project_type_.name;
    if (data.anime_) {
      this.fg.controls['anime_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      this.fg.controls['anime_name'].setValidators([Validators.required]);
    }
    if (data.dorama_) {
      this.fg.controls['dorama_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      this.fg.controls['dorama_name'].setValidators([Validators.required]);
    }
    for (const dl of data.download_url) {
      this.addDownloadLink(dl);
    }
    for (const fs of data.fansub_) {
      this.addFansub(fs);
    }
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
        this.gs.log('[BERKAS_EDIT_SEARCH_ANIME_RESULT_SUCCESS]', res);
        this.filteredAnime = (res as any).results;
      },
      error: err => {
        this.gs.log('[BERKAS_EDIT_SEARCH_ANIME_RESULT_ERROR]', err, 'error');
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
        this.gs.log('[BERKAS_EDIT_SEARCH_DORAMA_RESULT_SUCCESS]', res);
        for (const r of (res as any).results) {
          r.mdl_id = r.mdl_id.split('-')[1];
          r.image_url = r.thumb;
        }
        this.filteredDorama = (res as any).results;
      },
      error: err => {
        this.gs.log('[BERKAS_EDIT_SEARCH_DORAMA_RESULT_ERROR]', err, 'error');
      }
    });
    this.subsProjectDetail = this.fg.get('projectType_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      retry(-1)
    ).subscribe({
      next: projectId => {
        this.gs.log('[BERKAS_CREATE_PROJECT_CHANGED]', projectId);
        this.fg.controls['anime_id'].patchValue(null);
        this.fg.controls['anime_name'].patchValue(null);
        this.fg.controls['dorama_id'].patchValue(null);
        this.fg.controls['dorama_name'].patchValue(null);
        this.fg.controls['sn_code'].patchValue(null);
        this.fg.controls['anime_id'].setErrors(null);
        this.fg.controls['anime_name'].setErrors(null);
        this.fg.controls['dorama_id'].setErrors(null);
        this.fg.controls['dorama_name'].setErrors(null);
        this.fg.controls['sn_code'].setErrors(null);
        this.fg.controls['anime_id'].clearValidators();
        this.fg.controls['anime_name'].clearValidators();
        this.fg.controls['dorama_id'].clearValidators();
        this.fg.controls['dorama_name'].clearValidators();
        this.fg.controls['sn_code'].clearValidators();
        this.fg.controls['anime_id'].markAsPristine();
        this.fg.controls['anime_name'].markAsPristine();
        this.fg.controls['dorama_id'].markAsPristine();
        this.fg.controls['dorama_name'].markAsPristine();
        this.fg.controls['sn_code'].markAsPristine();
        this.fg.controls['anime_id'].markAsUntouched();
        this.fg.controls['anime_name'].markAsUntouched();
        this.fg.controls['dorama_id'].markAsUntouched();
        this.fg.controls['dorama_name'].markAsUntouched();
        this.fg.controls['sn_code'].markAsUntouched();
        const selectedProject = this.projectList.find(p => p.id === projectId);
        if (selectedProject) {
          this.berkasType = selectedProject.name;
          if (selectedProject.name.toLowerCase().includes('anime_')) {
            this.fg.controls['anime_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
            this.fg.controls['anime_name'].setValidators([Validators.required]);
          } else if (selectedProject.name.toLowerCase().includes('dorama_')) {
            this.fg.controls['dorama_id'].setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
            this.fg.controls['dorama_name'].setValidators([Validators.required]);
          } else {
            this.fg.controls['sn_code'].setValidators([Validators.required, Validators.pattern(/^[A-Z0-9\-]+$/)]);
          }
        }
        this.fg.controls['anime_id'].updateValueAndValidity();
        this.fg.controls['anime_name'].updateValueAndValidity();
        this.fg.controls['dorama_id'].updateValueAndValidity();
        this.fg.controls['dorama_name'].updateValueAndValidity();
        this.fg.controls['sn_code'].updateValueAndValidity();
      }
    });
  }

  get getDownloadUrlControl(): UntypedFormArray {
    return (this.fg.get('download_url') as UntypedFormArray);
  }

  createDownloadLink(dataName = null, dataUrl = null): any {
    return this.fb.group({
      name: [dataName, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      url: [dataUrl, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexUrl)])]
    });
  }

  addDownloadLink(data = null): any {
    if (data) {
      this.getDownloadUrlControl.push(this.createDownloadLink(data.name, data.url));
    } else {
      this.getDownloadUrlControl.push(this.createDownloadLink());
    }
  }

  removeDownloadLink(i: number): void {
    this.getDownloadUrlControl.removeAt(i);
  }

  get getFansubControl(): UntypedFormArray {
    return (this.fg.get('fansub_list') as UntypedFormArray);
  }

  createFansub(data = null): any {
    const fbGroup = this.fb.group({
      fansub_id: [data?.id || null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_name: [data?.name || null, Validators.compose([Validators.required])]
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
        this.gs.log('[BERKAS_EDIT_SEARCH_FANSUB_RESULT]', res);
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

  addFansub(data = null): any {
    if (data) {
      this.getFansubControl.push(this.createFansub(data));
    } else {
      this.getFansubControl.push(this.createFansub());
    }
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
      id: data.id,
      name: data.title,
      image_url: data.image_url,
      type: data.media_type?.toUpperCase()
    }).subscribe({
      next: res => {
        this.gs.log('[ANIME_CHECK_ADD_SUCCESS]', res);
        this.animeCheckOrAddResponse = res.result;
        this.submitted = false;
        this.fg.controls['anime_id'].patchValue(res.result.id);
        this.fg.controls['anime_name'].patchValue(res.result.name);
      },
      error: err => {
        this.gs.log('[ANIME_CHECK_ADD_ERROR]', err, 'error');
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
        this.gs.log('[DORAMA_CHECK_ADD_ERROR]', err, 'error');
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
    this.imageLimitExceeded = null;
    this.imageErrorText = null;
    this.fg.controls['image'].patchValue(null);
    this.fg.controls['image'].markAsPristine();
    this.fg.controls['image'].markAsUntouched();
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
        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
        this.fg.controls['image'].markAsPristine();
        this.fg.controls['image'].markAsUntouched();
        this.submitted = false;
        this.imageErrorText = err.result?.message || err.info;
      }
    });
  }

  onSubmit(): void {
    this.bs.busy();
    const body = this.gs.getDirtyValues(this.fg);
    if ('fansub_list' in body) {
      const fansubId = [];
      for (const fs of this.fg.value.fansub_list) {
        fansubId.push(fs.fansub_id);
      }
      body.fansub_id = fansubId;
      delete body.fansub_list;
    }
    if (this.fg.value.attachment_id === null && this.fg.value.download_url.lenth === 0) {
      this.submitted = false;
      this.uploadToast = this.toast.warning(
        `Lampiran DDL / URL Eksternal!`,
        `Harap Mengisi Setidaknya Salah Satu ...`
      );
      this.bs.idle();
      return;
    }
    this.gs.log('[BERKAS_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsBerkasUpdate = this.berkas.updateBerkas(this.berkasId, {
      ...body
    }).subscribe({
      next: res => {
        this.gs.log('[BERKAS_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl(`/berkas/${this.berkasId}`);
      },
      error: err => {
        this.gs.log('[BERKAS_EDIT_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
