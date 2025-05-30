import fetch, { HeadersInit, Response } from 'node-fetch';
import { AbortSignal } from 'abort-controller';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { GlobalService } from './global.service';

@Injectable()
export class ApiService {

  constructor(
    private gs: GlobalService
  ) {
  }

  checkHeaderBody(url: URL, form: string | FormData | URLSearchParams, headers: HeadersInit): void {
    let formBody: any = null;

    if (typeof form === 'string') {
      if (headers instanceof Headers) {
        if (!headers.has('Content-Type')) {
          headers.set('Content-Type', 'application/json');
        }
      } else if (!('Content-Type' in headers)) {
        headers['Content-Type'] = 'application/json';
      }
    } else if (typeof form?.entries === 'function') {
      formBody = {};
      for (const [key, value] of form.entries()) {
        formBody[key] = value;
      }
    }

    this.gs.log(`[FETCH-HEADER] 🧩 ${url.toString()}`, headers);
    this.gs.log(`[FETCH-BODY] 🧩 ${url.toString()}`, formBody || form);
  }

  async getData(url: URL, headers: HeadersInit, signal?: AbortSignal): Promise<Response> {
    this.gs.log(`[FETCH_GET-HEADER] 🧩 ${url.toString()}`, headers);
    return fetch(url.toString(), { method: 'GET', headers, signal });
  }

  async postData(url: URL, form: string | FormData | URLSearchParams, headers: HeadersInit, signal?: AbortSignal): Promise<Response> {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'POST', body: form, headers, signal });
  }

  async putData(url: URL, form: string | FormData | URLSearchParams, headers: HeadersInit, signal?: AbortSignal): Promise<Response> {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'PUT', body: form, headers, signal });
  }

  async patchData(url: URL, form: string | FormData | URLSearchParams, headers: HeadersInit, signal?: AbortSignal): Promise<Response> {
    this.checkHeaderBody(url, form, headers);
    return fetch(url.toString(), { method: 'PATCH', body: form, headers, signal });
  }

  async deleteData(url: URL, he
