import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMetadata, Equal, FindManyOptions, FindOneOptions, FindConditions, ILike, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Request } from 'express';

import { ApiKey } from '../entities/ApiKey';

import { GlobalService } from '../services/global.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ApiKeyService {

  constructor(
    @InjectRepository(ApiKey) private apiKeyRepo: Repository<ApiKey>,
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

  remove(apiKey: ApiKey): Promise<ApiKey> {
    this.gs.log('[API_KEY_SERVICE-REMOVE] 🏓', apiKey);
    return this.apiKeyRepo.remove(apiKey);
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

  getOriginIp(req: Request, ipOnly = false): string {
    let originIp = '';
    if (!ipOnly) {
      originIp = originIp || req.header('Origin') || '';
    }
    originIp = originIp || req.header('X-Real-Ip') || req.header('X-Forwarded-For') || req.socket.remoteAddress || '';
    return originIp || (req.ips?.length ? req.ips[0] : req.ip);
  }

  getCorsOptions(): CorsOptions {
    return {
      origin: async (origin, callback) => {
        const isAllowed = await this.checkOrigin(origin || '');
        return callback(null, isAllowed);
      },
      credentials: true,
      methods: ['GET', 'OPTIONS']
    };
  }

  async checkOrigin(origin: string): Promise<boolean> {
    let isAllowed = false;
    try {
      if (origin.startsWith('http://')) {
        origin = origin.slice(7, origin.length);
      } else if (origin.startsWith('https://')) {
        origin = origin.slice(8, origin.length);
      }
      if (origin.startsWith('www.')) {
        origin = origin.slice(4, origin.length);
      }
      origin = origin.split(':')[0];
      const apiKey = await this.findOneOrFail({
        where: [
          { ip_domain: Equal(origin) }
        ]
      });
      this.gs.log('[API_KEY_SERVICE-CHECK_ORIGIN_SUCCESS] 🏓', apiKey);
      isAllowed = true;
    } catch (error) {
      this.gs.log('[API_KEY_SERVICE-CHECK_ORIGIN_ERROR] 🏓', error, 'error');
    }
    return isAllowed;
  }

  async checkKey(origin: string, key: string): Promise<boolean> {
    let isAllowed = false;
    if (origin.startsWith('http://')) {
      origin = origin.slice(7, origin.length);
    } else if (origin.startsWith('https://')) {
      origin = origin.slice(8, origin.length);
    }
    if (origin.startsWith('www.')) {
      origin = origin.slice(4, origin.length);
    }
    origin = origin.split('/')[0];
    origin = origin.split(':')[0];
    try {
      const apiKey = await this.findOneOrFail({
        where: [
          { api_key: ILike(key) }
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
