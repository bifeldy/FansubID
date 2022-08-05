import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { LikeDislike } from '../entities/LikeDislike';

import { GlobalService } from '../services/global.service';

@Injectable()
export class LikedislikeService {

  constructor(
    @InjectRepository(LikeDislike) private likeDislikeRepo: Repository<LikeDislike>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): LikeDislike {
    return new LikeDislike();
  }

  instance(): Repository<LikeDislike> {
    return this.likeDislikeRepo;
  }

  getMetaData(): EntityMetadata {
    return this.likeDislikeRepo.metadata;
  }

  find(options: FindManyOptions<LikeDislike>) {
    this.gs.log('[LIKE_DISLIKE_SERVICE-FIND_ALL] 💖', options);
    return this.likeDislikeRepo.find(options);
  }

  findAndCount(options: FindManyOptions<LikeDislike>) {
    this.gs.log('[LIKE_DISLIKE_SERVICE-FIND_AND_COUNT] 💖', options);
    return this.likeDislikeRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<LikeDislike>) {
    this.gs.log('[LIKE_DISLIKE_SERVICE-GET_BY] 💖', options);
    return this.likeDislikeRepo.findOneOrFail(options);
  }

  save(likeDislike: LikeDislike): Promise<LikeDislike> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-SAVE] 💖', likeDislike);
    return this.likeDislikeRepo.save(likeDislike);
  }

  count(options: FindManyOptions<LikeDislike>): Promise<number> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-COUNT] 💖', options);
    return this.likeDislikeRepo.count(options);
  }

  remove(likeDislike: LikeDislike | LikeDislike[]): Promise<LikeDislike | LikeDislike[]> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-REMOVE] 💖', likeDislike);
    return this.likeDislikeRepo.remove(likeDislike as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-QUERY] 💖', query);
    return this.likeDislikeRepo.query(query, parameters);
  }

  update(criteria: FindConditions<LikeDislike>, partialEntity: QueryDeepPartialEntity<LikeDislike>): Promise<UpdateResult> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-UPDATE] 💖', criteria);
    return this.likeDislikeRepo.update(criteria, partialEntity);
  }

  insert(likeDislike: LikeDislike): Promise<InsertResult> {
    this.gs.log('[LIKE_DISLIKE_SERVICE-INSERT] 💖', likeDislike);
    return this.likeDislikeRepo.insert(likeDislike);
  }

}
