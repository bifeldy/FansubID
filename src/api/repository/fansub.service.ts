import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Fansub } from '../entities/Fansub';

import { GlobalService } from '../services/global.service';

@Injectable()
export class FansubService {

  constructor(
    @InjectRepository(Fansub) private fansubRepo: Repository<Fansub>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Fansub {
    return new Fansub();
  }

  instance(): Repository<Fansub> {
    return this.fansubRepo;
  }

  getMetaData(): EntityMetadata {
    return this.fansubRepo.metadata;
  }

  find(options: FindManyOptions<Fansub>) {
    this.gs.log('[FANSUB_SERVICE-FIND_ALL] 🍿', options);
    return this.fansubRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Fansub>) {
    this.gs.log('[FANSUB_SERVICE-FIND_AND_COUNT] 🍿', options);
    return this.fansubRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Fansub>) {
    this.gs.log('[FANSUB_SERVICE-GET_BY] 🍿', options);
    return this.fansubRepo.findOneOrFail(options);
  }

  save(fansub: Fansub): Promise<Fansub> {
    this.gs.log('[FANSUB_SERVICE-SAVE] 🍿', fansub);
    return this.fansubRepo.save(fansub);
  }

  count(options: FindManyOptions<Fansub>): Promise<number> {
    this.gs.log('[FANSUB_SERVICE-COUNT] 🍿', options);
    return this.fansubRepo.count(options);
  }

  remove(fansub: Fansub | Fansub[]): Promise<Fansub | Fansub[]> {
    this.gs.log('[FANSUB_SERVICE-REMOVE] 🍿', fansub);
    return this.fansubRepo.remove(fansub as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[FANSUB_SERVICE-QUERY] 🍿', query);
    return this.fansubRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Fansub>, partialEntity: QueryDeepPartialEntity<Fansub>): Promise<UpdateResult> {
    this.gs.log('[FANSUB_SERVICE-UPDATE] 🍿', criteria);
    return this.fansubRepo.update(criteria, partialEntity);
  }

  insert(fansub: Fansub): Promise<InsertResult> {
    this.gs.log('[FANSUB_SERVICE-INSERT] 🍿', fansub);
    return this.fansubRepo.insert(fansub);
  }

}
