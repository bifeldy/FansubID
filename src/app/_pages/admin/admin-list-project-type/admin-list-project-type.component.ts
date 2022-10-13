import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { ImgbbService } from '../../../_shared/services/imgbb.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-list-project-type',
  templateUrl: './admin-list-project-type.component.html',
  styleUrls: ['./admin-list-project-type.component.css']
})
export class AdminListProjectTypeComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  subsProjectGet = null;
  subsProjectCreate = null;
  subsProjectDelete = null;
  subsImgbb = null;
  subsDialog = null;

  gambar = null;

  image = null;
  imageErrorText = null;
  imageLimitExceeded = null;
  image_url = '/assets/img/form/no-image.png';

  projectData = {
    column: ['Nama', 'Image', 'Deskripsi', 'Berkas', 'Aksi'],
    row: []
  };

  constructor(
    private fb: FormBuilder,
    private bs: BusyService,
    private gs: GlobalService,
    private ds: DialogService,
    private imgbb: ImgbbService,
    private project: ProjectService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getProject();
    }
  }

  ngOnDestroy(): void {
    this.subsProjectCreate?.unsubscribe();
    this.subsProjectGet?.unsubscribe();
    this.subsProjectDelete?.unsubscribe();
    this.subsImgbb?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      image: [null, Validators.compose([Validators.pattern(CONSTANTS.regexUrl)])]
    });
  }

  getProject(): void {
    this.bs.busy();
    if (this.subsProjectGet) {
      this.subsProjectGet.unsubscribe();
      this.bs.idle();
    }
    this.subsProjectGet = this.project.getProject().subscribe({
      next: res => {
        this.gs.log('[PROJECT_LIST_SUCCESS]', res);
        const projectDataRow = [];
        for (const r of res.results) {
          projectDataRow.push({
            Nama: r.name,
            Image: r.image_url,
            Deskripsi: r.description,
            Berkas: (r as any).total_berkas,
            Aksi: ( (r as any).total_berkas > 0 ) ? [] : [{
              type: 'button',
              icon: 'delete_forever',
              name: 'Hapus',
              id: r.id,
              nama: r.name
            }]
          });
        }
        this.projectData.row = projectDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[PROJECT_LIST_ERROR]', err, 'error');
        this.bs.idle();
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
    this.subsProjectCreate = this.project.createProject({
      name: this.fg.value.name,
      description: this.fg.value.description,
      image: this.fg.value.image,
    }).subscribe({
      next: res => {
        this.gs.log('[PROJECT_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        for (const c in this.fg.controls) {
          if (this.fg.controls[c]) {
            this.fg.controls[c].patchValue(null);
            this.fg.controls[c].updateValueAndValidity();
            this.fg.controls[c].setErrors(null);
            this.fg.controls[c].markAsUntouched();
            this.fg.controls[c].markAsPristine();
          }
        }
        this.getProject();
      },
      error: err => {
        this.gs.log('[PROJECT_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getProject();
      }
    });
  }

  async deleteProject(data): Promise<void> {
    this.gs.log('[PROJECT_LIST_CLICK_DELETE]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Hapus Proyek -- '${data.id}' :: '${data.nama}'`,
      'Menghapus Dapat Membuat Error / Menghapus Berkas Yang Menunjuk Ke Tipe Ini !'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsProjectDelete = this.project.deleteProject(data.id).subscribe({
            next: res => {
              this.gs.log('[PROJECT_LIST_CLICK_DELETE_SUCCESS]', res);
              this.bs.idle();
              this.getProject();
            },
            error: err => {
              this.gs.log('[PROJECT_LIST_CLICK_DELETE_ERROR]', err, 'error');
              this.bs.idle();
              this.getProject();
            }
          });
        } else if (re === false) {
          this.getProject();
        }
        this.subsDialog.unsubscribe();
      }
    });
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
        this.imageErrorText = err?.error?.result?.message || err?.error?.info || null;
        this.submitted = false;
      }
    });
  }

  openProject(data): void {
    this.gs.log('[PROJECT_LIST_CLICK_PROJECT]', data);
  }

}
