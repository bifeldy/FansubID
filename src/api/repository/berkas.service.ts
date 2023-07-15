import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityMetadata, FindManyOptions, FindOneOptions, FindConditions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Berkas } from '../entities/Berkas';

import { GlobalService } from '../services/global.service';

@Injectable()
export class BerkasService {

  constructor(
    @InjectRepository(Berkas) private berkasRepo: Repository<Berkas>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Berkas {
    return new Berkas();
  }

  instance(): Repository<Berkas> {
    return this.berkasRepo;
  }

  getMetaData(): EntityMetadata {
    return this.berkasRepo.metadata;
  }

  find(options: FindManyOptions<Berkas>): Promise<Berkas[]> {
    this.gs.log('[BERKAS_SERVICE-FIND_ALL] 📂', options);
    return this.berkasRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Berkas>): Promise<[Berkas[], number]> {
    this.gs.log('[BERKAS_SERVICE-FIND_AND_COUNT] 📂', options);
    return this.berkasRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Berkas>): Promise<Berkas> {
    this.gs.log('[BERKAS_SERVICE-GET_BY] 📂', options);
    return this.berkasRepo.findOneOrFail(options);
  }

  save<T = Berkas | Berkas[]>(berkas: T): Promise<T> {
    this.gs.log('[BERKAS_SERVICE-SAVE] 📂', berkas);
    return this.berkasRepo.save(berkas);
  }

  count(options: FindManyOptions<Berkas>): Promise<number> {
    this.gs.log('[BERKAS_SERVICE-COUNT] 📂', options);
    return this.berkasRepo.count(options);
  }

  remove(berkas: Berkas | Berkas[]): Promise<Berkas | Berkas[]> {
    this.gs.log('[BERKAS_SERVICE-REMOVE] 📂', berkas);
    return this.berkasRepo.softRemove(berkas as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[BERKAS_SERVICE-QUERY] 📂', query);
    return this.berkasRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Berkas>, partialEntity: QueryDeepPartialEntity<Berkas>): Promise<UpdateResult> {
    this.gs.log('[BERKAS_SERVICE-UPDATE] 📂', criteria);
    return this.berkasRepo.update(criteria, partialEntity);
  }

  insert(berkas: Berkas): Promise<InsertResult> {
    this.gs.log('[BERKAS_SERVICE-INSERT] 📂', berkas);
    return this.berkasRepo.insert(berkas);
  }

}
