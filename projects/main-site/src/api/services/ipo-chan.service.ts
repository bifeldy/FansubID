// 3rd Party Library
import { FormData } from 'node-fetch';

// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable()
export class IpoChanService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    // https://trustpositif.kominfo.go.id
  }

  async checkDomain(domain_list: string[]): Promise<{ Domain: string, Status: string }[]> {
    const url = new URL(environment.externalApiInternetPositif);
    const form = new FormData();
    form.append('name', domain_list.join('\n'));
    const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
    if (res_raw.ok) {
      const res_json: any = await res_raw.json();
      this.gs.log(`[apiInternetPositif] 🛡 ${res_raw.status}`, res_json);
      return res_json.values;
    } else {
      throw new Error('Data Tidak Lengkap / Internet Positif API Down!');
    }
  }

}