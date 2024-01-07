import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Kanjivg } from '../entities/Kanjivg';

import { GlobalService } from '../services/global.service';

@Injectable()
export class KanjivgService {

  constructor(
    @InjectRepository(Kanjivg) private kanjiVgRepo: Repository<Kanjivg>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Kanjivg {
    return new Kanjivg();
  }

  instance(): Repository<Kanjivg> {
    return this.kanjiVgRepo;
  }

  getMetaData(): EntityMetadata {
    return this.kanjiVgRepo.metadata;
  }

  find(options: FindManyOptions<Kanjivg>): Promise<Kanjivg[]> {
    this.gs.log('[KANJIVG_SERVICE-FIND_ALL] 🗾', options);
    return this.kanjiVgRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Kanjivg>): Promise<[Kanjivg[], number]> {
    this.gs.log('[KANJIVG_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.kanjiVgRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Kanjivg>): Promise<Kanjivg> {
    this.gs.log('[KANJIVG_SERVICE-GET_BY] 🗾', options);
    return this.kanjiVgRepo.findOneOrFail(options);
  }

  save<T = Kanjivg | Kanjivg[]>(kanjiVg: T): Promise<T> {
    this.gs.log('[KANJIVG_SERVICE-SAVE] 🗾', kanjiVg);
    return this.kanjiVgRepo.save(kanjiVg);
  }

  count(options: FindManyOptions<Kanjivg>): Promise<number> {
    this.gs.log('[KANJIVG_SERVICE-COUNT] 🗾', options);
    return this.kanjiVgRepo.count(options);
  }

  remove(kanjiVg: Kanjivg | Kanjivg[]): Promise<Kanjivg | Kanjivg[]> {
    this.gs.log('[KANJIVG_SERVICE-REMOVE] 🗾', kanjiVg);
    return this.kanjiVgRepo.remove(kanjiVg as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[KANJIVG_SERVICE-QUERY] 🗾', query);
    return this.kanjiVgRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Kanjivg>, partialEntity: QueryDeepPartialEntity<Kanjivg>): Promise<UpdateResult> {
    this.gs.log('[KANJIVG_SERVICE-UPDATE] 🗾', criteria);
    return this.kanjiVgRepo.update(criteria, partialEntity);
  }

  insert(kanjiVg: Kanjivg): Promise<InsertResult> {
    this.gs.log('[KANJIVG_SERVICE-INSERT] 🗾', kanjiVg);
    return this.kanjiVgRepo.insert(kanjiVg);
  }

}
