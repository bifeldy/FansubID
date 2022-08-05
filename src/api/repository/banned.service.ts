import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Banned } from '../entities/Banned';

import { GlobalService } from '../services/global.service';

@Injectable()
export class BannedService {

  constructor(
    @InjectRepository(Banned) private bannedRepo: Repository<Banned>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Banned {
    return new Banned();
  }

  instance(): Repository<Banned> {
    return this.bannedRepo;
  }

  getMetaData(): EntityMetadata {
    return this.bannedRepo.metadata;
  }

  find(options: FindManyOptions<Banned>) {
    this.gs.log('[BANNED_SERVICE-FIND_ALL] 🔓', options);
    return this.bannedRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Banned>) {
    this.gs.log('[BANNED_SERVICE-FIND_AND_COUNT] 🔓', options);
    return this.bannedRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Banned>): Promise<Banned> {
    this.gs.log('[BANNED_SERVICE-GET_BY] 🔓', options);
    return this.bannedRepo.findOneOrFail(options);
  }

  save(banned: Banned): Promise<Banned> {
    this.gs.log('[BANNED_SERVICE-SAVE] 🔓', banned);
    return this.bannedRepo.save(banned);
  }

  count(options: FindManyOptions<Banned>): Promise<number> {
    this.gs.log('[BANNED_SERVICE-COUNT] 🔓', options);
    return this.bannedRepo.count(options);
  }

  remove(banned: Banned | Banned[]): Promise<Banned | Banned[]> {
    this.gs.log('[BANNED_SERVICE-REMOVE] 🔓', banned);
    return this.bannedRepo.remove(banned as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[BANNED_SERVICE-QUERY] 🔓', query);
    return this.bannedRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Banned>, partialEntity: QueryDeepPartialEntity<Banned>): Promise<UpdateResult> {
    this.gs.log('[BANNED_SERVICE-UPDATE] 🔓', criteria);
    return this.bannedRepo.update(criteria, partialEntity);
  }

  insert(banned: Banned): Promise<InsertResult> {
    this.gs.log('[BANNED_SERVICE-INSERT] 🔓', banned);
    return this.bannedRepo.insert(banned);
  }

}
