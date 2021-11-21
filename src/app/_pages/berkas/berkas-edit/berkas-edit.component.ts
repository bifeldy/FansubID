import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize,  map, startWith, distinctUntilChanged, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

import User from '../../../_shared/models/User';

@Component({
  selector: 'app-berkas-edit',
  templateUrl: './berkas-edit.component.html',
  styleUrls: ['./berkas-edit.component.css']
})
export class BerkasEditComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  berkasId = '';

  fg: FormGroup;

  submitted = false;

  projectList = [];

  image = null;
  imageErrorText = null;
  image_url = '/assets/img/form-no-image.png';
  image_url_original = null;

  filteredAnime = [];
  filteredDorama = [];
  selectedFilterAnime = null;
  selectedFilterDorama = null;
  isLoading = false;

  fansubs = [];
  filteredFansub: Observable<any[]>;

  animeCheckOrAddResponse = null;
  doramaCheckOrAddResponse = null;

  attachmentFile = null;
  attachmentFontSubtitle = [];

  gambar = null;

  subsUser = null;
  subsProject = null;
  subsFansub = null;
  subsAnimeDetail = null;
  subsDoramaDetail = null;
  subsAnimeNew = null;
  subsDoramaNew = null;
  subsImgbb = null;
  subsBerkasDetail = null;
  subsBerkasUpdate = null;

  berkasType = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private toast: ToastrService,
    private imgbb: ImgbbService,
    public gs: GlobalService,
    public as: AuthService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Berkas - Ubah Berkas`,
      `Halaman Pembaharuan Data Berkas`,
      `Ubah Berkas`
    );
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.berkasId = this.activatedRoute.snapshot.paramMap.get('berkasId');
      this.bs.busy();
      this.subsBerkasDetail = this.berkas.getBerkas(this.berkasId).subscribe({
        next: res => {
          this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
          this.bs.idle();
          if (this.as.currentUserValue.id !== res.result.user_.id) {
            this.toast.warning('Berkas Ini Bukan Milikmu', 'Whoops!');
            this.router.navigateByUrl(`/berkas/${res.result.id}`);
          } else {
            this.loadProjectList();
            this.loadFansubList();
            this.initForm(res.result);
          }
        },
        error: err => {
          this.gs.log('[BERKAS_DETAIL_ERROR]', err);
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
    this.subsUser?.unsubscribe();
    this.subsProject?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsAnimeDetail?.unsubscribe();
    this.subsDoramaDetail?.unsubscribe();
    this.subsAnimeNew?.unsubscribe();
    this.subsDoramaNew?.unsubscribe();
    this.subsImgbb?.unsubscribe();
    this.subsBerkasDetail?.unsubscribe();
    this.subsBerkasUpdate?.unsubscribe();
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

  loadFansubList(): void {
    this.bs.busy();
    this.subsFansub = this.fansub.getAllFansub().subscribe({
      next: res => {
        this.gs.log('[FANSUB_LOAD_SUCCESS]', res);
        this.fansubs = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_LOAD_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  initForm(data): void {
    if ('attachment_' in data && data.attachment_) {
      this.attachmentFile = data.attachment_;
      if (data.attachment_.fonts_) {
        data.attachment_.fonts_.forEach(f => {
          this.attachmentFontSubtitle.push(f.name);
        });
      }
      if (data.attachment_.subtitles_) {
        data.attachment_.subtitles_.forEach(s => {
          this.attachmentFontSubtitle.push(s.name);
        });
      }
    }
    this.fg = this.fb.group({
      name: [data.name, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      description: [data.description, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      projectType_id: [data.project_type_.id, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      anime_id: [(data.anime_?.id || null), Validators.compose([])],
      dorama_id: [(data.dorama_?.id || null), Validators.compose([])],
      fansub_list: this.fb.array([]),
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      download_url: this.fb.array([]),
      private: [data.private, Validators.compose([Validators.required])]
    });
    this.image_url = data.image_url;
    this.image_url_original = this.image_url;
    this.berkasType = data.project_type_.name;
    if (data.anime_) {
      this.selectedFilterAnime = data.anime_;
      this.selectedFilterAnime.title = data.anime_.name;
      this.fg.controls.anime_id.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
    }
    if (data.dorama_) {
      this.selectedFilterDorama = data.dorama_;
      this.selectedFilterDorama.title = data.dorama_.name;
      this.fg.controls.dorama_id.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
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
      switchMap(searchQuery => this.anime.searchAnime(searchQuery).pipe(finalize(() => this.isLoading = false))), retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_EDIT_SEARCH_ANIME_RESULT]', res);
        this.filteredAnime = (res as any).results;
      }
    });
    this.subsDoramaDetail = this.fg.get('dorama_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchQuery => this.dorama.searchDorama(searchQuery).pipe(finalize(() => this.isLoading = false))), retry(-1)
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_EDIT_SEARCH_DORAMA_RESULT]', res);
        for (const r of (res as any).results) {
          r.mdl_id = r.mdl_id.split('-')[1];
          r.image_url = r.thumb;
        }
        this.filteredDorama = (res as any).results;
      }
    });
    this.fg.get('projectType_id').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      retry(-1)
    ).subscribe({
      next: projectId => {
        this.gs.log('[BERKAS_EDIT_PROJECT_CHANGED]', projectId);
        const selectedProject = this.projectList.find(p => p.id === projectId);
        this.resetSelectedAnime();
        this.resetSelectedDorama();
        this.fg.controls.anime_id.patchValue(null);
        this.fg.controls.dorama_id.patchValue(null);
        this.fg.controls.anime_id.setErrors(null);
        this.fg.controls.dorama_id.setErrors(null);
        this.fg.controls.anime_id.clearValidators();
        this.fg.controls.dorama_id.clearValidators();
        this.fg.controls.anime_id.markAsPristine();
        this.fg.controls.dorama_id.markAsPristine();
        this.fg.controls.anime_id.markAsUntouched();
        this.fg.controls.dorama_id.markAsUntouched();
        if (selectedProject.name.toLowerCase().includes('anime')) {
          this.berkasType = selectedProject.name;
          this.fg.controls.anime_id.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        } else if (selectedProject.name.toLowerCase().includes('dorama')) {
          this.berkasType = selectedProject.name;
          this.fg.controls.dorama_id.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        } else {
          this.berkasType = '';
        }
        this.fg.controls.anime_id.updateValueAndValidity();
        this.fg.controls.dorama_id.updateValueAndValidity();
      }
    });
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

  resetSelectedDorama(): void {
    this.selectedFilterDorama = null;
  }

  resetSelectedFansub(i: number): any {
    this.getFansubControl.controls[i].get('fansub_name').patchValue(null);
  }

  filterAnimeSelected(data): void {
    this.gs.log('[ANIME_FILTER_CLICK]', data);
    this.submitted = true;
    this.selectedFilterAnime = data;
    this.subsAnimeNew = this.anime.addNewAnime({
      id: this.selectedFilterAnime.mal_id,
      name: this.selectedFilterAnime.title,
      image_url: this.selectedFilterAnime.image_url,
      type: this.selectedFilterAnime.type
    }).subscribe({
      next: res => {
        this.gs.log('[ANIME_CHECK_ADD_SUCCESS]', res);
        this.animeCheckOrAddResponse = res.result;
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[ANIME_CHECK_ADD_ERROR]', err);
        this.submitted = false;
        this.resetSelectedAnime();
        this.fg.controls.anime_id.patchValue(null);
      }
    });
  }

  filterDoramaSelected(data): void {
    this.gs.log('[DORAMA_FILTER_CLICK]', data);
    this.submitted = true;
    this.selectedFilterDorama = data;
    this.subsDoramaNew = this.dorama.addNewDorama({
      id: parseInt(this.selectedFilterDorama.mdl_id, 10),
      slug: this.selectedFilterDorama.slug,
      name: this.selectedFilterDorama.title,
      image_url: this.selectedFilterDorama.image_url,
      type: this.selectedFilterDorama.type
    }).subscribe({
      next: res => {
        this.gs.log('[DORAMA_CHECK_ADD_SUCCESS]', res);
        this.doramaCheckOrAddResponse = res.result;
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[DORAMA_CHECK_ADD_ERROR]', err);
        this.submitted = false;
        this.resetSelectedDorama();
        this.fg.controls.dorama_id.patchValue(null);
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
    this.fg.controls.image.patchValue(null);
    this.fg.controls.image.markAsPristine();
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
        this.fg.controls.image.patchValue(res.result.url);
        this.fg.controls.image.markAsDirty();
        this.submitted = false;
      },
      error: err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.fg.controls.image.markAsPristine();
        this.submitted = false;
      }
    });
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
    if (this.fg.invalid || (
      (!this.selectedFilterAnime && this.fg.controls.anime_id.dirty === true) &&
      (!this.selectedFilterDorama && this.fg.controls.dorama_id.dirty === true)
    )) {
      if (!this.selectedFilterAnime && this.fg.controls.anime_id.dirty === true) {
        this.fg.controls.anime_id.patchValue(null);
      }
      if (!this.selectedFilterDorama && this.fg.controls.dorama_id.dirty === true) {
        this.fg.controls.dorama_id.patchValue(null);
      }
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
        this.gs.log('[BERKAS_EDIT_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}
