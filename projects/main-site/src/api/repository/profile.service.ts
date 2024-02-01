import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Profile } from '../entities/Profile';

import { GlobalService } from '../services/global.service';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Profile {
    return new Profile();
  }

  instance(): Repository<Profile> {
    return this.profileRepo;
  }

  getMetaData(): EntityMetadata {
    return this.profileRepo.metadata;
  }

  find(options: FindManyOptions<Profile>, withDeleted = false): Promise<Profile[]> {
    options.withDeleted = withDeleted;
    this.gs.log('[PROFILE_SERVICE-FIND_ALL] 👬', options);
    return this.profileRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Profile>, withDeleted = false): Promise<[Profile[], number]> {
    options.withDeleted = withDeleted;
    this.gs.log('[PROFILE_SERVICE-FIND_AND_COUNT] 👬', options);
    return this.profileRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Profile>, withDeleted = false): Promise<Profile> {
    options.withDeleted = withDeleted;
    this.gs.log('[PROFILE_SERVICE-GET_BY] 👬', options);
    return this.profileRepo.findOneOrFail(options);
  }

  save<T = Profile | Profile[]>(profile: T): Promise<T> {
    this.gs.log('[PROFILE_SERVICE-SAVE] 👬', profile);
    return this.profileRepo.save(profile);
  }

  count(options: FindManyOptions<Profile>): Promise<number> {
    this.gs.log('[PROFILE_SERVICE-COUNT] 👬', options);
    return this.profileRepo.count(options);
  }

  remove(profile: Profile | Profile[]): Promise<Profile | Profile[]> {
    this.gs.log('[PROFILE_SERVICE-REMOVE] 👬', profile);
    return this.profileRepo.softRemove(profile as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[PROFILE_SERVICE-QUERY] 👬', query);
    return this.profileRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Profile>, partialEntity: QueryDeepPartialEntity<Profile>): Promise<UpdateResult> {
    this.gs.log('[PROFILE_SERVICE-UPDATE] 👬', criteria);
    return this.profileRepo.update(criteria, partialEntity);
  }

  insert(profile: Profile): Promise<InsertResult> {
    this.gs.log('[PROFILE_SERVICE-INSERT] 👬', profile);
    return this.profileRepo.insert(profile);
  }

}
