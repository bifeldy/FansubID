import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { UserPremium } from '../entities/UserPremium';

import { GlobalService } from '../services/global.service';

@Injectable()
export class UserPremiumService {

  constructor(
    @InjectRepository(UserPremium) private userPremiumRepo: Repository<UserPremium>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): UserPremium {
    return new UserPremium();
  }

  instance(): Repository<UserPremium> {
    return this.userPremiumRepo;
  }

  getMetaData(): EntityMetadata {
    return this.userPremiumRepo.metadata;
  }

  find(options: FindManyOptions<UserPremium>): Promise<UserPremium[]> {
    this.gs.log('[USER_PREMIUM_SERVICE-FIND_ALL] 🦋', options);
    return this.userPremiumRepo.find(options);
  }

  findAndCount(options: FindManyOptions<UserPremium>): Promise<[UserPremium[], number]> {
    this.gs.log('[USER_PREMIUM_SERVICE-FIND_AND_COUNT] 🦋', options);
    return this.userPremiumRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<UserPremium>): Promise<UserPremium> {
    this.gs.log('[USER_PREMIUM_SERVICE-GET_BY] 🦋', options);
    return this.userPremiumRepo.findOneOrFail(options);
  }

  save<T = UserPremium | UserPremium[]>(userPremium: T): Promise<T> {
    this.gs.log('[USER_PREMIUM_SERVICE-SAVE] 🦋', userPremium);
    return this.userPremiumRepo.save(userPremium);
  }

  count(options: FindManyOptions<UserPremium>): Promise<number> {
    this.gs.log('[USER_PREMIUM_SERVICE-COUNT] 🦋', options);
    return this.userPremiumRepo.count(options);
  }

  remove(userPremium: UserPremium | UserPremium[]): Promise<UserPremium | UserPremium[]> {
    this.gs.log('[USER_PREMIUM_SERVICE-REMOVE] 🦋', userPremium);
    return this.userPremiumRepo.remove(userPremium as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[USER_PREMIUM_SERVICE-QUERY] 🦋', query);
    return this.userPremiumRepo.query(query, parameters);
  }

  update(criteria: FindConditions<UserPremium>, partialEntity: QueryDeepPartialEntity<UserPremium>): Promise<UpdateResult> {
    this.gs.log('[USER_PREMIUM_SERVICE-UPDATE] 🦋', criteria);
    return this.userPremiumRepo.update(criteria, partialEntity);
  }

  insert(userPremium: UserPremium): Promise<InsertResult> {
    this.gs.log('[USER_PREMIUM_SERVICE-INSERT] 🦋', userPremium);
    return this.userPremiumRepo.insert(userPremium);
  }

}
