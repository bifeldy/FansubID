import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public menuList = [
    {
      url: 'ddl-list',
      name: 'Berkas DDL',
      image_url: null,
      icon: 'insert_drive_file',
      deskripsi: 'Kelola Berkas DDL'
    },
    {
      url: 'fansub-member',
      name: 'Fansub Lead & Staff',
      image_url: null,
      icon: 'stars',
      deskripsi: 'Atur Keanggotaan Fansub'
    },
    {
      url: 'project-type',
      name: 'Project Type',
      image_url: null,
      icon: 'loyalty',
      deskripsi: 'Atur Kategori Garapan'
    },
    {
      url: 'push-notification',
      name: 'Push Notification',
      image_url: null,
      icon: 'notification_add',
      deskripsi: 'Buat Pengumuman Dadakan'
    },
    {
      url: 'user-list',
      name: 'User List',
      image_url: null,
      icon: 'supervisor_account',
      deskripsi: 'Atur Seluruh Member'
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

  createNotif(notifData): any {
    return this.api.postData('/push-notification', notifData);
  }

}
