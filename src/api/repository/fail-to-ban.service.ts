import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityMetadata, FindManyOptions, FindOneOptions, FindConditions, InsertResult, Repository, UpdateResult } from 'typeorm';

import { FailToBan } from '../entities/FailToBan';

import { GlobalService } from '../services/global.service';

@Injectable()
export class FailToBanService {

  constructor(
    @InjectRepository(FailToBan) private failToBanRepo: Repository<FailToBan>,
    private gs: GlobalService
  ) {
    //
  }

  new(): FailToBan {
    return new FailToBan();
  }

  instance(): Repository<FailToBan> {
    return this.failToBanRepo;
  }

  getMetaData(): EntityMetadata {
    return this.failToBanRepo.metadata;
  }

  find(options: FindManyOptions<FailToBan>): Promise<FailToBan[]> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-FIND_ALL] 🧱', options);
    return this.failToBanRepo.find(options);
  }

  findAndCount(options: FindManyOptions<FailToBan>): Promise<[FailToBan[], number]> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-FIND_AND_COUNT] 🧱', options);
    return this.failToBanRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<FailToBan>): Promise<FailToBan> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-GET_BY] 🧱', options);
    return this.failToBanRepo.findOneOrFail(options);
  }

  save<T = FailToBan | FailToBan[]>(failToBan: T): Promise<T> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-SAVE] 🧱', failToBan);
    return this.failToBanRepo.save(failToBan);
  }

  count(options: FindManyOptions<FailToBan>): Promise<number> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-COUNT] 🧱', options);
    return this.failToBanRepo.count(options);
  }

  remove(failToBan: FailToBan | FailToBan[]): Promise<FailToBan | FailToBan[]> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-REMOVE] 🧱', failToBan);
    return this.failToBanRepo.remove(failToBan as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-QUERY] 🧱', query);
    return this.failToBanRepo.query(query, parameters);
  }

  update(criteria: FindConditions<FailToBan>, partialEntity: QueryDeepPartialEntity<FailToBan>): Promise<UpdateResult> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-UPDATE] 🧱', criteria);
    return this.failToBanRepo.update(criteria, partialEntity);
  }

  insert(failToBan: FailToBan): Promise<InsertResult> {
    this.gs.log('[FAIL_TO_BAN_SERVICE-INSERT] 🧱', failToBan);
    return this.failToBanRepo.insert(failToBan);
  }

}
