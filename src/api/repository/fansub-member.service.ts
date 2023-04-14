import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { FansubMember } from '../entities/FansubMember';

import { GlobalService } from '../services/global.service';

@Injectable()
export class FansubMemberService {

  constructor(
    @InjectRepository(FansubMember) private fansubMemberRepo: Repository<FansubMember>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): FansubMember {
    return new FansubMember();
  }

  instance(): Repository<FansubMember> {
    return this.fansubMemberRepo;
  }

  getMetaData(): EntityMetadata {
    return this.fansubMemberRepo.metadata;
  }

  find(options: FindManyOptions<FansubMember>) {
    this.gs.log('[FANSUB_MEMBER_SERVICE-FIND_ALL] 🕵️‍♀️', options);
    return this.fansubMemberRepo.find(options);
  }

  findAndCount(options: FindManyOptions<FansubMember>) {
    this.gs.log('[FANSUB_MEMBER_SERVICE-FIND_AND_COUNT] 🕵️‍♀️', options);
    return this.fansubMemberRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<FansubMember>) {
    this.gs.log('[FANSUB_MEMBER_SERVICE-GET_BY] 🕵️‍♀️', options);
    return this.fansubMemberRepo.findOneOrFail(options);
  }

  save<T = FansubMember | FansubMember[]>(fansubMember: T): Promise<T> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-SAVE] 🕵️‍♀️', fansubMember);
    return this.fansubMemberRepo.save(fansubMember);
  }

  count(options: FindManyOptions<FansubMember>): Promise<number> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-COUNT] 🕵️‍♀️', options);
    return this.fansubMemberRepo.count(options);
  }

  remove(fansubMember: FansubMember | FansubMember[]): Promise<FansubMember | FansubMember[]> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-REMOVE] 🕵️‍♀️', fansubMember);
    return this.fansubMemberRepo.remove(fansubMember as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-QUERY] 🕵️‍♀️', query);
    return this.fansubMemberRepo.query(query, parameters);
  }

  update(criteria: FindConditions<FansubMember>, partialEntity: QueryDeepPartialEntity<FansubMember>): Promise<UpdateResult> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-UPDATE] 🕵️‍♀️', criteria);
    return this.fansubMemberRepo.update(criteria, partialEntity);
  }

  insert(fansubMember: FansubMember): Promise<InsertResult> {
    this.gs.log('[FANSUB_MEMBER_SERVICE-INSERT] 🕵️‍♀️', fansubMember);
    return this.fansubMemberRepo.insert(fansubMember);
  }

}
