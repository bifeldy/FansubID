import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Information } from '../entities/Information';

import { GlobalService } from '../services/global.service';

@Injectable()
export class InformationService {

  constructor(
    @InjectRepository(Information) private informationRepo: Repository<Information>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Information {
    return new Information();
  }

  instance(): Repository<Information> {
    return this.informationRepo;
  }

  getMetaData(): EntityMetadata {
    return this.informationRepo.metadata;
  }

  find(options: FindManyOptions<Information>): Promise<Information[]> {
    this.gs.log('[INFORMATION_SERVICE-FIND_ALL] 🔔', options);
    return this.informationRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Information>): Promise<[Information[], number]> {
    this.gs.log('[INFORMATION_SERVICE-FIND_AND_COUNT] 🔔', options);
    return this.informationRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Information>): Promise<Information> {
    this.gs.log('[INFORMATION_SERVICE-GET_BY] 🔔', options);
    return this.informationRepo.findOneOrFail(options);
  }

  save<T = Information | Information[]>(information: T): Promise<T> {
    this.gs.log('[INFORMATION_SERVICE-SAVE] 🔔', information);
    return this.informationRepo.save(information);
  }

  count(options: FindManyOptions<Information>): Promise<number> {
    this.gs.log('[INFORMATION_SERVICE-COUNT] 🔔', options);
    return this.informationRepo.count(options);
  }

  remove(information: Information | Information[]): Promise<Information | Information[]> {
    this.gs.log('[INFORMATION_SERVICE-REMOVE] 🔔', information);
    return this.informationRepo.softRemove(information as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[INFORMATION_SERVICE-QUERY] 🔔', query);
    return this.informationRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Information>, partialEntity: QueryDeepPartialEntity<Information>): Promise<UpdateResult> {
    this.gs.log('[INFORMATION_SERVICE-UPDATE] 🔔', criteria);
    return this.informationRepo.update(criteria, partialEntity);
  }

  insert(information: Information): Promise<InsertResult> {
    this.gs.log('[INFORMATION_SERVICE-INSERT] 🔔', information);
    return this.informationRepo.insert(information);
  }

}
