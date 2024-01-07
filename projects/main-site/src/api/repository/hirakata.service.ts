import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Hirakata } from '../entities/Hirakata';

import { GlobalService } from '../services/global.service';

@Injectable()
export class HirakataService {

  constructor(
    @InjectRepository(Hirakata) private hirakataRepo: Repository<Hirakata>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Hirakata {
    return new Hirakata();
  }

  instance(): Repository<Hirakata> {
    return this.hirakataRepo;
  }

  getMetaData(): EntityMetadata {
    return this.hirakataRepo.metadata;
  }

  find(options: FindManyOptions<Hirakata>): Promise<Hirakata[]> {
    this.gs.log('[HIRAKATA_SERVICE-FIND_ALL] 🗾', options);
    return this.hirakataRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Hirakata>): Promise<[Hirakata[], number]> {
    this.gs.log('[HIRAKATA_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.hirakataRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Hirakata>): Promise<Hirakata> {
    this.gs.log('[HIRAKATA_SERVICE-GET_BY] 🗾', options);
    return this.hirakataRepo.findOneOrFail(options);
  }

  save<T = Hirakata | Hirakata[]>(hirakata: T): Promise<T> {
    this.gs.log('[HIRAKATA_SERVICE-SAVE] 🗾', hirakata);
    return this.hirakataRepo.save(hirakata);
  }

  count(options: FindManyOptions<Hirakata>): Promise<number> {
    this.gs.log('[HIRAKATA_SERVICE-COUNT] 🗾', options);
    return this.hirakataRepo.count(options);
  }

  remove(hirakata: Hirakata | Hirakata[]): Promise<Hirakata | Hirakata[]> {
    this.gs.log('[HIRAKATA_SERVICE-REMOVE] 🗾', hirakata);
    return this.hirakataRepo.remove(hirakata as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[HIRAKATA_SERVICE-QUERY] 🗾', query);
    return this.hirakataRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Hirakata>, partialEntity: QueryDeepPartialEntity<Hirakata>): Promise<UpdateResult> {
    this.gs.log('[HIRAKATA_SERVICE-UPDATE] 🗾', criteria);
    return this.hirakataRepo.update(criteria, partialEntity);
  }

  insert(hirakata: Hirakata): Promise<InsertResult> {
    this.gs.log('[HIRAKATA_SERVICE-INSERT] 🗾', hirakata);
    return this.hirakataRepo.insert(hirakata);
  }

}
