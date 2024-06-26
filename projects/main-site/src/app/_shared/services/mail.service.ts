import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, MailboxModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getMailbox(type = 'inbox', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<MailboxModel>> {
    return this.api.getData(`/mail-${type}?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllMail(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<MailboxModel>> {
    return this.api.getData(`/mail?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getMail(mailId: string): Observable<JsonResponse<MailboxModel>> {
    return this.api.getData(`/mail/${mailId}`);
  }

  sendMail(mailData: any) {
    return this.api.postData('/mail', mailData);
  }

}
