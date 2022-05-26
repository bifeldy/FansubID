import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiKeyModel, BannedModel, InformationModel, JsonResponse, JsonResponseArray, NotificationModel, UserModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  menuList = [
    {
      url: 'banned-list',
      name: 'Banned List',
      image_url: null,
      icon: 'lock_open',
      deskripsi: 'Kelola Banned User'
    },
    {
      url: 'ddl-list',
      name: 'Berkas DDL',
      image_url: null,
      icon: 'insert_drive_file',
      deskripsi: 'Kelola Berkas DDL'
    },
    {
      url: 'cors-list',
      name: 'CORS & API Key',
      image_url: null,
      icon: 'privacy_tip',
      deskripsi: 'Cross-Origin API'
    },
    {
      url: 'fansub-member',
      name: 'Fansub Members',
      image_url: null,
      icon: 'stars',
      deskripsi: 'Keanggotaan Fansub'
    },
    {
      url: 'information',
      name: 'Informasi Dialog',
      image_url: null,
      icon: 'live_help',
      deskripsi: 'Popup Info Dialog'
    },
    {
      url: 'project-type',
      name: 'Project Type',
      image_url: null,
      icon: 'loyalty',
      deskripsi: 'Kategori Garapan'
    },
    {
      url: 'push-notification',
      name: 'Push Notification',
      image_url: null,
      icon: 'notifications_active',
      deskripsi: 'Pengumuman Dadakan'
    },
    {
      url: 'user-list',
      name: 'User List',
      image_url: null,
      icon: 'supervisor_account',
      deskripsi: 'Seluruh Member'
    }
  ];

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllNotif(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<NotificationModel>> {
    return this.api.getData(`/notification?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createNotif(notifData): Observable<JsonResponse<NotificationModel>> {
    return this.api.postData('/notification', notifData);
  }

  deleteNotif(notifId): Observable<JsonResponse<NotificationModel>> {
    return this.api.deleteData(`/notification/${notifId}`);
  }

  getAllBanned(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<BannedModel>> {
    return this.api.getData(`/banned?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  unBan(bannedId): Observable<JsonResponse<BannedModel>> {
    return this.api.deleteData(`/banned/${bannedId}`);
  }

  ban(bannedData): Observable<JsonResponse<BannedModel>> {
    return this.api.postData(`/banned`, bannedData);
  }

  promote(promoteData): Observable<JsonResponse<UserModel>> {
    return this.api.postData(`/promote`, promoteData);
  }

  getAllCors(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<ApiKeyModel>> {
    return this.api.getData(`/api-key?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  revokeCors(corsId): Observable<JsonResponse<ApiKeyModel>> {
    return this.api.deleteData(`/api-key/${corsId}`);
  }

  getAllInfo(q: string, page: number, row: number, sort: string, order: string): Observable<JsonResponseArray<InformationModel>> {
    return this.api.getData(`/information?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createUpdateInfo(infoData): Observable<JsonResponse<InformationModel>> {
    return this.api.postData(`/information`, infoData);
  }

  deleteInfo(infoId): Observable<JsonResponse<InformationModel>> {
    return this.api.deleteData(`/information/${infoId}`);
  }

}
