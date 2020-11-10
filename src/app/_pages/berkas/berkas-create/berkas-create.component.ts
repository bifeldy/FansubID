import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize,  map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';

import User from '../../../_shared/models/User';

@Component({
  selector: 'app-berkas-create',
  templateUrl: './berkas-create.component.html',
  styleUrls: ['./berkas-create.component.css']
})
export class BerkasCreateComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  fg: FormGroup;

  submitted = false;

  projectList = [];

  image = null;
  imageErrorText = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';

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
  subsProject = null;
  subsFansub = null;
  subsAnimeDetail = null;
  subsAnimeNew = null;
  subsImgbb = null;
  subsBerkasCreate = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private imgbb: ImgbbService,
    private toast: ToastrService,
    public as: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subsUser = this.as.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.pi.updatePageMetaData(
      `Berkas - Buat Baru`,
      `Halaman Membuat Berkas Baru`,
      `Create Berkas`
    );
    this.loadProjectList();
    this.loadFansubList();
    this.initForm();
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
    if (this.subsBerkasCreate) {
      this.subsBerkasCreate.unsubscribe();
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

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      episode: new FormControl(
        { value: null, disabled: true },
        Validators.compose([Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(0)])
      ),
      description: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      projectType_id: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      anime_id: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_list: this.fb.array([this.createFansub()]),
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      attachment_id: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      download_url: this.fb.array([this.createDownloadLink()])
    });
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
        this.gs.log('[BERKAS_CREATE_SEARCH_SUCCESS]', res);
        this.filteredAnime = (res as any).results;
      },
      err => {
        this.gs.log('[BERKAS_CREATE_SEARCH_ERROR]', err);
      }
    );
  }

  get getDownloadUrlControl(): FormArray {
    return (this.fg.get('download_url') as FormArray);
  }

  createDownloadLink(): any {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      url: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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
    return this.fb.group({
      fansub_id: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      fansub_name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
    });
  }

  removeFansub(i: number): void {
    this.getFansubControl.removeAt(i);
  }

  addFansub(): any {
    this.getFansubControl.push(this.createFansub());
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
        this.fg.controls.image.patchValue(res.data.image.url);
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
    this.submitted = true;
    if (this.fg.invalid || !this.selectedFilterAnime || this.attachmentIsUploading) {
      if (!this.selectedFilterAnime) {
        this.fg.controls.anime_id.patchValue(null);
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    const fansubId = [];
    for (const fs of this.fg.value.fansub_list) {
      fansubId.push(fs.fansub_id);
    }
    this.subsBerkasCreate = this.berkas.createBerkas({
      data: window.btoa(JSON.stringify({
        image: this.fg.value.image,
        name: this.fg.value.name,
        description: this.fg.value.description,
        episode: parseInt(this.fg.value.episode, 10),
        private: false,
        projectType_id: this.fg.value.projectType_id,
        anime_id: this.fg.value.anime_id,
        fansub_id: fansubId,
        download_url: this.fg.value.download_url,
        attachment_id: this.fg.value.attachment_id
      }))
    }).subscribe(
      res => {
        this.gs.log('[BERKAS_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/home');
      },
      err => {
        this.gs.log('[BERKAS_CREATE_ERROR]', err);
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
            this.toast.remove(this.uploadToast.toastId);
            this.ddl.clear();
          }, timer);
        }
      }
    );
  }

}
