import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Edict } from '../entities/Edict';

import { GlobalService } from '../services/global.service';

@Injectable()
export class EdictService {

  constructor(
    @InjectRepository(Edict) private edictRepo: Repository<Edict>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Edict {
    return new Edict();
  }

  instance(): Repository<Edict> {
    return this.edictRepo;
  }

  getMetaData(): EntityMetadata {
    return this.edictRepo.metadata;
  }

  find(options: FindManyOptions<Edict>) {
    this.gs.log('[EDICT_SERVICE-FIND_ALL] 🗾', options);
    return this.edictRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Edict>) {
    this.gs.log('[EDICT_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.edictRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Edict>) {
    this.gs.log('[EDICT_SERVICE-GET_BY] 🗾', options);
    return this.edictRepo.findOneOrFail(options);
  }

  save(edict: Edict): Promise<Edict> {
    this.gs.log('[EDICT_SERVICE-SAVE] 🗾', edict);
    return this.edictRepo.save(edict);
  }

  count(options: FindManyOptions<Edict>): Promise<number> {
    this.gs.log('[EDICT_SERVICE-COUNT] 🗾', options);
    return this.edictRepo.count(options);
  }

  remove(edict: Edict): Promise<Edict> {
    this.gs.log('[EDICT_SERVICE-REMOVE] 🗾', edict);
    return this.edictRepo.remove(edict);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[EDICT_SERVICE-QUERY] 🗾', query);
    return this.edictRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Edict>, partialEntity: QueryDeepPartialEntity<Edict>): Promise<UpdateResult> {
    this.gs.log('[EDICT_SERVICE-UPDATE] 🗾', criteria);
    return this.edictRepo.update(criteria, partialEntity);
  }

  insert(edict: Edict): Promise<InsertResult> {
    this.gs.log('[EDICT_SERVICE-INSERT] 🗾', edict);
    return this.edictRepo.insert(edict);
  }

}
