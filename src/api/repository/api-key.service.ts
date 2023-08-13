import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityMetadata, Equal, FindManyOptions, FindOneOptions, FindConditions, InsertResult, Repository, UpdateResult, ILike } from 'typeorm';

import { ApiKey } from '../entities/ApiKey';

import { UserModel } from '../../models/req-res.model';

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

  find(options: FindManyOptions<ApiKey>): Promise<ApiKey[]> {
    this.gs.log('[API_KEY_SERVICE-FIND_ALL] 🏓', options);
    return this.apiKeyRepo.find(options);
  }

  findAndCount(options: FindManyOptions<ApiKey>): Promise<[ApiKey[], number]> {
    this.gs.log('[API_KEY_SERVICE-FIND_AND_COUNT] 🏓', options);
    return this.apiKeyRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<ApiKey>): Promise<ApiKey> {
    this.gs.log('[API_KEY_SERVICE-GET_BY] 🏓', options);
    return this.apiKeyRepo.findOneOrFail(options);
  }

  save<T = ApiKey | ApiKey[]>(apiKey: T): Promise<T> {
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

  getOriginIpCc(req: any, ipOnly = false): { origin_ip: string, country_code: string } {
    let originIp = '';
    if (!ipOnly) {
      originIp = originIp || req.headers.origin || req.headers.referer || '';
    }
    originIp = (originIp || req.headers['cf-connecting-ip'] || req.ip || '').toString();
    originIp = this.gs.cleanIpOrigin(originIp);
    const countryCode = (req.headers['cf-ipcountry'] || '').toString();
    return {
      origin_ip: originIp,
      country_code: countryCode
    };
  }

  getCorsOptions(): CorsOptions {
    return {
      origin: async (org, callback) => {
        const o = this.gs.cleanIpOrigin(org);
        this.gs.log('[API_KEY_SERVICE-ORIGIN] 🏓', o);
        return callback(null, true);
      },
      credentials: true
    };
  }

  async checkKey(origin: string, key: string): Promise<{ allowed: boolean, user: UserModel }> {
    if (this.cfg.domainIpBypass.includes(origin) && !key) {
      return { allowed: true, user: null };
    }
    try {
      if (!key) {
        throw new Error('Tidak Ada API Key!');
      }
      const apiKey = await this.findOneOrFail({
        where: [
          {
            ip_domain: ILike(`%${origin}%`),
            api_key: Equal(key)
          },
          {
            ip_domain: Equal('*'),
            api_key: Equal(key)
          }
        ],
        relations: ['user_']
      });
      this.gs.log('[API_KEY_SERVICE-CHECK_KEY_SUCCESS] 🏓', apiKey);
      return { allowed: true, user: apiKey.user_ };
    } catch (error) {
      this.gs.log('[API_KEY_SERVICE-CHECK_KEY_ERROR] 🏓', error, 'error');
      return { allowed: false, user: null };
    }
  }

}
