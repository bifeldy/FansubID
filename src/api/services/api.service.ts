// 3rd Party Library
import fetch, { HeadersInit } from 'node-fetch';
import { AbortSignal } from 'abort-controller';

// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';

import { GlobalService } from './global.service';

@Injectable()
export class ApiService {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  async getData(url: URL, headers: HeadersInit, signal: AbortSignal) {
    this.gs.log(`[FetchGET-HEADER] 🧩 ${url.toString()}`, headers);
    return fetch(url.toString(), { method: 'GET', headers, signal });
  }

  async postData(url: URL, form: any, headers: HeadersInit, signal: AbortSignal) {
    this.gs.log(`[FetchPOST-HEADER] 🧩 ${url.toString()}`, headers);
    this.gs.log(`[FetchPOST-BODY] 🧩 ${url.toString()}`, form);
    return fetch(url.toString(), { method: 'POST', body: form, headers, signal });
  }

  async putData(url: URL, form: any, headers: HeadersInit, signal: AbortSignal) {
    this.gs.log(`[FetchPUT-HEADER] 🧩 ${url.toString()}`, headers);
    this.gs.log(`[FetchPUT-BODY] 🧩 ${url.toString()}`, form);
    return fetch(url.toString(), { method: 'POST', body: form, headers, signal });
  }

  async deleteData(url: URL, headers: HeadersInit, signal: AbortSignal) {
    this.gs.log(`[FetchDELETE-HEADER] 🧩 ${url.toString()}`, headers);
    return fetch(url.toString(), { method: 'DELETE', headers, signal });
  }

}
