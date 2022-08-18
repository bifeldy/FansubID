// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable()
export class CloudflareService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    // https://api.cloudflare.com/#dns-records-for-a-zone-properties
  }

  async getCnames(name = '', page = 1, per_page = 10, order = 'name', direction = 'asc', type = 'CNAME', proxied = false): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records?name=${name}&type=${type}&page=${page}&per_page=${per_page}&order=${order}&direction=${direction}&proxied=${proxied}`);
      const res_raw = await this.api.getData(url, {
        'Authorization': `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      const res = {
        status: res_raw.status,
        count: 0,
        pages: 1,
        results: []
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_CNAME_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.count = res_json.result_info?.total_count || 0;
        res.pages = res_json.result_info?.total_pages || 1;
        res.results = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_CNAME_SUCCESS] 🔥 ${res_raw.status}`, res_json);
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-LIST_CNAME_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async createCname(name: string, content: string, type = 'CNAME'): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records`);
      const data = {
        name: name.includes(`.${environment.domain}`) ? name : `${name}.${environment.domain}`,
        type, content, ttl: 1,
        proxied: false
      };
      const res_raw = await this.api.postData(url, JSON.stringify(data), {
        'Authorization': `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_CNAME_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_CNAME_FAIL] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.errors[0]?.message;
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-CREATE_CNAME_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async deleteCname(id: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records/${id}`);
      const res_raw = await this.api.deleteData(url, {
        'Authorization': `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[CLOUDFLARE_SERVICE-DELETE_CNAME_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        return {
          info: `😅 ${res_raw.status} - Cloudflare API :: Hapus Sub-Domain ${id} 🤣`,
          result: {
            id: res_json.result?.id
          }
        };
      }
      throw new Error('Cloudflare API Error');
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-DELETE_CNAME_ERROR] 🔥', err, 'error');
      return null;
    }
  }

}