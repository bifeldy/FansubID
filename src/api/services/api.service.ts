// 3rd Party Library
import fetch, { HeadersInit } from 'node-fetch';
import { AbortSignal } from 'abort-controller';

// NodeJS Library
import { URL, URLSearchParams } from 'node:url';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {

  constructor(
    //
  ) {
    //
  }

  async getData(
    url: URL,
    headers: HeadersInit,
    signal: AbortSignal
  ) {
    return fetch(url.toString(), {
      method: 'GET',
      headers,
      signal
    });
  }

  async postData(
    url: URL,
    form: FormData | URLSearchParams | String | any,
    headers: HeadersInit,
    signal: AbortSignal
  ) {
    return fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers,
      signal
    });
  }

  async putData(
    url: URL,
    form: FormData | URLSearchParams | String | any,
    headers: HeadersInit,
    signal: AbortSignal
  ) {
    return fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers,
      signal
    });
  }

  async deleteData(
    url: URL,
    headers: HeadersInit,
    signal: AbortSignal
  ) {
    return fetch(url.toString(), {
      method: 'DELETE',
      headers,
      signal
    });
  }

}
