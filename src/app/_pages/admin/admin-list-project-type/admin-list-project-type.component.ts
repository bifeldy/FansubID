import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { ProjectService } from '../../../_shared/services/project.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AdminService } from '../../../_shared/services/admin.service';
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

  gambar = null;

  image = null;
  imageErrorText = null;
  // tslint:disable-next-line: variable-name
  image_url = '/assets/img/form-no-image.png';

  projectData = {
    column: ['Nama', 'Image', 'Deskripsi', 'Aksi'],
    row: []
  };

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private bs: BusyService,
    public gs: GlobalService,
    public adm: AdminService,
    private ds: DialogService,
    private imgbb: ImgbbService,
    private project: ProjectService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getProject();
    }
  }

  ngOnDestroy(): void {
    if (this.subsProjectCreate) {
      this.subsProjectCreate.unsubscribe();
    }
    if (this.subsProjectGet) {
      this.subsProjectGet.unsubscribe();
    }
    if (this.subsProjectDelete) {
      this.subsProjectDelete.unsubscribe();
    }
    if (this.subsImgbb) {
      this.subsImgbb.unsubscribe();
    }
  }

  initForm(): void {
    this.fg = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      description: [null, Validators.compose([Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)])],
      image: [null, Validators.compose([Validators.pattern(this.gs.allKeyboardKeysRegex)])]
    });
  }

  getProject(): void {
    this.bs.busy();
    if (this.subsProjectGet) {
      this.subsProjectGet.unsubscribe();
      this.bs.idle();
    }
    this.subsProjectGet = this.project.getProject().subscribe(
      res => {
        this.gs.log('[PROJECT_LIST_SUCCESS]', res);
        const projectDataRow = [];
        for (const r of res.results) {
          projectDataRow.push({
            Nama: r.name,
            Image: r.image_url,
            Deskripsi: r.description,
            Aksi: [{
              type: 'button',
              icon: 'close',
              name: 'Hapus',
              id: r.id,
              nama: r.name
            }]
          });
        }
        this.projectData.row = projectDataRow;
        this.bs.idle();
      },
      err => {
        this.gs.log('[PROJECT_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
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
    }).subscribe(
      res => {
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
      err => {
        this.gs.log('[PROJECT_CREATE_ERROR]', err);
        this.submitted = false;
        this.bs.idle();
        this.getProject();
      }
    );
  }

  deleteProject(data): void {
    this.gs.log('[PROJECT_LIST_CLICK_DELETE]', data);
    this.ds.openInfoDialog({
      data: {
        title: `Hapus Proyek -- '${data.id}' :: '${data.nama}'`,
        htmlMessage: 'Menghapus Dapat Membuat Error Berkas Yang Menunjuk Ke Tipe Ini !',
        confirmText: 'Ya, Hapus',
        cancelText: 'Tidak, Batal'
      },
      disableClose: false
    }).afterClosed().subscribe(re => {
      if (re === true) {
        this.bs.busy();
        this.subsProjectDelete = this.project.deleteProject(data.id).subscribe(
          res => {
            this.gs.log('[PROJECT_LIST_CLICK_DELETE_SUCCESS]', res);
            this.bs.idle();
            this.getProject();
          },
          err => {
            this.gs.log('[PROJECT_LIST_CLICK_DELETE_ERROR]', err);
            this.bs.idle();
            this.getProject();
          }
        );
      } else if (re === false) {
        this.getProject();
      }
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
    this.subsImgbb = this.imgbb.uploadImage({
      file: this.image
    }).subscribe(
      res => {
        this.gs.log('[IMAGE_SUCCESS]', res);
        this.fg.controls.image.patchValue(res.result.url);
        this.submitted = false;
      },
      err => {
        this.gs.log('[IMAGE_ERROR]', err);
        this.fg.controls.image.patchValue(null);
        this.submitted = false;
      }
    );
  }

}
