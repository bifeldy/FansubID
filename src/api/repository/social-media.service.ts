import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, UpdateResult, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { SocialMedia } from '../entities/SocialMedia';

import { GlobalService } from '../services/global.service';

@Injectable()
export class SocialMediaService {

  constructor(
    @InjectRepository(SocialMedia) private socialMediaRepo: Repository<SocialMedia>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): SocialMedia {
    return new SocialMedia();
  }

  instance(): Repository<SocialMedia> {
    return this.socialMediaRepo;
  }

  getMetaData(): EntityMetadata {
    return this.socialMediaRepo.metadata;
  }

  find(options: FindManyOptions<SocialMedia>) {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-FIND_ALL] 🙇‍♂️', options);
    return this.socialMediaRepo.find(options);
  }

  findAndCount(options: FindManyOptions<SocialMedia>) {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-FIND_AND_COUNT] 🙇‍♂️', options);
    return this.socialMediaRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<SocialMedia>) {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-GET_BY] 🙇‍♂️', options);
    return this.socialMediaRepo.findOneOrFail(options);
  }

  save(sosmed: SocialMedia): Promise<SocialMedia> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-SAVE] 🙇‍♂️', sosmed);
    return this.socialMediaRepo.save(sosmed);
  }

  count(options: FindManyOptions<SocialMedia>): Promise<number> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-COUNT] 🙇‍♂️', options);
    return this.socialMediaRepo.count(options);
  }

  remove(sosmed: SocialMedia | SocialMedia[]): Promise<SocialMedia | SocialMedia[]> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-REMOVE] 🙇‍♂️', sosmed);
    return this.socialMediaRepo.remove(sosmed as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-QUERY] 🙇‍♂️', query);
    return this.socialMediaRepo.query(query, parameters);
  }

  update(criteria: FindConditions<SocialMedia>, partialEntity: QueryDeepPartialEntity<SocialMedia>): Promise<UpdateResult> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-UPDATE] 🙇‍♂️', criteria);
    return this.socialMediaRepo.update(criteria, partialEntity);
  }

  insert(sosmed: SocialMedia): Promise<InsertResult> {
    this.gs.log('[SOCIAL_MEDIA_SERVICE-INSERT] 🙇‍♂️', sosmed);
    return this.socialMediaRepo.insert(sosmed);
  }

}
