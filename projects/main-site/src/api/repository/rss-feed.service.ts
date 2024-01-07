import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { RssFeed } from '../entities/RssFeed';

import { GlobalService } from '../services/global.service';

@Injectable()
export class RssFeedService {

  constructor(
    @InjectRepository(RssFeed) private rssFeedRepo: Repository<RssFeed>,
    private gs: GlobalService,
  ) {
    // this.migrateUrlRssFeedPath().catch(console.error);
  }

  // async migrateUrlRssFeedPath(): Promise<void> {
  //   const rssFeed = await this.rssFeedRepo.find({
  //     where: [
  //       { link: Not(IsNull()) }
  //     ],
  //     relations: ['fansub_']
  //   });
  //   for (const rf of rssFeed) {
  //     try {
  //       await this.rssFeedRepo.update(
  //         { link: Equal(rf.link) },
  //         { link: new URL(rf.link).pathname }
  //       );
  //     } catch (e) {
  //       await this.rssFeedRepo.remove(rf);
  //     }
  //   }
  // }

  new(): RssFeed {
    return new RssFeed();
  }

  instance(): Repository<RssFeed> {
    return this.rssFeedRepo;
  }

  getMetaData(): EntityMetadata {
    return this.rssFeedRepo.metadata;
  }

  find(options: FindManyOptions<RssFeed>): Promise<RssFeed[]> {
    this.gs.log('[RSS_FEED_SERVICE-FIND_ALL] 🎟', options);
    return this.rssFeedRepo.find(options);
  }

  findAndCount(options: FindManyOptions<RssFeed>): Promise<[RssFeed[], number]> {
    this.gs.log('[RSS_FEED_SERVICE-FIND_AND_COUNT] 🎟', options);
    return this.rssFeedRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<RssFeed>): Promise<RssFeed> {
    this.gs.log('[RSS_FEED_SERVICE-GET_BY] 🎟', options);
    return this.rssFeedRepo.findOneOrFail(options);
  }

  save<T = RssFeed | RssFeed[]>(rssFeed: T): Promise<T> {
    this.gs.log('[RSS_FEED_SERVICE-SAVE] 🎟', rssFeed);
    return this.rssFeedRepo.save(rssFeed);
  }

  count(options: FindManyOptions<RssFeed>): Promise<number> {
    this.gs.log('[RSS_FEED_SERVICE-COUNT] 🎟', options);
    return this.rssFeedRepo.count(options);
  }

  remove(rssFeed: RssFeed | RssFeed[]): Promise<RssFeed | RssFeed[]> {
    this.gs.log('[RSS_FEED_SERVICE-REMOVE] 🎟', rssFeed);
    return this.rssFeedRepo.remove(rssFeed as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[RSS_FEED_SERVICE-QUERY] 🎟', query);
    return this.rssFeedRepo.query(query, parameters);
  }

  update(criteria: FindConditions<RssFeed>, partialEntity: QueryDeepPartialEntity<RssFeed>): Promise<UpdateResult> {
    this.gs.log('[RSS_FEED_SERVICE-UPDATE] 🎟', criteria);
    return this.rssFeedRepo.update(criteria, partialEntity);
  }

  insert(rssFeed: RssFeed): Promise<InsertResult> {
    this.gs.log('[RSS_FEED_SERVICE-INSERT] 🎟', rssFeed);
    return this.rssFeedRepo.insert(rssFeed);
  }

}
