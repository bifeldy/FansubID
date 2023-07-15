import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Nihongo } from '../entities/Nihongo';

import { GlobalService } from '../services/global.service';

@Injectable()
export class NihongoService {

  constructor(
    @InjectRepository(Nihongo) private nihongoRepo: Repository<Nihongo>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Nihongo {
    return new Nihongo();
  }

  instance(): Repository<Nihongo> {
    return this.nihongoRepo;
  }

  getMetaData(): EntityMetadata {
    return this.nihongoRepo.metadata;
  }

  find(options: FindManyOptions<Nihongo>): Promise<Nihongo[]> {
    this.gs.log('[NIHONGO_SERVICE-FIND_ALL] 🗾', options);
    return this.nihongoRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Nihongo>): Promise<[Nihongo[], number]> {
    this.gs.log('[NIHONGO_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.nihongoRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Nihongo>): Promise<Nihongo> {
    this.gs.log('[NIHONGO_SERVICE-GET_BY] 🗾', options);
    return this.nihongoRepo.findOneOrFail(options);
  }

  save<T = Nihongo | Nihongo[]>(nihongo: T): Promise<T> {
    this.gs.log('[NIHONGO_SERVICE-SAVE] 🗾', nihongo);
    return this.nihongoRepo.save(nihongo);
  }

  count(options: FindManyOptions<Nihongo>): Promise<number> {
    this.gs.log('[NIHONGO_SERVICE-COUNT] 🗾', options);
    return this.nihongoRepo.count(options);
  }

  remove(nihongo: Nihongo | Nihongo[]): Promise<Nihongo | Nihongo[]> {
    this.gs.log('[NIHONGO_SERVICE-REMOVE] 🗾', nihongo);
    return this.nihongoRepo.remove(nihongo as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[NIHONGO_SERVICE-QUERY] 🗾', query);
    return this.nihongoRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Nihongo>, partialEntity: QueryDeepPartialEntity<Nihongo>): Promise<UpdateResult> {
    this.gs.log('[NIHONGO_SERVICE-UPDATE] 🗾', criteria);
    return this.nihongoRepo.update(criteria, partialEntity);
  }

  insert(nihongo: Nihongo): Promise<InsertResult> {
    this.gs.log('[NIHONGO_SERVICE-INSERT] 🗾', nihongo);
    return this.nihongoRepo.insert(nihongo);
  }

}
