import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Tatoeba } from '../entities/Tatoeba';

import { GlobalService } from '../services/global.service';

@Injectable()
export class TatoebaService {

  constructor(
    @InjectRepository(Tatoeba) private tatoebaRepo: Repository<Tatoeba>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Tatoeba {
    return new Tatoeba();
  }

  instance(): Repository<Tatoeba> {
    return this.tatoebaRepo;
  }

  getMetaData(): EntityMetadata {
    return this.tatoebaRepo.metadata;
  }

  find(options: FindManyOptions<Tatoeba>): Promise<Tatoeba[]> {
    this.gs.log('[TATOEBA_SERVICE-FIND_ALL] 🗾', options);
    return this.tatoebaRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Tatoeba>): Promise<[Tatoeba[], number]> {
    this.gs.log('[TATOEBA_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.tatoebaRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Tatoeba>): Promise<Tatoeba> {
    this.gs.log('[TATOEBA_SERVICE-GET_BY] 🗾', options);
    return this.tatoebaRepo.findOneOrFail(options);
  }

  save<T = Tatoeba | Tatoeba[]>(tatoeba: T): Promise<T> {
    this.gs.log('[TATOEBA_SERVICE-SAVE] 🗾', tatoeba);
    return this.tatoebaRepo.save(tatoeba);
  }

  count(options: FindManyOptions<Tatoeba>): Promise<number> {
    this.gs.log('[TATOEBA_SERVICE-COUNT] 🗾', options);
    return this.tatoebaRepo.count(options);
  }

  remove(tatoeba: Tatoeba | Tatoeba[]): Promise<Tatoeba | Tatoeba[]> {
    this.gs.log('[TATOEBA_SERVICE-REMOVE] 🗾', tatoeba);
    return this.tatoebaRepo.remove(tatoeba as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[TATOEBA_SERVICE-QUERY] 🗾', query);
    return this.tatoebaRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Tatoeba>, partialEntity: QueryDeepPartialEntity<Tatoeba>): Promise<UpdateResult> {
    this.gs.log('[TATOEBA_SERVICE-UPDATE] 🗾', criteria);
    return this.tatoebaRepo.update(criteria, partialEntity);
  }

  insert(tatoeba: Tatoeba): Promise<InsertResult> {
    this.gs.log('[TATOEBA_SERVICE-INSERT] 🗾', tatoeba);
    return this.tatoebaRepo.insert(tatoeba);
  }

}
