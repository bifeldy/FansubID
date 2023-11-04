import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, TicketModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  delete(ticketId: any): Observable<JsonResponse<TicketModel>> {
    return this.api.deleteData(`/ticket/${ticketId}`);
  }

  getAllTicket(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<TicketModel>> {
    return this.api.getData(`/ticket?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createTicket(ticketData): Observable<JsonResponse<TicketModel>> {
    return this.api.postData(`/ticket`, ticketData);
  }

  updateTicket(ticketId, ticketData): Observable<JsonResponse<TicketModel>> {
    return this.api.putData(`/ticket/${ticketId}`, ticketData);
  }

  getTicket(ticketId: number): Observable<JsonResponse<TicketModel>> {
    return this.api.getData(`/ticket/${ticketId}`);
  }

}
