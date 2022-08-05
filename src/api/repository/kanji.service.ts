import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Kanji } from '../entities/Kanji';

import { GlobalService } from '../services/global.service';

@Injectable()
export class KanjiService {

  constructor(
    @InjectRepository(Kanji) private kanjiRepo: Repository<Kanji>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Kanji {
    return new Kanji();
  }

  instance(): Repository<Kanji> {
    return this.kanjiRepo;
  }

  getMetaData(): EntityMetadata {
    return this.kanjiRepo.metadata;
  }

  find(options: FindManyOptions<Kanji>) {
    this.gs.log('[KANJI_SERVICE-FIND_ALL] 🗾', options);
    return this.kanjiRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Kanji>) {
    this.gs.log('[KANJI_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.kanjiRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Kanji>) {
    this.gs.log('[KANJI_SERVICE-GET_BY] 🗾', options);
    return this.kanjiRepo.findOneOrFail(options);
  }

  save(kanji: Kanji): Promise<Kanji> {
    this.gs.log('[KANJI_SERVICE-SAVE] 🗾', kanji);
    return this.kanjiRepo.save(kanji);
  }

  count(options: FindManyOptions<Kanji>): Promise<number> {
    this.gs.log('[KANJI_SERVICE-COUNT] 🗾', options);
    return this.kanjiRepo.count(options);
  }

  remove(kanji: Kanji | Kanji[]): Promise<Kanji | Kanji[]> {
    this.gs.log('[KANJI_SERVICE-REMOVE] 🗾', kanji);
    return this.kanjiRepo.remove(kanji as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[KANJI_SERVICE-QUERY] 🗾', query);
    return this.kanjiRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Kanji>, partialEntity: QueryDeepPartialEntity<Kanji>): Promise<UpdateResult> {
    this.gs.log('[KANJI_SERVICE-UPDATE] 🗾', criteria);
    return this.kanjiRepo.update(criteria, partialEntity);
  }

  insert(kanji: Kanji): Promise<InsertResult> {
    this.gs.log('[KANJI_SERVICE-INSERT] 🗾', kanji);
    return this.kanjiRepo.insert(kanji);
  }

}
