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

  async getDnss(name = '', page = 1, per_page = 10, order = 'name', direction = 'asc', type = 'A,CNAME'): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records?name.contains=${name}&type=${type}&page=${page}&per_page=${per_page}&order=${order}&direction=${direction}&comment.contains=${environment.cloudflare.comment}`);
      const res_raw = await this.api.getData(url, {
        Authorization: `Bearer ${environment.cloudflare.key}`,
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
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.count = res_json.result_info?.total_count || 0;
        res.pages = res_json.result_info?.total_pages || 1;
        res.results = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json, 'error');
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-LIST_DNS_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async createDns(name: string, content: string, type: string, comment: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records`);
      const res_raw = await this.api.postData(
        url,
        JSON.stringify({
          name: name.includes(`.${environment.cloudflare.domain}`) ? name : `${name}.${environment.cloudflare.domain}`,
          type, content, comment, ttl: 1,
          proxied: type === 'A' ? true : false
        }),
        {
          Authorization: `Bearer ${environment.cloudflare.key}`,
          ...environment.nodeJsXhrHeader
        }
      );
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_DNS_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = {
          message: res_json.errors[0]?.message
        };
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-CREATE_DNS_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async detailDns(id: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records/${id}`);
      const res_raw = await this.api.getData(url, {
        Authorization: `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-DETAIL_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-DETAIL_DNS_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = {
          message: res_json.errors[0]?.message
        };
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-DETAIL_DNS_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async updateDns(id: string, name: string, content: string, type: string, comment: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records/${id}`);
      const res_raw = await this.api.putData(
        url,
        JSON.stringify({
          name: name.includes(`.${environment.cloudflare.domain}`) ? name : `${name}.${environment.cloudflare.domain}`,
          type, content, comment, ttl: 1,
          proxied: type === 'A' ? true : false
        }),
        {
          Authorization: `Bearer ${environment.cloudflare.key}`,
          ...environment.nodeJsXhrHeader
        }
      );
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-UPDATE_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-UPDATE_DNS_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = {
          message: res_json.errors[0]?.message
        };
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-UPDATE_DNS_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async deleteDns(id: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/dns_records/${id}`);
      const res_raw = await this.api.deleteData(url, {
        Authorization: `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-DELETE_DNS_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-DELETE_DNS_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = res_json.errors[0]?.message;
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-DELETE_DNS_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async getFailToBan(ip_domain = '', page = 1, per_page = 10, order = 'configuration.value', direction = 'asc'): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/firewall/access_rules/rules?configuration.value=${ip_domain}&match=any&page=${page}&per_page=${per_page}&order=${order}&direction=${direction}`);
      const res_raw = await this.api.getData(url, {
        Authorization: `Bearer ${environment.cloudflare.key}`,
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
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_FIREWALL_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.count = res_json.result_info?.total_count || 0;
        res.pages = res_json.result_info?.total_pages || 1;
        res.results = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-LIST_FIREWALL_SUCCESS] 🔥 ${res_raw.status}`, res_json, 'error');
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-LIST_FIREWALL_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async createFailToBan(ip_domain: string, mode = 'block', notes = '[404, 429, 5XX] Too Much ...'): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/firewall/access_rules/rules`);
      const res_raw = await this.api.postData(
        url,
        JSON.stringify({
          configuration: {
            target: 'ip',
            value: ip_domain
          },
          mode,
          notes
        }),
        {
          Authorization: `Bearer ${environment.cloudflare.key}`,
          ...environment.nodeJsXhrHeader
        }
      );
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_FIREWALL_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-CREATE_FIREWALL_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = {
          message: res_json.errors[0]?.message
        };
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-CREATE_FIREWALL_ERROR] 🔥', err, 'error');
      return null;
    }
  }

  async deleteFailToBan(id: string): Promise<any> {
    try {
      const url = new URL(`${environment.cloudflare.url}/zones/${environment.cloudflare.zoneId}/firewall/access_rules/rules/${id}`);
      const res_raw = await this.api.deleteData(url, {
        Authorization: `Bearer ${environment.cloudflare.key}`,
        ...environment.nodeJsXhrHeader
      });
      const res = {
        status: res_raw.status,
        result: null
      };
      const res_json: any = await res_raw.json();
      if (res_raw.ok) {
        this.gs.log(`[CLOUDFLARE_SERVICE-DELETE_FIREWALL_SUCCESS] 🔥 ${res_raw.status}`, res_json);
        res.result = res_json.result;
      } else {
        this.gs.log(`[CLOUDFLARE_SERVICE-DELETE_FIREWALL_FAIL] 🔥 ${res_raw.status}`, res_json, 'error');
        res.result = res_json.errors[0]?.message;
      }
      return res;
    } catch (err) {
      this.gs.log('[CLOUDFLARE_SERVICE-DELETE_FIREWALL_ERROR] 🔥', err, 'error');
      return null;
    }
  }

}