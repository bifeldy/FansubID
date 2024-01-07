import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { News } from '../entities/News';

import { GlobalService } from '../services/global.service';

@Injectable()
export class NewsService {

  constructor(
    @InjectRepository(News) private newsRepo: Repository<News>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): News {
    return new News();
  }

  instance(): Repository<News> {
    return this.newsRepo;
  }

  getMetaData(): EntityMetadata {
    return this.newsRepo.metadata;
  }

  find(options: FindManyOptions<News>): Promise<News[]> {
    this.gs.log('[NEWS_SERVICE-FIND_ALL] 📰', options);
    return this.newsRepo.find(options);
  }

  findAndCount(options: FindManyOptions<News>): Promise<[News[], number]> {
    this.gs.log('[NEWS_SERVICE-FIND_AND_COUNT] 📰', options);
    return this.newsRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<News>): Promise<News> {
    this.gs.log('[NEWS_SERVICE-GET_BY] 📰', options);
    return this.newsRepo.findOneOrFail(options);
  }

  save<T = News | News[]>(news: T): Promise<T> {
    this.gs.log('[NEWS_SERVICE-SAVE] 📰', news);
    return this.newsRepo.save(news);
  }

  count(options: FindManyOptions<News>): Promise<number> {
    this.gs.log('[NEWS_SERVICE-COUNT] 📰', options);
    return this.newsRepo.count(options);
  }

  remove(news: News | News[]): Promise<News | News[]> {
    this.gs.log('[NEWS_SERVICE-REMOVE] 📰', news);
    return this.newsRepo.softRemove(news as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[NEWS_SERVICE-QUERY] 📰', query);
    return this.newsRepo.query(query, parameters);
  }

  update(criteria: FindConditions<News>, partialEntity: QueryDeepPartialEntity<News>): Promise<UpdateResult> {
    this.gs.log('[NEWS_SERVICE-UPDATE] 📰', criteria);
    return this.newsRepo.update(criteria, partialEntity);
  }

  insert(news: News): Promise<InsertResult> {
    this.gs.log('[NEWS_SERVICE-INSERT] 📰', news);
    return this.newsRepo.insert(news);
  }

}
