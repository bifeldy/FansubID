import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize, distinctUntilChanged, retry } from 'rxjs/operators';
import { Uploader, UploadState, UploadxService } from 'ngx-uploadx';

import { CONSTANTS } from '../../../../constants';

import { RoleModel } from '../../../../models/req-res.model';

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
import { ToastService } from '../../../_shared/services/toast.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-berkas-create',
  templateUrl: './berkas-create.component.html',
  styleUrls: ['./berkas-create.component.css']
})
export class BerkasCreateComponent implements OnInit, OnDestroy {

  detailMode: boolean = false;

  uploads$: Observable<Uploader[]>;

  fg: FormGroup;

  submitted = false;

  projectList = [];

  image = null;
  imageErrorText = null;
  imageLimitExceeded = null;
  image_url = '/assets/img/form/no-image.png';

  filteredAnime = [];
  filteredDorama = [];
  filteredFansub = [];
  isLoading = false;

  animeCheckOrAddResponse = null;
  doramaCheckOrAddResponse = null;

  attachmentSelected: UploadState = null;
  attachmentErrorText = null;
  attachmentLimitExceeded = null;

  uploadToast = null;

  timerTimeout = null;

  gambar = null;
  ddl = null;

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
  subsUpload = null;
  subsDialog = null;

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
    private toast: ToastService,
    private gs: GlobalService,
    private as: AuthService,
    private uploadService: UploadxService,
    private ds: DialogService
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

  get fileTypeAttachmentAllowed(): string {
    return CONSTANTS.fileTypeAttachmentAllowed.join(', ');
  }

  get permanentStorage(): boolean {
    const role: RoleModel = this.AS.currentUserSubject?.value?.role;
    return role === RoleModel.ADMIN || role === RoleModel.MODERATOR;
  }

  get isAttachmentUploaded(): boolean {
    return this.fg.controls['attachment_id'].value !== null;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Berkas - Buat Baru`,
      `Halaman Membuat Berkas Baru`,
      `Create Berkas`
    );
    if (this.gs.isBrowser) {
      this.loadProjectList();
      this.initForm();
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
    this.subsBerkasCreate?.unsubscribe();
    this.uploadService.disconnect();
    this.subsUpload?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  toggleDetailMode(): void {
    this.detailMode = !this.detailMode;
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

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      projectType_id: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      anime_id: [null, Validators.compose([])],
      anime_name: [null, Validators.compose([])],
      dorama_id: [null, Validators.compose([])],
      dorama_name: [null, Validators.compose([])],
      fansub_list: this.fb.array([this.createFansub()]),
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])],
      attachment_id: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      download_url: this.fb.array([this.createDownloadLink()]),
      private: [false, Validators.compose([Validators.required])],
      r18: [false, Validators.compose([Validators.required])],
      permanent_storage: [false, Validators.compose([Validators.required])]
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
        this.gs.log('[BERKAS_CREATE_SEARCH_ANIME_RESULT_SUCCESS]', res);
        this.filteredAnime = (res as any).results;
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_SEARCH_ANIME_RESULT_ERROR]', err, 'error');
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
        this.gs.log('[BERKAS_CREATE_SEARCH_DORAMA_RESULT_SUCCESS]', res);
        for (const r of (res as any).results) {
          r.mdl_id = r.mdl_id.split('-')[1];
          r.image_url = r.thumb;
        }
        this.filteredDorama = (res as any).results;
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_SEARCH_DORAMA_RESULT_ERROR]', err, 'error');
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

  createDownloadLink(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      url: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexUrl)])]
    });
  }

  removeDownloadLink(i: number): void {
    this.getDownloadUrlControl.removeAt(i);
  }

  addDownloadLink(): void {
    this.getDownloadUrlControl.push(this.createDownloadLink());
  }

  get getFansubControl(): FormArray {
    return (this.fg.get('fansub_list') as FormArray);
  }

  createFansub(): FormGroup {
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

  addFansub(): void {
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
    if (this.fg.invalid || this.attachmentSelected?.status === 'uploading') {
      this.submitted = false;
      this.bs.idle();
      return;
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
    const fansubId = [];
    for (const fs of this.fg.value.fansub_list) {
      fansubId.push(fs.fansub_id);
    }
    this.subsBerkasCreate = this.berkas.createBerkas({
      image: this.fg.value.image,
      name: this.fg.value.name,
      description: this.fg.value.description,
      private: this.fg.value.private,
      r18: this.fg.value.r18,
      permanent_storage: this.fg.value.permanent_storage,
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
        this.gs.log('[BERKAS_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
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
    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }
    this.ddl.clear();
  }

  verify(): void {
    this.router.navigate(['/verify'], {
      queryParams: {
        returnUrl: this.router.url.split('?')[0]
      }
    });
  }

  async exit(): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      'Batal & Keluar',
      'Apakah Yakin Meninggalkan Halaman Ini ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.router.navigateByUrl('/berkas');
        }
      }
    });
  }

}
