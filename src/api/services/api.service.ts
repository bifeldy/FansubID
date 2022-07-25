// 3rd Party Library
import fetch, { HeadersInit } from 'node-fetch';

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

  async get(
    url: URL,
    headers: HeadersInit
  ) {
    return fetch(url.toString(), {
      method: 'GET',
      headers
    });
  }

  async post(
    url: URL,
    form: FormData | URLSearchParams,
    headers: HeadersInit
  ) {
    return fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers
    });
  }

  async putData(
    url: URL,
    form: FormData | URLSearchParams,
    headers: HeadersInit
  ) {
    return fetch(url.toString(), {
      method: 'POST',
      body: form,
      headers
    });
  }

  async deleteData(
    url: URL,
    headers: HeadersInit
  ) {
    return fetch(url.toString(), {
      method: 'DELETE',
      headers
    });
  }

}
