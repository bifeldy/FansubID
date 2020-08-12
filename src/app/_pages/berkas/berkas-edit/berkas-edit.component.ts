import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize,  map, startWith } from 'rxjs/operators';

import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-berkas-edit',
  templateUrl: './berkas-edit.component.html',
  styleUrls: ['./berkas-edit.component.css']
})
export class BerkasEditComponent implements OnInit {

  berkasId = null;

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
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private as: AuthService,
    private gs: GlobalService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private project: ProjectService,
    private fansub: FansubService,
    private berkas: BerkasService
  ) {
  }

  ngOnInit(): void {
    this.pi.updatePageMetaData(
      `Fansub - Buat Baru`,
      `Halaman Menambahkan Fansub Baru`,
      `Create Fansub`
    );
    this.activatedRoute.params.subscribe(params => {
      this.berkasId = params.berkasId;
      this.berkas.getBerkas(this.berkasId).subscribe(
        res => {
          this.gs.log('[BERKAS_DETAIL_SUCCESS]', res);
          if (this.as.currentUserValue.id !== res.result.user_.id) {
            this.router.navigateByUrl('/home');
          } else {
            this.loadProjectList();
            this.loadFansubList();
            this.initForm(res.result);
          }
        },
        err => {
          this.gs.log('[BERKAS_DETAIL_ERROR]', err);
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: `/berkas/${this.berkasId}`
            }
          });
        }
      );
    });
  }

  loadProjectList(): void {
    this.project.getProject().subscribe(
      res => {
        this.gs.log('[PROJECT_LOAD_SUCCESS]', res);
        this.projectList = res.results;
      },
      err => {
        this.gs.log('[PROJECT_LOAD_ERROR]', err);
      }
    );
  }

  loadFansubList(): void {
    this.fansub.getAllFansub().subscribe(
      res => {
        this.gs.log('[FANSUB_LOAD_SUCCESS]', res);
        this.fansubs = res.results;
      },
      err => {
        this.gs.log('[FANSUB_LOAD_ERROR]', err);
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
      fansub_id: [data.fansub_.id, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      image: ['', Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      download_url: this.fb.array([])
    });
    this.image_url = data.image_url;
    this.selectedFilterAnime = data.anime_;
    this.selectedFilterAnime.title = data.anime_.name;
    this.selectedFilterFansub = data.fansub_;
    for (const dl of data.download_url) {
      this.addDownloadLink(dl);
    }
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
        this.gs.log('[BERKAS_EDIT_SEARCH_SUCCESS]', res);
        this.filteredAnime = (res as any).results;
      },
      err => {
        this.gs.log('[BERKAS_EDIT_SEARCH_ERROR]', err);
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

  createDownloadLink(dataName = null, dataUrl = null): any {
    return this.fb.group({
      name: [dataName, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      url: [dataUrl, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
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
    const body = this.gs.getDirtyValues(this.fg);
    this.gs.log('[FANSUB_EDIT_DIRTY]', body);
    this.submitted = true;
    if (this.fg.invalid) {
      this.submitted = false;
      return;
    }
    this.berkas.updateBerkas(this.berkasId, {
      image: this.fg.value.image,
      data: window.btoa(JSON.stringify({
        ...body
      }))
    }).subscribe(
      res => {
        this.gs.log('[BERKAS_EDIT_SUCCESS]', res);
        this.router.navigateByUrl(`/berkas/${this.berkasId}`);
      },
      err => {
        this.gs.log('[BERKAS_EDIT_ERROR]', err);
        this.submitted = false;
      }
    );
  }

}
