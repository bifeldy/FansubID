import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CONSTANTS } from '../../../../constants';

import { GlobalService } from '../../../_shared/services/global.service';
import { InformationService } from '../../../_shared/services/information.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-list-information-dialog',
  templateUrl: './admin-list-information-dialog.component.html',
  styleUrls: ['./admin-list-information-dialog.component.css']
})
export class AdminListInformationDialogComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  submitted = false;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  infoData = {
    column: ['Id', 'Judul', 'Pemilik', 'Aksi'],
    row: []
  };

  subsInfoGet = null;
  subsInfoCreateOrUpdate = null;
  subsInfoDelete = null;
  subsDialog = null;

  constructor(
    private fb: FormBuilder,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private info: InformationService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getInfo();
    }
  }

  ngOnDestroy(): void {
    this.subsInfoGet?.unsubscribe();
    this.subsInfoCreateOrUpdate?.unsubscribe();
    this.subsInfoDelete?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  get GS(): GlobalService {
    return this.gs;
  }

  initForm(): void {
    this.fg = this.fb.group({
      id: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      title: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      confirm: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      cancel: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      close: [null, Validators.compose([Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])],
      broadcast: [null, Validators.compose([Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)])]
    });
  }

  getInfo(): void {
    this.bs.busy();
    if (this.subsInfoGet) {
      this.subsInfoGet.unsubscribe();
      this.bs.idle();
    }
    this.subsInfoGet = this.info.getAllInfo(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[INFORMATION_LIST_SUCCESS]', res);
        this.count = res.count;
        const infoDataRow = [];
        for (const r of res.results) {
          infoDataRow.push({
            content: r.content,
            confirm: r.confirm,
            cancel: r.cancel,
            close: r.close,
            foto: r.user_.image_url,
            Id: r.id,
            Judul: r.title,
            Pemilik: r.user_.username,
            Aksi: [
              { type: 'button', icon: 'close', name: 'Hapus', row: r }
            ]
          });
        }
        this.infoData.row = infoDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[INFORMATION_LIST_ERROR]', err, 'error');
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
    this.subsInfoCreateOrUpdate = this.info.createUpdateInfo({
      id: this.fg.value.id,
      title: this.fg.value.title,
      content: this.fg.value.content,
      confirm: this.fg.value.confirm,
      cancel: this.fg.value.cancel,
      close: (this.fg.value.close === '1'),
      broadcast: (this.fg.value.broadcast === '1')
    }).subscribe({
      next: res => {
        this.gs.log('[INFORMATION_CREATE_UPDATE_SUCCESS]', res);
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
        this.getInfo();
      },
      error: err => {
        this.gs.log('[INFORMATION_CREATE_UPDATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getInfo();
      }
    });
  }

  action(data): void {
    this.gs.log('[INFORMMATION_LIST_CLICK_AKSI]', data);
    if (data.name === 'Hapus') {
      this.deleteInfo(data.row);
    }
    // TODO :: Other Action
  }

  async deleteInfo(data): Promise<void> {
    this.gs.log('[INFORMATION_LIST_CLICK_DELETE]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Hapus Info -- '${data.id}' :: '${data.title}'`,
      'Yakin Akan Menghapus Informasi Ini ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsInfoDelete = this.info.deleteInfo(data.id).subscribe({
            next: res => {
              this.gs.log('[INFORMATION_LIST_CLICK_DELETE_SUCCESS]', res);
              this.bs.idle();
              this.getInfo();
            },
            error: err => {
              this.gs.log('[INFORMATION_LIST_CLICK_DELETE_ERROR]', err, 'error');
              this.bs.idle();
              this.getInfo();
            }
          });
        } else if (re === false) {
          this.getInfo();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[INFORMATION_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getInfo();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[INFORMATION_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getInfo();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[INFORMATION_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getInfo();
  }

  editInfo(data): void {
    this.gs.log('[INFORMATION_LIST_CLICK_INFORMATION]', data);
    this.fg.controls['id'].patchValue(data.Id);
    this.fg.controls['title'].patchValue(data.Judul);
    this.fg.controls['content'].patchValue(data.content);
    this.fg.controls['confirm'].patchValue(data.confirm);
    this.fg.controls['cancel'].patchValue(data.cancel);
    this.fg.controls['close'].patchValue(`${+data?.close}`);
    this.fg.controls['broadcast'].patchValue(`${+data?.broadcast}`);
  }

}
