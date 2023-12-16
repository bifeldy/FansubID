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

  checkHeaderBody(url: URL, form: any, headers: HeadersInit) {
    let formBody = null;
    if (typeof form === 'string' && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    } else if (typeof form !== 'string') {
      formBody = {};
      for (const pair of form.entries()) {
        formBody[pair[0]] = pair[1];
      }
    }
    this.gs.log(`[FETCH-HEADER] 🧩 ${url.toString()}`, headers);
    this.gs.log(`[FETCH-BODY] 🧩 ${url.toString()}`, formBody || form);
  }

  async getData(url: URL, headers: HeadersInit, signal: AbortSignal = null) {
    this.gs.log(`[FETCH_GET-HEADER] 🧩 ${url.toString()}`, headers);
    return fetch(url.toString(), { method: 'GET', headers, signal });
  }

  async postData(url: URL, form: any, headers: HeadersInit, signal: AbortSignal = null) {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'POST', body: form, headers, signal });
  }

  async putData(url: URL, form: any, headers: HeadersInit, signal: AbortSignal = null) {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'PUT', body: form, headers, signal });
  }

  async patchData(url: URL, form: any, headers: HeadersInit, signal: AbortSignal = null) {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'PATCH', body: form, headers, signal });
  }

  async deleteData(url: URL, headers: HeadersInit, signal: AbortSignal = null) {
    this.gs.log(`[FETCH_DELETE-HEADER] 🧩 ${url.toString()}`, headers);
    return fetch(url.toString(), { method: 'DELETE', headers, signal });
  }

}
