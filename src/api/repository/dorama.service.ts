import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Dorama } from '../entities/Dorama';

import { GlobalService } from '../services/global.service';

@Injectable()
export class DoramaService {

  constructor(
    @InjectRepository(Dorama) private doramaRepo: Repository<Dorama>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Dorama {
    return new Dorama();
  }

  instance(): Repository<Dorama> {
    return this.doramaRepo;
  }

  getMetaData(): EntityMetadata {
    return this.doramaRepo.metadata;
  }

  find(options: FindManyOptions<Dorama>) {
    this.gs.log('[DORAMA_SERVICE-FIND_ALL] 🎬', options);
    return this.doramaRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Dorama>) {
    this.gs.log('[DORAMA_SERVICE-FIND_AND_COUNT] 🎬', options);
    return this.doramaRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Dorama>) {
    this.gs.log('[DORAMA_SERVICE-GET_BY] 🎬', options);
    return this.doramaRepo.findOneOrFail(options);
  }

  save<T = Dorama | Dorama[]>(dorama: T): Promise<T> {
    this.gs.log('[DORAMA_SERVICE-SAVE] 🎬', dorama);
    return this.doramaRepo.save(dorama);
  }

  count(options: FindManyOptions<Dorama>): Promise<number> {
    this.gs.log('[DORAMA_SERVICE-COUNT] 🎬', options);
    return this.doramaRepo.count(options);
  }

  remove(dorama: Dorama | Dorama[]): Promise<Dorama | Dorama[]> {
    this.gs.log('[DORAMA_SERVICE-REMOVE] 🎬', dorama);
    return this.doramaRepo.remove(dorama as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[DORAMA_SERVICE-QUERY] 🎬', query);
    return this.doramaRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Dorama>, partialEntity: QueryDeepPartialEntity<Dorama>): Promise<UpdateResult> {
    this.gs.log('[DORAMA_SERVICE-UPDATE] 🎬', criteria);
    return this.doramaRepo.update(criteria, partialEntity);
  }

  insert(dorama: Dorama): Promise<InsertResult> {
    this.gs.log('[DORAMA_SERVICE-INSERT] 🎬', dorama);
    return this.doramaRepo.insert(dorama);
  }

}
