import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize,  map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';

import User from '../../../_shared/models/User';

@Component({
  selector: 'app-berkas-edit',
  templateUrl: './berkas-edit.component.html',
  styleUrls: ['./berkas-edit.component.css']
})
export class BerkasEditComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  berkasId = null;

  fg: FormGroup;

  submitted = false;

  projectList = [];

  image = null;
  imageErrorText = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';
  // tslint:disable-next-line: variable-name
  image_url_original = null;

  filteredAnime = [];
  selectedFilterAnime = null;
  isLoading = false;

  fansubs = [];
  filteredFansub: Observable<any[]>;

  animeCheckOrAddResponse = null;

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

  subsUser = null;
  subsParam = null;
  subsProject = null;
  subsFansub = null;
  subsAnimeDetail = null;
  subsAnimeNew = null;
  subsImgbb = null;
  subsBerkasDetail = null;
  subsBerkasUpdate = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private bs: BusyService,
    private gs: GlobalService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private toast: ToastrService,
    private imgbb: ImgbbService,
    public as: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subsUser = this.as.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.pi.updatePageMetaData(
      `Berkas - Ubah Berkas`,
      `Halaman Pembaharuan Data Berkas`,
      `Ubah Berkas`
      );
    this.subsParam = this.activatedRoute.params.subscribe(params => {
      this.berkasId = params.berkasId;
      this.bs.busy();
      this.subsBerkasDetail = this.berkas.getBerkas(this.berkasId).subscribe(
        res => {
          this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserValue.id !== res.result.user_.id) {
            if (this.gs.isBrowser) {
              this.toast.warning('Berkas Ini Bukan Milikmu', 'Whoops!');
            }
            this.router.navigateByUrl(`/berkas/${res.result.id}`);
          } else {
            this.loadProjectList();
            this.loadFansubList();
            this.initForm(res.result);
          }
        },
        err => {
          this.gs.log('[BERKAS_DETAIL_ERROR]', err);
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/berkas/${this.berkasId}`
            }
          });
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subsUser) {
      this.subsUser.unsubscribe();
    }
    if (this.uploadHandler) {
      this.uploadHandler.unsubscribe();
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
    }
    if (this.subsProject) {
      this.subsProject.unsubscribe();
    }
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    if (this.subsAnimeDetail) {
      this.subsAnimeDetail.unsubscribe();
    }
    if (this.subsAnimeNew) {
      this.subsAnimeNew.unsubscribe();
    }
    if (this.subsImgbb) {
      this.subsImgbb.unsubscribe();
    }
    if (this.subsBerkasDetail) {
      this.subsBerkasDetail.unsubscribe();
    }
    if (this.subsBerkasUpdate) {
      this.subsBerkasUpdate.unsubscribe();
    }
  }

  loadProjectList(): void {
    this.bs.busy();
    this.subsProject = this.project.getProject().subscribe(
      res => {
        this.gs.log('[PROJECT_LOAD_SUCCESS]', res);
        this.projectList = res.results;
        this.bs.idle();
      },
      err => {
        this.gs.log('[PROJECT_LOAD_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  loadFansubList(): void {
    this.bs.busy();
    this.subsFansub = this.fansub.getAllFansub().subscribe(
      res => {
        this.gs.log('[FANSUB_LOAD_SUCCESS]', res);
        this.fansubs = res.results;
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_LOAD_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  initForm(data): void {
    this.fg = this.fb.group({
      name: [data.name, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      episode: new FormControl(
        { value: data.episode, disabled: false },
        Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])
      ),
      description: [data.description, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      projectType_id: [data.project_type_.id, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      anime_id: [data.anime_.id, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_list: this.fb.array([]),
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      attachment_id: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      download_url: this.fb.array([])
    });
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    this.selectedFilterAnime = data.anime_;
    this.selectedFilterAnime.title = data.anime_.name;
    for (const dl of data.download_url) {
      this.addDownloadLink(dl);
    }
    for (const fs of data.fansub_) {
      this.addFansub(fs);
    }
    this.subsAnimeDetail = this.fg.get('anime_id').valueChanges.pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(searchQuery => this.anime.searchAnime(
        searchQuery,
        this.fg.get('projectType_id').value ?
          this.projectList.find(
            p => parseInt(this.fg.get('projectType_id').value, 10) === p.id
          ).name.toLowerCase().replace('anime_', '')
        : null
      )
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    ).subscribe(
      res => {
        this.gs.log('[BERKAS_EDIT_SEARCH_SUCCESS]', res);
        this.filteredAnime = (res as any).results;
      },
      err => {
        this.gs.log('[BERKAS_EDIT_SEARCH_ERROR]', err);
      }
    );
  }

  get getDownloadUrlControl(): FormArray {
    return (this.fg.get('download_url') as FormArray);
  }

  createDownloadLink(dataName = null, dataUrl = null): any {
    return this.fb.group({
      name: [dataName, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      url: [dataUrl, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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

  get getFansubControl(): FormArray {
    return (this.fg.get('fansub_list') as FormArray);
  }

  createFansub(dataId = null, dataName = null): any {
    return this.fb.group({
      fansub_id: [dataId, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_name: [dataName, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
    });
  }

  removeFansub(i: number): void {
    this.getFansubControl.removeAt(i);
  }

  addFansub(data = null): any {
    if (data) {
      this.getFansubControl.push(this.createFansub(data.id, data.name));
    } else {
      this.getFansubControl.push(this.createFansub());
    }
  }

  changeFilterFansub(i: number): void {
    this.filteredFansub = this.getFansubControl.controls[i].get('fansub_id').valueChanges.pipe(
      startWith(''),
      map(fansub => this.fansubs.filter(f => (
        f.name as string).toString().toLowerCase().includes(
          (fansub as string).toString().toLowerCase()
        )
      ))
    );
  }

  resetSelectedAnime(): void {
    this.selectedFilterAnime = null;
  }

  resetSelectedFansub(i: number): any {
    this.getFansubControl.controls[i].get('fansub_name').patchValue(null);
  }

  filterAnimeSelected(data): void {
    this.gs.log('[ANIME_FILTER_CLICK]', data);
    this.selectedFilterAnime = data;
    this.fg.controls.episode.enable();
    this.fg.controls.episode.patchValue(null);
    this.fg.controls.episode.setValidators([
      Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(data.episodes)
    ]);
    this.subsAnimeNew = this.anime.addNewAnime({
      data: window.btoa(JSON.stringify({
        id: this.selectedFilterAnime.mal_id,
        name: this.selectedFilterAnime.title,
        image_url: this.selectedFilterAnime.image_url,
        type: this.selectedFilterAnime.type
      }))
    }).subscribe(
      res => {
        this.gs.log('[ANIME_CHECK_ADD_SUCCESS]', res);
        this.animeCheckOrAddResponse = res.result;
      },
      err => {
        this.gs.log('[ANIME_CHECK_ADD_ERROR]', err);
      }
    );
  }

  filterFansubSelected(data, i: number): void {
    this.gs.log('[FANSUB_FILTER_CLICK]', data);
    this.getFansubControl.controls[i].get('fansub_id').patchValue(data.id);
    this.getFansubControl.controls[i].get('fansub_name').patchValue(data.name);
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
      this.image_url = this.image_url_original;
      this.gambar.clear(event);
    }
  }

  submitImage(): void {
    this.submitted = true;
    this.subsImgbb = this.imgbb.uploadImage(this.image).subscribe(
      res => {
        this.gs.log('[IMAGE_SUCCESS]', res);
        this.fg.controls.image.patchValue(res.data.image.url);
        this.fg.controls.image.markAsDirty();
        this.submitted = false;
      },
      err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.fg.controls.image.markAsPristine();
        this.submitted = false;
      }
    );
  }

  onSubmit(): void {
    this.bs.busy();
    const body = this.gs.getDirtyValues(this.fg);
    this.gs.log('[FANSUB_EDIT_DIRTY]', body);
    if ('fansub_list' in body) {
      const fansubId = [];
      for (const fs of this.fg.value.fansub_list) {
        fansubId.push(fs.fansub_id);
      }
      body.fansub_id = fansubId;
      delete body.fansub_list;
    }
    this.submitted = true;
    if (this.fg.invalid || this.attachmentIsUploading || (!this.selectedFilterAnime && this.fg.controls.anime_id.dirty === true)) {
      if (!this.selectedFilterAnime && this.fg.controls.anime_id.dirty === true) {
        this.fg.controls.anime_id.patchValue(null);
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.subsBerkasUpdate = this.berkas.updateBerkas(this.berkasId, {
      data: window.btoa(JSON.stringify({
        ...body
      }))
    }).subscribe(
      res => {
        this.gs.log('[BERKAS_EDIT_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl(`/berkas/${this.berkasId}`);
      },
      err => {
        this.gs.log('[BERKAS_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    );
  }

  uploadAttachment(event, ddl): void {
    this.ddl = ddl;
    const file = event.target.files[0];
    this.gs.log('[AttachmentLoad]', file);
    this.fg.controls.attachment_id.patchValue(null);
    this.fg.controls.attachment_id.markAsPristine();
    try {
      if (file.size <= 992 * 1000 * 1000) {
        this.attachment = file;
        this.attachmentErrorText = '';
      } else {
        this.attachment = null;
        this.attachmentErrorText = 'Ukuran File DDL Melebihi Batas 992 MB!';
        this.ddl.clear(event);
      }
    } catch (error) {
      this.attachment = null;
      this.attachmentErrorText = '';
      this.ddl.clear();
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
      lampiran: this.attachment
    }).subscribe(
      event => {
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
          this.fg.controls.attachment_id.markAsDirty();
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
            this.attachmentMode = 'determinate';
            this.attachmentIsUploading = false;
            this.attachmentIsCompleted = false;
            this.attachment = null;
            this.attachmentErrorText = '';
            this.fg.controls.attachment_id.patchValue(null);
            this.fg.controls.attachment_id.markAsPristine();
            this.toast.remove(this.uploadToast.toastId);
            this.ddl.clear();
          }, timer);
        }
      }
    );
  }

}
