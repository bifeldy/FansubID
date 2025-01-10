import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';

import { GlobalService } from '../services/global.service';

@Injectable()
export class KartuTandaPendudukService {

  constructor(
    @InjectRepository(KartuTandaPenduduk) private kartuTandaPendudukRepo: Repository<KartuTandaPenduduk>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): KartuTandaPenduduk {
    return new KartuTandaPenduduk();
  }

  instance(): Repository<KartuTandaPenduduk> {
    return this.kartuTandaPendudukRepo;
  }

  getMetaData(): EntityMetadata {
    return this.kartuTandaPendudukRepo.metadata;
  }

  find(options: FindManyOptions<KartuTandaPenduduk>): Promise<KartuTandaPenduduk[]> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-FIND_ALL] 👨‍👩‍👧‍👦', options);
    return this.kartuTandaPendudukRepo.find(options);
  }

  findAndCount(options: FindManyOptions<KartuTandaPenduduk>): Promise<[KartuTandaPenduduk[], number]> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-FIND_AND_COUNT] 👨‍👩‍👧‍👦', options);
    return this.kartuTandaPendudukRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<KartuTandaPenduduk>): Promise<KartuTandaPenduduk> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-GET_BY] 👨‍👩‍👧‍👦', options);
    return this.kartuTandaPendudukRepo.findOneOrFail(options);
  }

  save<T = KartuTandaPenduduk | KartuTandaPenduduk[]>(kartuTandaPenduduk: T): Promise<T> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-SAVE] 👨‍👩‍👧‍👦', kartuTandaPenduduk);
    return this.kartuTandaPendudukRepo.save(kartuTandaPenduduk);
  }

  count(options: FindManyOptions<KartuTandaPenduduk>): Promise<number> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-COUNT] 👨‍👩‍👧‍👦', options);
    return this.kartuTandaPendudukRepo.count(options);
  }

  remove(kartuTandaPenduduk: KartuTandaPenduduk | KartuTandaPenduduk[]): Promise<KartuTandaPenduduk | KartuTandaPenduduk[]> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-REMOVE] 👨‍👩‍👧‍👦', kartuTandaPenduduk);
    return this.kartuTandaPendudukRepo.softRemove(kartuTandaPenduduk as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-QUERY] 👨‍👩‍👧‍👦', query);
    return this.kartuTandaPendudukRepo.query(query, parameters);
  }

  update(criteria: FindConditions<KartuTandaPenduduk>, partialEntity: QueryDeepPartialEntity<KartuTandaPenduduk>): Promise<UpdateResult> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-UPDATE] 👨‍👩‍👧‍👦', criteria);
    return this.kartuTandaPendudukRepo.update(criteria, partialEntity);
  }

  insert(kartuTandaPenduduk: KartuTandaPenduduk): Promise<InsertResult> {
    this.gs.log('[KARTU_TANDA_PENDUDUK_SERVICE-INSERT] 👨‍👩‍👧‍👦', kartuTandaPenduduk);
    return this.kartuTandaPendudukRepo.insert(kartuTandaPenduduk);
  }

}
