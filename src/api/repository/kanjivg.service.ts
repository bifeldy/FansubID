import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { KanjiVg } from '../entities/KanjiVg';

import { GlobalService } from '../services/global.service';

@Injectable()
export class KanjivgService {

  constructor(
    @InjectRepository(KanjiVg) private kanjiVgRepo: Repository<KanjiVg>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): KanjiVg {
    return new KanjiVg();
  }

  instance(): Repository<KanjiVg> {
    return this.kanjiVgRepo;
  }

  getMetaData(): EntityMetadata {
    return this.kanjiVgRepo.metadata;
  }

  find(options: FindManyOptions<KanjiVg>) {
    this.gs.log('[KANJIVG_SERVICE-FIND_ALL] 🗾', options);
    return this.kanjiVgRepo.find(options);
  }

  findAndCount(options: FindManyOptions<KanjiVg>) {
    this.gs.log('[KANJIVG_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.kanjiVgRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<KanjiVg>) {
    this.gs.log('[KANJIVG_SERVICE-GET_BY] 🗾', options);
    return this.kanjiVgRepo.findOneOrFail(options);
  }

  save(kanjiVg: KanjiVg): Promise<KanjiVg> {
    this.gs.log('[KANJIVG_SERVICE-SAVE] 🗾', kanjiVg);
    return this.kanjiVgRepo.save(kanjiVg);
  }

  count(options: FindManyOptions<KanjiVg>): Promise<number> {
    this.gs.log('[KANJIVG_SERVICE-COUNT] 🗾', options);
    return this.kanjiVgRepo.count(options);
  }

  remove(kanjiVg: KanjiVg | KanjiVg[]): Promise<KanjiVg | KanjiVg[]> {
    this.gs.log('[KANJIVG_SERVICE-REMOVE] 🗾', kanjiVg);
    return this.kanjiVgRepo.remove(kanjiVg as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[KANJIVG_SERVICE-QUERY] 🗾', query);
    return this.kanjiVgRepo.query(query, parameters);
  }

  update(criteria: FindConditions<KanjiVg>, partialEntity: QueryDeepPartialEntity<KanjiVg>): Promise<UpdateResult> {
    this.gs.log('[KANJIVG_SERVICE-UPDATE] 🗾', criteria);
    return this.kanjiVgRepo.update(criteria, partialEntity);
  }

  insert(kanjiVg: KanjiVg): Promise<InsertResult> {
    this.gs.log('[KANJIVG_SERVICE-INSERT] 🗾', kanjiVg);
    return this.kanjiVgRepo.insert(kanjiVg);
  }

}
