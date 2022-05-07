import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Registration } from '../entities/Registration';

import { GlobalService } from '../services/global.service';

@Injectable()
export class RegistrationService {

  constructor(
    @InjectRepository(Registration) private registrationRepo: Repository<Registration>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Registration {
    return new Registration();
  }

  instance(): Repository<Registration> {
    return this.registrationRepo;
  }

  getMetaData(): EntityMetadata {
    return this.registrationRepo.metadata;
  }

  find(options: FindManyOptions<Registration>) {
    this.gs.log('[REGISTRATION_SERVICE-FIND_ALL] 🔏', options);
    return this.registrationRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Registration>) {
    this.gs.log('[REGISTRATION_SERVICE-FIND_AND_COUNT] 🔏', options);
    return this.registrationRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Registration>) {
    this.gs.log('[REGISTRATION_SERVICE-GET_BY] 🔏', options);
    return this.registrationRepo.findOneOrFail(options);
  }

  save(registration: Registration): Promise<Registration> {
    this.gs.log('[REGISTRATION_SERVICE-SAVE] 🔏', registration);
    return this.registrationRepo.save(registration);
  }

  count(options: FindManyOptions<Registration>): Promise<number> {
    this.gs.log('[REGISTRATION_SERVICE-COUNT] 🔏', options);
    return this.registrationRepo.count(options);
  }

  remove(registration: Registration): Promise<Registration> {
    this.gs.log('[REGISTRATION_SERVICE-REMOVE] 🔏', registration);
    return this.registrationRepo.remove(registration);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[REGISTRATION_SERVICE-QUERY] 🔏', query);
    return this.registrationRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Registration>, partialEntity: QueryDeepPartialEntity<Registration>): Promise<UpdateResult> {
    this.gs.log('[REGISTRATION_SERVICE-UPDATE] 🔏', criteria);
    return this.registrationRepo.update(criteria, partialEntity);
  }

  insert(registration: Registration): Promise<InsertResult> {
    this.gs.log('[REGISTRATION_SERVICE-INSERT] 🔏', registration);
    return this.registrationRepo.insert(registration);
  }

}
