import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize,  map, startWith } from 'rxjs/operators';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-berkas-create',
  templateUrl: './berkas-create.component.html',
  styleUrls: ['./berkas-create.component.css']
})
export class BerkasCreateComponent implements OnInit {

  fg: FormGroup;

  submitted = false;

  projectList = [];

  imageErrorText = null;
  selectedImageFileName = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';

  filteredAnime = [];
  selectedFilterAnime = null;
  isLoading = false;

  fansubs = [];
  filteredFansub: Observable<any[]>;
  selectedFilterFansub = null;

  animeCheckOrAddResponse = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService
  ) { }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Fansub - Buat Baru`,
      `Halaman Menambahkan Fansub Baru`,
      `Create Fansub`
    );
    this.loadProjectList();
    this.loadFansubList();
    this.initForm();
  }

  loadProjectList(): void {
    this.bs.busy();
    this.project.getProject().subscribe(
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
    this.fansub.getAllFansub().subscribe(
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
      fansub_id: [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      image: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      download_url: this.fb.array([this.createDownloadLink()])
    });
    this.fg.get('anime_id').valueChanges.pipe(
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
    this.filteredFansub = this.fg.get('fansub_id').valueChanges.pipe(
      startWith(''),
      map(fansub => this.fansubs.filter(f => f.name.includes(fansub)))
    );
  }

  get getDownloadUrlControl(): FormArray {
    return (this.fg.get('download_url') as FormArray);
  }

  createDownloadLink(): any {
    return this.fb.group({
      name: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      url: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
  }

  addDownloadLink(): any {
    this.getDownloadUrlControl.push(this.createDownloadLink());
  }

  removeDownloadLink(i: number): void {
    this.getDownloadUrlControl.removeAt(i);
  }

  resetSelectedAnime(): void {
    this.selectedFilterAnime = null;
  }

  resetSelectedFansub(): any {
    this.selectedFilterFansub = null;
  }

  filterAnimeSelected(data): void {
    this.gs.log('[ANIME_FILTER_CLICK]', data);
    this.selectedFilterAnime = data;
    this.fg.controls.episode.enable();
    this.fg.controls.episode.patchValue(null);
    this.fg.controls.episode.setValidators([
      Validators.required, Validators.pattern(/^\d+$/), Validators.min(1), Validators.max(data.episodes)
    ]);
    this.anime.addNewAnime({
      data: window.btoa(JSON.stringify({
        id: this.selectedFilterAnime.mal_id,
        name: this.selectedFilterAnime.title,
        image_url: this.selectedFilterAnime.image_url
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

  filterFansubSelected(data): void {
    this.gs.log('[FANSUB_FILTER_CLICK]', data);
    this.selectedFilterFansub = data;
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
    this.submitted = true;
    if (this.fg.invalid || !this.selectedFilterAnime || !this.selectedFilterFansub) {
      if (!this.selectedFilterAnime) {
        this.fg.controls.anime_id.patchValue(null);
      }
      if (!this.selectedFilterFansub) {
        this.fg.controls.fansub_id.patchValue(null);
      }
      this.submitted = false;
      this.bs.idle();
      return;
    }
    this.berkas.createBerkas({
      image: this.fg.value.image,
      data: window.btoa(JSON.stringify({
        name: this.fg.value.name,
        description: this.fg.value.description,
        episode: parseInt(this.fg.value.episode, 10),
        private: false,
        projectType_id: this.fg.value.projectType_id,
        anime_id: this.fg.value.anime_id,
        fansub_id: this.fg.value.fansub_id,
        download_url: this.fg.value.download_url,
      }))
    }).subscribe(
      res => {
        this.gs.log('[BERKAS_CREATE_SUCCESS]', res);
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

}
