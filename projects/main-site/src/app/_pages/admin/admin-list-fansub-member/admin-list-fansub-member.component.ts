import { Component, OnDestroy, OnInit } from '@angular/core';

import { FansubMemberModel } from '../../../../models/req-res.model';

import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-admin-list-fansub-member',
  templateUrl: './admin-list-fansub-member.component.html',
  styleUrls: ['./admin-list-fansub-member.component.css']
})
export class AdminListFansubMemberComponent implements OnInit, OnDestroy {

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  memberData = {
    column: ['Id', 'Fansub', 'Anggota', 'Keterangan', 'Aksi'],
    row: []
  };

  subsMemberGet = null;
  subsMemberPut = null;
  subsMemberDelete = null;
  subsDialog = null;

  constructor(
    private bs: BusyService,
    private ds: DialogService,
    private fansub: FansubService,
    private gs: GlobalService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getFansubMember();
    }
  }

  ngOnDestroy(): void {
    this.subsMemberGet?.unsubscribe();
    this.subsMemberPut?.unsubscribe();
    this.subsMemberDelete?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  getFansubMember(): void {
    this.bs.busy();
    if (this.subsMemberGet) {
      this.subsMemberGet.unsubscribe();
      this.bs.idle();
    }
    this.subsMemberGet = this.fansub.getAllFansubMember(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[FANSUB_MEMBER_LIST_SUCCESS]', res);
        const memberDataRow = [];
        this.count = res.count;
        for (const r of res.results.filter(x => x.fansub_ && x.user_)) {
          memberDataRow.push({
            foto_fansub: r.fansub_.image_url,
            foto_anggota: r.user_.image_url,
            Id: r.id,
            Fansub: r.fansub_.slug,
            Anggota: r.user_.username,
            Keterangan: r.keterangan,
            Aksi: (
              r.approved
            ) ? [
              { type: 'button', icon: 'no_meeting_room', name: 'KICK', row: r }
            ] : [
              { type: 'button', icon: 'done', name: 'ACCEPT', row: r },
              { type: 'button', icon: 'close', name: 'REJECT', row: r }
            ]
          });
        }
        this.memberData.row = memberDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_MEMBER_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getFansubMember();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[FANSUB_MEMBER_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getFansubMember();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getFansubMember();
  }

  action(data): void {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_AKSI]', data);
    if (data.name === 'KICK') {
      this.kickMember(data.row);
    } else if (data.name === 'ACCEPT') {
      this.approveOrRejectFansubMember(data.row, true);
    } else if (data.name === 'REJECT') {
      this.approveOrRejectFansubMember(data.row, false);
    }
  }

  approveOrRejectFansubMember(data: FansubMemberModel, ac: boolean): void {
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `Keterangan ${ac ? 'Approve' : 'Reject'} '${data.user_.username}' :: '${data.fansub_.slug}'`,
        input: {
          keterangan: {
            inputLabel: 'Keterangan',
            inputPlaceholder: `Pemilik, Translator, Timer, QA / QC, TypeSetter, dll.`,
            inputValue: null,
            inputRequired: true
          }
        },
        confirmText: 'OK',
        cancelText: 'Batal',
        infoText: 'Max. 10 Huruf'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.bs.busy();
          this.subsMemberPut = this.fansub.approveRejectFansubMember(data.id, {
            approved: ac,
            keterangan: re.keterangan?.substring(0, 10)
          }).subscribe({
            next: res => {
              this.gs.log('[FANSUB_MEMBER_APPROVE_REJECT_SUCCESS]', res);
              this.getFansubMember();
              this.bs.idle();
            },
            error: err => {
              this.gs.log('[FANSUB_MEMBER_APPROVE_REJECT_ERROR]', err, 'error');
              this.getFansubMember();
              this.bs.idle();
            }
          });
        } else if (re === false) {
          this.getFansubMember();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  async kickMember(data: FansubMemberModel): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Kick Member -- '${data.user_.username}' :: '${data.fansub_.slug}'`,
      'Apakah Yakin Dan Akun Telah Direview Sebelum Dikeluarkan ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsMemberDelete = this.fansub.leaveFansubMember(data.id).subscribe({
            next: res => {
              this.gs.log('[FANSUB_MEMBER_KICK_SUCCESS]', res);
              this.getFansubMember();
              this.bs.idle();
            },
            error: err => {
              this.gs.log('[FANSUB_MEMBER_KICK_ERROR]', err, 'error');
              this.getFansubMember();
              this.bs.idle();
            }
          });
        } else if (re === false) {
          this.getFansubMember();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

}
