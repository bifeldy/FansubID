import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityMetadata, Equal, FindManyOptions, FindOneOptions, FindConditions, ILike, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Request } from 'express';

import { ApiKey } from '../entities/ApiKey';

import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class ApiKeyService {

  constructor(
    @InjectRepository(ApiKey) private apiKeyRepo: Repository<ApiKey>,
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  new(): ApiKey {
    return new ApiKey();
  }

  instance(): Repository<ApiKey> {
    return this.apiKeyRepo;
  }

  getMetaData(): EntityMetadata {
    return this.apiKeyRepo.metadata;
  }

  find(options: FindManyOptions<ApiKey>) {
    this.gs.log('[API_KEY_SERVICE-FIND_ALL] 🏓', options);
    return this.apiKeyRepo.find(options);
  }

  findAndCount(options: FindManyOptions<ApiKey>) {
    this.gs.log('[API_KEY_SERVICE-FIND_AND_COUNT] 🏓', options);
    return this.apiKeyRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<ApiKey>): Promise<ApiKey> {
    this.gs.log('[API_KEY_SERVICE-GET_BY] 🏓', options);
    return this.apiKeyRepo.findOneOrFail(options);
  }

  save(apiKey: ApiKey): Promise<ApiKey> {
    this.gs.log('[API_KEY_SERVICE-SAVE] 🏓', apiKey);
    return this.apiKeyRepo.save(apiKey);
  }

  count(options: FindManyOptions<ApiKey>): Promise<number> {
    this.gs.log('[API_KEY_SERVICE-COUNT] 🏓', options);
    return this.apiKeyRepo.count(options);
  }

  remove(apiKey: ApiKey | ApiKey[]): Promise<ApiKey | ApiKey[]> {
    this.gs.log('[API_KEY_SERVICE-REMOVE] 🏓', apiKey);
    return this.apiKeyRepo.remove(apiKey as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[API_KEY_SERVICE-QUERY] 🏓', query);
    return this.apiKeyRepo.query(query, parameters);
  }

  update(criteria: FindConditions<ApiKey>, partialEntity: QueryDeepPartialEntity<ApiKey>): Promise<UpdateResult> {
    this.gs.log('[API_KEY_SERVICE-UPDATE] 🏓', criteria);
    return this.apiKeyRepo.update(criteria, partialEntity);
  }

  insert(apiKey: ApiKey): Promise<InsertResult> {
    this.gs.log('[API_KEY_SERVICE-INSERT] 🏓', apiKey);
    return this.apiKeyRepo.insert(apiKey);
  }

  /** */

  getOriginIpCc(req: Request, ipOnly = false): { origin_ip: string, country_code: string } {
    let originIp = '';
    if (!ipOnly) {
      originIp = originIp || req.headers.origin || req.headers.referer || '';
    }
    originIp = (originIp || req.headers['cf-connecting-ip'] || req.ip || '').toString();
    const countryCode = (req.headers['cf-ipcountry'] || '').toString();
    return {
      origin_ip: originIp,
      country_code: countryCode
    };
  }

  getCorsOptions(): CorsOptions {
    return {
      origin: async (origin, callback) => {
        return callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'OPTIONS', 'PATCH']
    };
  }

  async checkKey(origin: string, key: string): Promise<boolean> {
    let isAllowed = false;
    // Remove Prefixes
    if (origin.startsWith('::ffff:')) {
      origin = origin.slice(7, origin.length);
    }
    if (origin.startsWith('http://')) {
      origin = origin.slice(7, origin.length);
    } else if (origin.startsWith('https://')) {
      origin = origin.slice(8, origin.length);
    }
    if (origin.startsWith('www.')) {
      origin = origin.slice(4, origin.length);
    }
    // Get Domain Or IP Maybe With Port Included And Remove Folder Path
    origin = origin.split('/')[0];
    // Remove Port
    let totalColon = 0;
    for (let i = 0; i < origin.length; i++) {
      if (origin[i] === ':') {
        totalColon++;
      }
      if (totalColon > 1) {
        break;
      }
    }
    if (totalColon === 1) {
      // IPv4
      origin = origin.split(':')[0];
    } else {
      // IPv6
      origin = origin.split(']')[0];
      if (origin.startsWith('[')) {
        origin = origin.slice(1, origin.length);
      }
    }
    if (this.cfg.bypassApiKeyRateLimit.includes(origin)) {
      return true;
    }
    try {
      const apiKey = await this.findOneOrFail({
        where: [
          {
            ip_domain: ILike(origin),
            api_key: Equal(key)
          },
          {
            ip_domain: Equal('*'),
            api_key: Equal(key)
          }
        ]
      });
      this.gs.log('[API_KEY_SERVICE-CHECK_KEY_SUCCESS] 🏓', apiKey);
      isAllowed = true;
    } catch (error) {
      this.gs.log('[API_KEY_SERVICE-CHECK_KEY_ERROR] 🏓', error, 'error');
    }
    return isAllowed;
  }

}
